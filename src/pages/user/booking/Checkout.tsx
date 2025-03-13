import Loader from '@/components/generic/Loader';
import Footer from '@/components/user/Footer';
import Header from '@/components/user/Header';
import { RootState } from '@/redux/store/store';
import { bookings } from '@/services/api/user';
import handleError from '@/utils/errorHandler';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { workspaceId, bookingDetails, workspace: workspaceData } = location.state || {};

    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: userInfo?.name || '',
        email: userInfo?.email || '',
        phone: '',
        specialRequests: '',
        paymentMethod: 'card',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    const [errors, setErrors] = useState({
        phone: '',
        specialRequests: '',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    useEffect(() => {
        if (userInfo) {
            setFormData(prev => ({
                ...prev,
                fullName: userInfo.name || '',
                email: userInfo.email || ''
            }));
        }
    }, [userInfo]);

    useEffect(() => {
        if (!workspaceId || !bookingDetails || !workspaceData) {
            navigate('/explore', { replace: true });
        }
    }, [workspaceId, bookingDetails, workspaceData, navigate]);

    const workspace = {
        name: workspaceData.workspaceName,
        images: workspaceData.images,
        description: workspaceData.spaceDescription || "No description",
        hourlyRate: workspaceData.pricePerHour,
        selectedDate: bookingDetails?.date || "Not selected",
        startTime: bookingDetails?.startTime || "Not selected",
        endTime: bookingDetails?.endTime || "Not selected",
        duration: bookingDetails?.duration || 0,
        seats: bookingDetails?.seats || 1,
        amenities: workspaceData.amenities || []
    }

    // Calculate pricing
    const duration = parseInt(workspace.endTime) - parseInt(workspace.startTime)
    const subtotal = workspace.hourlyRate * duration
    const seatsCost = (workspace.seats - 1) * 10;
    const serviceFee = 6;
    const total = subtotal + seatsCost + serviceFee;

    const formatDate = (dateString: any) => {
        if (dateString === "Not selected") return dateString;
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    const formatTime = (startTime: string, endTime: string) => {
        if (startTime === "Not selected" || endTime === "Not selected") {
            return "Not selected";
        }
        const formatHour = (hour: any) => {
            const numHour = parseInt(hour);
            if (isNaN(numHour)) return hour;

            const ampm = numHour >= 12 ? 'PM' : 'AM';
            const hour12 = numHour % 12 || 12;
            return `${hour12} ${ampm}`;
        };
        return `${formatHour(startTime)} - ${formatHour(endTime)}`;
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const newErrors = {
            phone: '',
            specialRequests: '',
            cardName: '',
            cardNumber: '',
            expDate: '',
            cvv: ''
        };

        if (formData.phone.trim() !== '') {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(formData.phone)) {
                newErrors.phone = 'Phone number must be 10 digits with no spaces or special characters';
            }
        }
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        setErrors(newErrors);

        if (!hasErrors) {
            setIsSubmitting(true);
            try {
                const payload = {
                    workspaceId,
                    bookingDetails: {
                        ...bookingDetails,
                        specialRequests: formData.specialRequests,
                        phone: formData.phone
                    },
                    paymentDetails: {
                        method: formData.paymentMethod,
                    },
                    pricing: {
                        total
                    },
                    userId: userInfo?._id
                };
                console.log(payload, "payload")
                const response = await bookings(payload)
                console.log(response)

            } catch (error) {
                handleError(error);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <>
            {isSubmitting && <Loader />}
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow py-8 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
                            <p className="text-gray-600">Complete your booking for {workspace.name}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left column - Main form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* User Information */}
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span>
                                        Your Information
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    readOnly
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    readOnly
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (optional)</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                placeholder="For booking updates"
                                            />
                                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Workspace Details */}
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span>
                                        Workspace Details
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-1/4 mb-3 md:mb-0">
                                                {workspace.images && workspace.images.length > 0 ? (
                                                    <img
                                                        src={workspace.images[0]}
                                                        alt={workspace.name}
                                                        className="h-20 w-20 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="bg-indigo-100 h-20 w-20 rounded-md flex items-center justify-center">
                                                        <span className="text-indigo-600 text-sm">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="md:w-3/4">
                                                <h3 className="font-semibold text-gray-800 text-lg">{workspace.name}</h3>
                                                <p className="text-gray-600 mb-2">{workspace.description}</p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {workspace.amenities.map((amenity: any, index: number) => (
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
                                                <p className="font-medium">{formatDate(workspace.selectedDate)}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                                <p className="text-xs text-gray-500">Time</p>
                                                <p className="font-medium">{formatTime(workspace.startTime, workspace.endTime)}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                                <p className="text-xs text-gray-500">Duration</p>
                                                <p className="font-medium">{parseInt(workspace.endTime) - parseInt(workspace.startTime)} hours</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                                <p className="text-xs text-gray-500">Seats</p>
                                                <p className="font-medium">{workspace.seats} people</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests (optional)</label>
                                        <textarea
                                            id="specialRequests"
                                            name="specialRequests"
                                            rows={3}
                                            value={formData.specialRequests}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                            placeholder="Any special requirements for your booking?"
                                        ></textarea>
                                        {errors.specialRequests && <p className="mt-1 text-sm text-red-600">{errors.specialRequests}</p>}
                                    </div>
                                </div>

                                {/* Payment Section */}
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">3</span>
                                        Payment Method
                                    </h2>

                                    <div className="flex gap-4 mb-4">
                                        <div className="flex items-center">
                                            <input id="card" name="paymentMethod" type="radio" value="card" checked={formData.paymentMethod === 'card'}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                                            <label htmlFor="card" className="ml-2 block text-sm font-medium text-gray-700">
                                                Credit Card
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="paypal"
                                                name="paymentMethod"
                                                type="radio"
                                                value="paypal"
                                                checked={formData.paymentMethod === 'paypal'}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                            />
                                            <label htmlFor="paypal" className="ml-2 block text-sm font-medium text-gray-700">
                                                Pay With Wallet
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                                <input
                                                    type="text"
                                                    id="cardName"
                                                    name="cardName"
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="John Smith"
                                                />
                                                {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="•••• •••• •••• ••••"
                                                />
                                                {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                                                <input
                                                    type="text"
                                                    id="expDate"
                                                    name="expDate"
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="MM/YY"
                                                />
                                                {errors.expDate && <p className="mt-1 text-sm text-red-600">{errors.expDate}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    name="cvv"
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="123"
                                                />
                                                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right column - Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-6">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Booking Summary</h2>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">{parseInt(workspace.endTime) - parseInt(workspace.startTime)} hours × ₹{workspace.hourlyRate}/hr</span>
                                            <span className="font-medium">₹{subtotal}.00</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Additional seats (×{(workspace.seats) - 1})</span>
                                            <span className="font-medium">₹{seatsCost}.00</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Service fee</span>
                                            <span className="font-medium">₹{serviceFee.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span className="text-lg text-indigo-700">₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-200 font-medium flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <span>Complete Booking</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </>
                                        )}
                                    </button>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Secure checkout</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Free cancellation up to 24 hours before</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-4 text-center">
                                        By completing this booking, you agree to our <a href="/termsAndConditions" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="/termsAndConditions" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Checkout;