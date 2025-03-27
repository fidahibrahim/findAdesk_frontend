import { Clock, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingCard = ({ booking }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white border rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-all duration-300 group">
            <div className="bg-blue-50 rounded-md px-2 py-2 flex items-center space-x-6 w-full">
                <img
                    src={booking.workspaceId.image}
                    alt={booking.workspaceId.name}
                    className="w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">
                            {booking.workspaceId.name}
                        </h3>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'saved'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }`}
                        >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                    </div>
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
                            <span className="font-semibold">${booking.total.toFixed(2)}</span>
                        </div>
                        <Link
                            to={`/bookings/${booking._id}`}
                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:underline"
                        >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard