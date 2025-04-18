import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import {
  bookingDetails,
  workspaceData,
} from "@/interface/user/workspaceInterface";
import { getWorkspaceReviews, pendingBookings, saveWorkspace, workspaceDetails } from "@/services/api/user";
import handleError from "@/utils/errorHandler";
import {
  Clock,
  Mail,
  MapPin,
  Home,
  Users,
  Calendar,
  DollarSign,
  Scroll,
  Check,
  ArrowLeft,
  BookmarkCheck,
  Bookmark,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AvailabilityChecker from "./AvailabilityChecker";
import Loader from "@/components/generic/Loader";
import ImageSlider from "@/components/user/ImageSlider";
import { toast } from "sonner";
import { ReviewData } from "@/interface/user/reviewInterface";
import Reviews from "./Reviews";

const WorkspaceDetails = () => {
  const location = useLocation();
  const workspaceId = location.state.workspaceId;
  const [workspace, setWorkspace] = useState<workspaceData | null>(null);
  const [availabilityStatus, setAvailabilityStatus] = useState<boolean | null>(null);
  const [bookingDetails, setBookingDetails] = useState<bookingDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ReviewData | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (workspaceId: string) => {
      try {
        const response = await workspaceDetails(workspaceId);
        const data = response.data.data;
        if (response.status === 200) {
          if (!Array.isArray(data.workspaceRules)) {
            data.workspaceRules = data.workspaceRules
              ? data.workspaceRules
                .split(",")
                .map((rule: string) => rule.trim())
              : [];
          }
          setWorkspace(data);

          if (data.isSaved !== undefined) {
            setIsSaved(data.isSaved);
          }
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async (workspaceId: string) => {
      try {
        const response = await getWorkspaceReviews(workspaceId);
        console.log(response)
        if (response.status === 200) {
          setReviews(response.data.data);
        }
      } catch (error) {
        handleError(error)
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchData(workspaceId);
    fetchReviews(workspaceId);
    return () => {
      setWorkspace(null);
      setReviews(null)
    };
  }, [workspaceId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAvailabilityUpdate = (isAvailable: boolean, bookingData: any) => {
    setAvailabilityStatus(isAvailable);
    setBookingDetails(bookingData);
  };

  const handleBookNow = async () => {
    const pricePerHour = workspace?.pricePerHour;
    const response = await pendingBookings(
      workspaceId,
      bookingDetails,
      pricePerHour ?? ""
    );
    const bookingId = response.data.data.bookingId;
    if (response.status === 200) {
      navigate(`/checkout/${bookingId}`);
      setTimeout(() => {
        window.location.href = `/checkout/${bookingId}`;
      }, 100);

    }
  };

  const handleSaveWorkspace = async () => {
    setSaveLoading(true);
    try {
      const response = await saveWorkspace(workspaceId, !isSaved);
      console.log(response)
      if (response.status === 200) {
        setIsSaved(!isSaved);
        toast.success(
          !isSaved ? "Workspace saved!" : "Workspace removed from saved list",
          {
            description: !isSaved
              ? "This workspace has been added to your saved list"
              : "This workspace has been removed from your saved list"
          }
        );
      }
    } catch (error) {
      handleError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading || !workspace) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <Loader />
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: any) => {
    if (!date) return "Not specified";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="bg-gray-100">
        <Header />
        <div className="max-w-6xl mx-auto p-6 mt-6 mb-9 bg-gray-100">
          {/* Header Section */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {workspace.workspaceName}
              </h1>
              {!reviewsLoading && reviews && (
                <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">
                    {reviews.averageRating ? reviews.averageRating.toFixed(1) : "New"}
                  </span>
                  <span className="text-sm text-blue-500">
                    ({reviews.ratings?.length || 0})
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>
                  {[workspace.place, workspace.street, workspace.state]
                    .filter(Boolean)
                    .join(", ") || "Location not specified"}
                </span>
              </div>
            </div>
            <button
              onClick={handleSaveWorkspace}
              disabled={saveLoading}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all ${isSaved
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "bg-gray-50 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {saveLoading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
              ) : isSaved ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>

          {/* Image Slider */}
          {workspace.images && workspace.images.length > 0 && (
            <ImageSlider images={workspace.images} />
          )}

          <AvailabilityChecker
            workspace={workspace}
            onAvailabilityChange={handleAvailabilityUpdate}
          />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">
                        {workspace.workspaceType || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium">
                        {workspace.workspaceMail || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Capacity</p>
                      <p className="font-medium">
                        {workspace.capacity
                          ? `${workspace.capacity} people`
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timing Card */}
            <Card>
              <CardHeader>
                <CardTitle>Timing Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Working Hours</p>
                      <p className="font-medium">
                        {formatDate(workspace.startTime)} -{" "}
                        {formatDate(workspace.endTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Working Days</p>
                      <p className="font-medium">
                        {workspace.workingDays || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">
                        {workspace.pricePerHour
                          ? `₹ ${workspace.pricePerHour}/hour`
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">
                {workspace.spaceDescription || "No description available"}
              </p>
            </CardContent>
          </Card>

          {/* Amenities */}
          {workspace.amenities && workspace.amenities.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {workspace.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rules */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Workspace Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <Scroll className="w-5 h-5 text-blue-500 mt-1" />
                <p className="text-gray-700 whitespace-pre-line">
                  {workspace.workspaceRules?.length &&
                    workspace.workspaceRules.some((rule) => rule.trim())
                    ? workspace.workspaceRules.join("\n")
                    : "No rules specified"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Reviews
            reviews={reviews}
            reviewsLoading={reviewsLoading}
          />

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleBookNow}
              disabled={availabilityStatus !== true}
              className={`px-6 py-2 text-white rounded-lg transition-colors ${availabilityStatus === true
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Book Now
            </button>
          </div>
        </div>
        <Footer />
      </div >
    </>
  );
};

export default WorkspaceDetails;