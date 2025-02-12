import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import { workspaceData } from "@/interface/user/workspaceInterface";
import { workspaceDetails } from "@/services/api/user";
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
  ArrowLeft
} from 'lucide-react';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WorkspaceDetails = () => {
  const location = useLocation()
  const workspaceId = location.state.workspaceId

  const [workspace, setWorkspace] = useState<workspaceData | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async (workspaceId: string) => {
      try {
        const response = await workspaceDetails(workspaceId)
        const data = response.data.data
        if (response.status === 200) {

          if (!Array.isArray(data.workspaceRules)) {
            data.workspaceRules = data.workspaceRules
              ? data.workspaceRules.split(",").map((rule: string) => rule.trim())
              : [];
          }
          setWorkspace(data)
        }
      } catch (error) {
        handleError(error)
      } finally {
        setLoading(false);
      }
    }
    fetchData(workspaceId)
  }, [workspaceId])

  const handleBack = () => {
    navigate(-1);
  };


  if (loading || !workspace) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-gray-500">Loading workspace details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: any) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto p-6 mt-6 mb-9 bg-gray-100">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{workspace.workspaceName}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>
              {[
                workspace.place,
                workspace.street,
                workspace.state
              ].filter(Boolean).join(', ') || 'Location not specified'}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        {workspace.images && workspace.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {workspace.images.map((imageUrl: string, index: number) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Workspace ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

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
                    <p className="font-medium">{workspace.workspaceType || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{workspace.workspaceMail || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-medium">{workspace.capacity ? `${workspace.capacity} people` : 'Not specified'}</p>
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
                      {formatDate(workspace.startTime)} - {formatDate(workspace.endTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Working Days</p>
                    <p className="font-medium">{workspace.workingDays || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">
                      {workspace.pricePerHour ? `₹ ${workspace.pricePerHour}/hour` : 'Not specified'}
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
              {workspace.spaceDescription || 'No description available'}
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
        {workspace.workspaceRules && (
          <Card>
            <CardHeader>
              <CardTitle>Workspace Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <Scroll className="w-5 h-5 text-blue-500 mt-1" />
                <p className="text-gray-700 whitespace-pre-line">
                  {workspace.workspaceRules}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default WorkspaceDetails;