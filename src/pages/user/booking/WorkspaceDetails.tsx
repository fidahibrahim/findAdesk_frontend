
import { checkoutBookingDetails } from "@/interface/user/checkoutPageInterface";
import React from "react";

interface workspaceDetails {
  workspaceName: string;
  spaceDescription: string;
  amenities: string[];
  images: string;
}
interface WorkspaceDetailsProps {
  workspace: workspaceDetails | undefined;
  bookingDetails: checkoutBookingDetails | undefined;
}

const WorkspaceDetails: React.FC<WorkspaceDetailsProps> = ({
  workspace,
  bookingDetails,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
          2
        </span>
        Workspace Details
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-3 md:mb-0">
            {workspace?.images && (
              <img
                src={workspace.images}
                alt={workspace.workspaceName}
                className="h-20 w-20 rounded-md object-cover"
              />
            )}
          </div>
          <div className="md:w-3/4">
            <h3 className="font-semibold text-gray-800 text-lg">
              {workspace?.workspaceName}
            </h3>
            <p className="text-gray-600 mb-2">
              {workspace?.spaceDescription || "No description"}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {workspace?.amenities &&
                workspace.amenities.map((amenity: any, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {amenity}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-gray-700 mb-2">Booking Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-xs text-gray-500">Date</p>
            <p className="font-medium">
              {bookingDetails?.date
                ? new Date(bookingDetails.date).toLocaleDateString("en-GB") 
                : "Not selected"}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-xs text-gray-500">Time</p>
            <p className="font-medium">
              {bookingDetails?.startTime
                ? new Date(bookingDetails.startTime).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "UTC",
                  })
                : "Not selected"}{" "}
              -{" "}
              {bookingDetails?.endTime
                ? new Date(bookingDetails.endTime).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "UTC",
                  })
                : "Not selected"}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-xs text-gray-500">Duration</p>
            <p className="font-medium">{bookingDetails?.hours}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-xs text-gray-500">Seats</p>
            <p className="font-medium">{bookingDetails?.seats || 1} people</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDetails;