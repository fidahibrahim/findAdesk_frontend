import React, { useState, useEffect } from 'react';
import {
    Clock,
    MapPin,
    User,
    CreditCard,
    Calendar,
    Phone,
    Mail,
    Check,
    X
} from 'lucide-react';
import Navbar from '@/components/owner/Navbar';
import Header from '@/components/owner/Header';
import { getBookingDetails } from '@/services/api/owner';
import { useLocation } from 'react-router-dom';
import { BookingDetailsInt } from '@/interface/owner/BookingInterfaces';
import handleError from '@/utils/errorHandler';

const BookingViewDetails: React.FC = () => {
    const [bookingDetails, setBookingDetails] = useState<BookingDetailsInt | null>(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation()
    const bookingId = location.state.bookingId

    useEffect(() => {
        const fetchBookingDetails = async (bookingId: string) => {
            try {
                const response = await getBookingDetails(bookingId)
                console.log(response)
                if (response) {
                    setBookingDetails(response.data.data._doc);
                    setLoading(false);
                }
            } catch (error) {
                handleError(error)
                setLoading(false);
            }
        };

        fetchBookingDetails(bookingId);
    }, [bookingId]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    const formatTime = (time: string | Date | null | undefined) => {
        if (!time) return "Not selected";

        return new Date(time).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    if (!bookingDetails) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                No Booking Details Found
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <Header />
            <div className="ml-96 container mx-auto px-4 py-8 max-w-5xl">
                <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                    {/* Booking Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Booking Details</h1>
                                <p className="text-blue-200 text-sm">Booking ID: {bookingDetails.bookingId}</p>
                            </div>
                            <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full flex items-center 
                                ${bookingDetails.status === 'pending'
                                    ? 'bg-yellow-500'
                                    : bookingDetails.status === 'completed'
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                }`}>
                                {bookingDetails.status === 'pending' && <Clock className="mr-2" size={16} />}
                                {bookingDetails.status === 'confirmed' && <Check className="mr-2" size={16} />}
                                {bookingDetails.status === 'cancelled' && <X className="mr-2" size={16} />}
                                {bookingDetails.status.charAt(0).toUpperCase() + bookingDetails.status.slice(1)}
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-3 gap-6 p-6">
                        {/* Workspace Details */}
                        <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2 flex items-center">
                                <MapPin className="mr-2 text-blue-500" size={20} />
                                Workspace
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium">{bookingDetails.workspaceId.workspaceName}</p>
                                    <p className="text-gray-600 text-sm">
                                        {bookingDetails.workspaceId.street}, {bookingDetails.workspaceId.place}, {bookingDetails.workspaceId.state}                                        </p>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-2 text-blue-500" size={16} />
                                    <span>{bookingDetails.workspaceId.workspaceMail}</span>
                                </div>
                            </div>
                        </div>

                        {/* Booking Time Details */}
                        <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2 flex items-center">
                                <Calendar className="mr-2 text-blue-500" size={20} />
                                Booking Time
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium">{formatDate(bookingDetails.date)}</p>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="mr-2 text-blue-500" size={16} />
                                    <span>
                                        {formatTime(bookingDetails.startTime)} - {formatTime(bookingDetails.endTime)}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <User className="mr-2 text-blue-500" size={16} />
                                    <span>Seats Booked: {bookingDetails.seats}</span>
                                </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2 flex items-center">
                                <User className="mr-2 text-blue-500" size={20} />
                                User Details
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium">{bookingDetails.userId.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-2 text-blue-500" size={16} />
                                    <span>{bookingDetails.userId.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="mr-2 text-blue-500" size={16} />
                                    <span>{bookingDetails.userId.mobile}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-100 p-6">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">
                            Payment Details
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Base Price</span>
                                    <span className="font-medium">₹{bookingDetails.total}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Additional Seats</span>
                                    <span className="font-medium">₹{bookingDetails.additionalSeatsAmount}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Service Fee</span>
                                    <span className="font-medium">₹{bookingDetails.serviceFee}</span>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold">Total Amount</span>
                                    <span className="text-2xl font-bold text-blue-600">₹{bookingDetails.grandTotal}</span>
                                </div>
                                <div className="flex items-center">
                                    <CreditCard className="mr-2 text-blue-500" size={20} />
                                    <span className="text-gray-600">{bookingDetails.paymentMethod || 'Not Specified'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingViewDetails;