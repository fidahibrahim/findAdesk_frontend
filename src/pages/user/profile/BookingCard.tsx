import { Clock, Calendar, DollarSign, ArrowRight, MapPin, } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingCard = ({ booking }: any) => {
    const formatDate = (date: any) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (date: any) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
        });
    };
    const isSaved = booking.status === 'saved';
    const truncateDescription = (text: string) => {
        if (!text) return '';
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    };

    return (
        <div className="bg-white border rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-all duration-300 group">
            <div className="bg-blue-50 rounded-md px-2 py-2 flex items-center space-x-6 w-full">
                <img
                    src={booking.workspaceId.images[0]}
                    alt={booking.workspaceId.workspaceName}
                    className="w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">
                            {booking.workspaceId.workspaceName}
                        </h3>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${isSaved
                                ? 'bg-yellow-100 text-yellow-800'
                                : booking.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                        >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                    </div>
                    {!isSaved ? (
                        <>
                            <div className="flex items-center space-x-4 text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4" />
                                    <span>
                                        {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="font-semibold">₹{booking.grandTotal.toFixed(2)}</span>
                                </div>
                                <Link
                                    to={`/bookingDetails/${booking._id}`}
                                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:underline"
                                >
                                    View Details
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center space-x-2 text-gray-600 mb-1">
                                <MapPin className="w-4 h-4" />
                                <span>{booking.workspaceId.place}, {booking.workspaceId.state}</span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {truncateDescription(booking.workspaceId.spaceDescription)}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2 text-gray-600">
                                </div>
                                <Link
                                    to={`/workspaceDetails/${booking.workspaceId._id}`}
                                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:underline"
                                >
                                    View Workspace
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default BookingCard