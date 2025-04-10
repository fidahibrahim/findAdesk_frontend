import Footer from "@/components/user/Footer"
import Header from "@/components/user/Header"
import { BookingDetailsInt } from "@/interface/owner/BookingInterfaces";
import { bookingConfirmDetails } from "@/services/api/user";
import handleError from "@/utils/errorHandler";
import { CreditCard, User, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BookingConfirmation = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const [bookingDetails, setBookingDetails] = useState<BookingDetailsInt | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await bookingConfirmDetails(bookingId)
                console.log(response)
                if (response) {
                    setBookingDetails(response.data.data[0]);
                    setLoading(false);
                }
            } catch (error) {
                handleError(error)
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        });
    };

    const formatTime = (time: string) => {
        return new Date(time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
        });
    };

    const handleDoneClick = () => {
        navigate('/explore');
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
            </div>
        );
    }

    if (!bookingDetails) {
        return (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen flex flex-col justify-center items-center">
                <p className="text-red-500 text-xl">Failed to load booking details.</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-8 flex-grow flex justify-center items-center">
                <div className="w-full max-w-4xl bg-white shadow-2xl rounded-md overflow-hidden border-2 border-purple-100">
                    {/* Booking Confirmation Header */}
                    <div className=" bg-blue-600 text-white p-6 relative">
                        <div className="absolute top-4 right-4">
                            <CheckCircle className="text-green-400" size={48} />
                        </div>
                        <div className="absolute top-20 right-4 text-sm bg-white/20 px-3 py-1 rounded-full">
                            Booking ID: {bookingId}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                            <p className="text-purple-200 text-sm">Your reservation at {bookingDetails?.workspaceId.workspaceName} is now complete.</p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* User Information */}
                        <div className="bg-purple-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-purple-600 border-b pb-2 flex items-center">
                                <User className="mr-2 text-purple-500" size={24} />
                                Your Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <span className="mt-1 block">{bookingDetails?.userId.name}</span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <span className="mt-1 block">{bookingDetails?.userId.email}</span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <span className="mt-1 block">{bookingDetails?.userId.mobile}</span>
                                </div>
                            </div>
                        </div>

                        {/* Booking Summary */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-purple-600 border-b pb-2 flex items-center">
                                <CreditCard className="mr-2 text-purple-500" size={24} />
                                Booking Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Workspace</span>
                                    <span className="font-medium">{bookingDetails?.workspaceId.workspaceName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date</span>
                                    <span className="font-medium">{formatDate(bookingDetails?.date)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Time</span>
                                    <span className="font-medium">
                                        {formatTime(bookingDetails?.startTime)} - {formatTime(bookingDetails?.endTime)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Seats</span>
                                    <span className="font-medium">{bookingDetails?.seats} people</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-xl font-bold text-purple-600">₹{bookingDetails?.grandTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-6 bg-gray-100 flex justify-center">
                        <Button
                            onClick={handleDoneClick}
                            className="bg-blue-600  text-white font-bold py-3 px-44 "
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BookingConfirmation