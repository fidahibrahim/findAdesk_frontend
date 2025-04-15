import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Calendar, Clock, MapPin, Users,
    ArrowLeft, Clipboard, CreditCard,
    Star, X,
    AlertCircle
} from 'lucide-react';
import Layout from '../profile/Sidebar';
import { BookingDetailsInt } from '@/interface/owner/BookingInterfaces';
import handleError from '@/utils/errorHandler';
import { bookings, cancelBooking, fetchBookingDetails } from '@/services/api/user';
import ReviewForm from './ReviewForm';
import { loadStripe } from "@stripe/stripe-js";
import { toast } from 'sonner';

interface Rating {
    userId: string;
    review: string;
    rating: number;
    createdAt: string;
}
interface ExtendedBookingDetails extends BookingDetailsInt {
    ratings?: Rating[];
}
const BookingDetails = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const [booking, setBooking] = useState<ExtendedBookingDetails | null>(null)
    const [loading, setLoading] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const getBookingDetail = async () => {
            try {
                setLoading(true);
                const response = await fetchBookingDetails(bookingId!)
                if (response && response.data) {
                    const bookingData = response.data.data._doc;
                    const ratings = response.data.data.ratings || [];
                    setBooking({
                        ...bookingData,
                        ratings
                    });
                }
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        };
        if (bookingId) {
            getBookingDetail();
        }
    }, [bookingId]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const paymentMethod = "paymentGateway";
            const bookingData = {
                ...booking,
                paymentMethod,
            };
            const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
            const stripe = await loadStripe(stripeKey);
            const response = await bookings(bookingData);
            stripe?.redirectToCheckout({ sessionId: response.data.data.id });
        } catch (error) {
            handleError(error);
        }
    };

    const formatDate = (date: any) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'saved':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleCancellation = async () => {
        try {
            setCancelling(true)
            const response = await cancelBooking(bookingId!)
            console.log(response)
            if (response.data.statusCode === 200) {
                toast.success('Booking cancelled successfully. Amount refunded to your wallet.');
                setBooking(prev => ({
                    ...response.data.data,
                    workspaceId: prev?.workspaceId,
                    ratings: prev?.ratings || []
                }));
                setShowCancelConfirm(false);
            }
        } catch (error) {
            handleError(error)
        } finally {
            setCancelling(false);
        }
    }

    const hasReview = booking?.ratings && booking.ratings.length > 0;
    const userReview = hasReview && booking?.ratings ? booking.ratings[0] : null;

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-12">Loading booking details...</div>
            </Layout>
        );
    }

    if (!booking) {
        return (
            <Layout>
                <div className="text-center py-12 text-gray-500">Booking not found</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Bookings
                    </button>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking?.status)}`}
                        >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Workspace Preview */}
                <div className="bg-blue-50 rounded-xl shadow-sm overflow-hidden mb-6 flex">
                    <img
                        src={booking.workspaceId.images ? booking.workspaceId.images[0] : 'no image found'}
                        alt={booking.workspaceId.workspaceName}
                        className="w-32 ml-4 rounded-md h-auto object-cover"
                    />
                    <div className="ml-4 p-4 flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{booking.workspaceId.workspaceName}</h2>
                        <p className="text-base text-gray-700 ">{booking.workspaceId.spaceDescription}</p>
                        <div className="flex items-center text-base text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{booking.workspaceId.place}, {booking.workspaceId.street}, {booking.workspaceId.state}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Payment Information */}
                    <div className="bg-blue-50 rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-gray-700">
                                <span>Base price</span>
                                <span>₹{booking.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-700">
                                <span>Service Fee (10%)</span>
                                <span>₹{booking.serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-700">
                                <span>Additional Seats</span>
                                <span>₹{booking.additionalSeatsAmount.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between items-center font-semibold">
                                    <span>Total</span>
                                    <span className="text-lg">₹{booking.grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t flex items-center">
                                <CreditCard className="w-5 h-5 text-green-600 mr-2" />
                                <span className="text-green-700 font-medium">
                                    {booking.paymentMethod || 'Credit Card'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl shadow-sm p-6 md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-medium">{formatDate(booking.date)}</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Time</p>
                                    <p className="font-medium">{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Guests</p>
                                    <p className="font-medium">{booking.seats} people</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Clipboard className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Booking ID</p>
                                    <p className="font-medium">{booking.bookingId}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                        {booking.status === 'pending' && (
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-3 bg-blue-700 text-white font-normal rounded-lg shadow-sm transition-colors">
                                Complete Booking
                            </button>
                        )}

                        {booking.status === 'completed' && (
                            <div className='mb-6'>
                                {hasReview && userReview ? (
                                    <div className="bg-blue-50 rounded-xl shadow-sm p-6 w-full">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                            <div className="md:w-3/3">
                                                <div className="mb-2">
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        review added at:{new Date(userReview.createdAt).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`w-5 h-5 ${star <= userReview?.rating
                                                                    ? 'text-yellow-400 fill-yellow-400'
                                                                    : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {userReview?.review && (
                                                <div className="md:w-3/3 ml-4 mt-4 md:mt-2">
                                                    <div className="text-gray-700 bg-white p-2 rounded-lg border border-gray-100">
                                                        "{userReview.review}"
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : !showReviewForm ? (
                                    <div>
                                        <a
                                            onClick={() => setShowReviewForm(true)}
                                            className="text-blue-500 underline font-normal cursor-pointer flex items-center"
                                        >
                                            <Star className="w-5 h-5 mr-2" />
                                            Rate & Review Workspace
                                        </a>
                                        <a
                                            onClick={() => setShowCancelConfirm(true)}
                                            className="text-red-500 underline font-normal cursor-pointer flex items-center"
                                        >
                                            <X className="w-5 h-5 mr-2" />
                                            Cancel Booking
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                    {showReviewForm && booking.status === 'completed' && !hasReview && (
                        <ReviewForm
                            workspaceName={booking.workspaceId.workspaceName}
                            bookingId={booking.bookingId}
                            workspaceId={booking.workspaceId._id}
                            onCancel={() => setShowReviewForm(false)}
                            onSuccess={() => window.location.reload()}
                        />
                    )}
                </div>
            </div>

            {showCancelConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center mb-4 text-red-600">
                            <AlertCircle className="w-6 h-6 mr-2" />
                            <h3 className="text-lg font-bold">Cancel Booking</h3>
                        </div>

                        <p className="mb-6 text-gray-700">
                            Are you sure you want to cancel this booking? The amount will be refunded to your wallet.
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowCancelConfirm(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                                disabled={cancelling}
                            >
                                No, Keep Booking
                            </button>
                            <button
                                onClick={handleCancellation}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center"
                                disabled={cancelling}
                            >
                                {cancelling ? 'Processing...' : 'Yes, Cancel Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default BookingDetails;