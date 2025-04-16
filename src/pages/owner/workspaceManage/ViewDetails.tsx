import { useEffect, useState } from 'react';
import { viewDetails } from '@/services/api/owner';
import handleError from '@/utils/errorHandler';
import { useLocation } from 'react-router-dom';
import Header from '@/components/owner/Header';
import Navbar from '@/components/owner/Navbar';
import { FormValues } from '@/interface/owner/WorkspaceRegisterValues';

const ViewDetails = () => {
  const location = useLocation();
  const workspaceId = location.state.workspaceId;
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
        const response = await viewDetails(workspaceId);
        const data = response.data.data;

        if (response.status === 200) {
          if (!Array.isArray(data.workspaceRules)) {
            data.workspaceRules = data.workspaceRules
              ? data.workspaceRules.split(",").map((rule: string) => rule.trim())
              : [];
          }
          setWorkspace(data);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(workspaceId);
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          No workspace details available
        </div>
      </div>
    );
  }

  const remainingSeats = parseInt(workspace.capacity) - parseInt(workspace.bookedSeats || '0');
  const availabilityPercentage = (remainingSeats / parseInt(workspace.capacity)) * 100;

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-white min-h-screen ml-52 mt-16 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            {/* Gallery Section */}
            <div className="relative h-96">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${workspace?.images && workspace?.images[currentImageIndex]
                    ? workspace?.images[currentImageIndex]
                    : "/user/meeting-room.jpg"
                    })`,
                }}
              />
              {workspace.images && workspace.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="flex space-x-2">
                      {workspace.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Content Section */}
            <div className="px-8 py-6">
              {/* Header with status tag */}
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold text-gray-800">{workspace.workspaceName}</h1>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${workspace.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {workspace.status}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">{workspace.workspaceType}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <div className="text-2xl font-bold text-blue-600">₹{workspace.pricePerHour}</div>
                  <p className="text-gray-500 text-sm">per hour</p>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="text-blue-600 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Operating Hours
                  </div>
                  <p className="text-gray-700 font-medium">
                    {workspace.startTime ? formatTime(workspace.startTime) : "N/A"} - {workspace.endTime ? formatTime(workspace.endTime) : "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{workspace.workingDays === "allDays" ? "Open all days" : workspace.workingDays}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="text-green-600 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    Capacity Details
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <p className="text-xs text-gray-500">Total Capacity</p>
                      <p className="text-gray-700 font-medium">{workspace.capacity}</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <p className="text-xs text-gray-500">Booked Seats</p>
                      <p className="text-gray-700 font-medium">{workspace.bookedSeats || 0}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Remaining Seats</p>
                    <div className="flex items-center">
                      <div className="text-gray-700 font-semibold">{remainingSeats}</div>
                      <div className="ml-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${availabilityPercentage > 60 ? 'bg-green-100 text-green-800' :
                            availabilityPercentage > 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {Math.round(availabilityPercentage)}% available
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${availabilityPercentage > 60 ? 'bg-green-500' :
                            availabilityPercentage > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${availabilityPercentage}%` }}>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="text-purple-600 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Location
                  </div>
                  <p className="text-gray-700 font-medium">{workspace.place}</p>
                  <p className="text-gray-500 text-sm mt-1">{workspace.street}, {workspace.state}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">About this space</h2>
                <p className="text-gray-600 leading-relaxed">{workspace.spaceDescription}</p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {workspace.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Workspace Rules
                </h2>
                {workspace.workspaceRules && workspace.workspaceRules.length > 0 ? (
                  <ul className="space-y-2">
                    {workspace.workspaceRules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No specific rules for this workspace.</p>
                )}
              </div>

              {/* Contact Information */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h2>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a className="text-blue-600 hover:underline">
                    {workspace.workspaceMail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetails;