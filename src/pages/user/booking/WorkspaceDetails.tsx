import React from 'react';

interface WorkspaceDetailsProps {
    workspace: any;
    bookingDetails: any;
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formatDate: (dateString: string) => string;
    formatTime: (startTime: string, endTime: string) => string;
}

const WorkspaceDetails: React.FC<WorkspaceDetailsProps> = ({
    workspace,
    bookingDetails,
    formData,
    handleInputChange,
    formatDate,
    formatTime
}) => {
    const calculateDuration = (startTime: string, endTime: string) => {
        if (!startTime || !endTime || startTime === "Not selected" || endTime === "Not selected") {
            return "Not selected";
        }
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startTotalMins = startHours * 60 + startMinutes;
        const endTotalMins = endHours * 60 + endMinutes;

        const durationMins = endTotalMins - startTotalMins;

        const hours = Math.floor(durationMins / 60);
        const minutes = durationMins % 60;

        if (minutes === 0) {
            return `${hours} hour${hours !== 1 ? 's' : ''}`;
        } else {
            return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} min`;
        }
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span>
                Workspace Details
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 mb-3 md:mb-0">
                        {workspace.images && workspace.images.length > 0 ? (
                            <img src={workspace.images[0]} alt={workspace.workspaceName} className="h-20 w-20 rounded-md object-cover" />
                        ) : (
                            <div className="bg-indigo-100 h-20 w-20 rounded-md flex items-center justify-center">
                                <span className="text-indigo-600 text-sm">No Image</span>
                            </div>
                        )}
                    </div>
                    <div className="md:w-3/4">
                        <h3 className="font-semibold text-gray-800 text-lg">{workspace.workspaceName}</h3>
                        <p className="text-gray-600 mb-2">{workspace.spaceDescription || "No description"}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {workspace.amenities && workspace.amenities.map((amenity: any, index: number) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
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
                        <p className="font-medium">{formatDate(bookingDetails?.date || "Not selected")}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="font-medium">{formatTime(bookingDetails?.startTime || "Not selected", bookingDetails?.endTime || "Not selected")}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="font-medium">
                            {calculateDuration(bookingDetails?.startTime || "Not selected", bookingDetails?.endTime || "Not selected")}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                        <p className="text-xs text-gray-500">Seats</p>
                        <p className="font-medium">{bookingDetails?.seats || 1} people</p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests (optional)
                </label>
                <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Any special requirements for your booking?"
                ></textarea>
            </div>
        </div>
    );
};

export default WorkspaceDetails;