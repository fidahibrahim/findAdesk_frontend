import { useEffect, useState, } from 'react';
import { viewDetails } from '@/services/api/owner';
import handleError from '@/utils/errorHandler';
import { useLocation } from 'react-router-dom';
import Header from '@/components/owner/Header';
import Navbar from '@/components/owner/Navbar';
import { FormValues } from '@/interface/owner/WorkspaceRegisterValues';

const ViewDetails = () => {
  const location = useLocation()
  const workspaceId = location.state.workspaceId

  const [workspace, setWorkspace] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatTime = (timeString: Date) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).toLowerCase();
  };

  const handleNext = () => {
    if (workspace?.images && currentImageIndex < workspace.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  useEffect(() => {
    const fetchData = async (workspaceId: string) => {
      try {
        const response = await viewDetails(workspaceId)
        const data = response.data.data
        if (response.status === 200) {
          if (Array.isArray(data.aminities) && data.aminities.length === 1 && typeof data.aminities[0] === "string") {
            try {
              data.amenities = JSON.parse(data.aminities[0]);
            } catch {
              data.amenities = [];
            }
          } else {
            data.amenities = [];
          }

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!workspace) {
    return <div>No workspace details available</div>;
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-white mt-2 ml-44 py-12 mb-16">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
          <div className="relative">
            <div
              className="h-56 bg-cover bg-center rounded-t-lg"
              style={{
                backgroundImage: `url(${workspace?.images && workspace?.images[currentImageIndex]
                  ? workspace?.images[currentImageIndex]
                  : "/user/meeting-room.jpg"
                  })`,
              }}
            />
            {workspace.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
                >
                  &#60;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
                >
                  &#62;
                </button>
              </>
            )}
          </div>
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{workspace.workspaceName}</h2>
                <p className="text-gray-600 text-base">{workspace.workspaceType}</p>
                <p className="text-gray-600 text-base">capacity: {workspace.capacity}</p>
              </div>
              <div>
                <p className="text-gray-800 text-base">₹ {workspace.pricePerHour}</p>
              </div>
            </div>
            <p className="text-gray-700 text-base my-4">{workspace.spaceDescription}</p>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-gray-800 text-base font-bold">Address</h3>
              <p className="text-gray-700 text-base">
                {workspace.place}, {workspace.street},  {workspace.state}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-gray-800 text-base font-bold">Availability</h3>
              <p className="text-gray-700 text-base">
                {workspace.startTime ? formatTime(workspace.startTime) : "N/A"} to{" "}
                {workspace.endTime ? formatTime(workspace.endTime) : "N/A"}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-gray-800 text-base font-bold">Amenities</h3>
              <ul className="space-y-1 text-gray-700 text-base">
                {workspace.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}

              </ul>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h6 className="text-gray-800 font-bold">*Rules specified</h6>
              <ul className="space-y-1 text-gray-700 text-base">
                {workspace.workspaceRules && workspace.workspaceRules.length > 0 ? (
                  workspace.workspaceRules
                ) : (
                  <li>No rules specified</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetails;