// import Loader from '@/components/generic/Loader';
// import Footer from '@/components/user/Footer';
// import Header from '@/components/user/Header';
// import { RootState } from '@/redux/store/store';
// import { bookings } from '@/services/api/user';
// import handleError from '@/utils/errorHandler';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UserInfo from './UserInfo';
// import WorkspaceDetails from './WorkspaceDetails';
// import PaymentMethod from './PaymentMethod';
// import { loadStripe } from '@stripe/stripe-js';

// const Checkout = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { workspaceId, bookingDetails, workspace: workspaceData } = location.state || {};
//     const userInfo = useSelector((state: RootState) => state.user.userInfo)
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [formData, setFormData] = useState({
//         fullName: userInfo?.name || '',
//         email: userInfo?.email || '',
//         phone: '',
//         specialRequests: '',
//         paymentMethod: 'card',
//     });

//     useEffect(() => {
//         if (userInfo) {
//             setFormData(prev => ({
//                 ...prev,
//                 fullName: userInfo.name || '',
//                 email: userInfo.email || ''
//             }));
//         }
//     }, [userInfo]);

//     useEffect(() => {
//         if (!workspaceId || !bookingDetails || !workspaceData) {
//             navigate('/explore', { replace: true });
//         }
//     }, [workspaceId, bookingDetails, workspaceData, navigate]);

//     const formatDate = (dateString: string) => {
//         if (!dateString || dateString === "Not selected") return "Not selected";
//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('en-US', {
//                 weekday: 'short',
//                 month: 'short',
//                 day: 'numeric'
//             });
//         } catch {
//             return dateString;
//         }
//     };

//     const formatTime = (startTime: string, endTime: string) => {
//         if (!startTime || !endTime || startTime === "Not selected" || endTime === "Not selected") {
//             return "Not selected";
//         }
//         const formatTimeString = (timeString: string) => {
//             const [hours, minutes] = timeString.split(':').map(part => parseInt(part));
//             if (isNaN(hours)) return timeString;
//             const ampm = hours >= 12 ? 'PM' : 'AM';
//             const hours12 = hours % 12 || 12;
//             return `${hours12}${minutes ? `:${minutes.toString().padStart(2, '0')}` : ''} ${ampm}`;
//         };
//         return `${formatTimeString(startTime)} - ${formatTimeString(endTime)}`;
//     };

//     const duration = parseInt(bookingDetails?.endTime || '0') - parseInt(bookingDetails?.startTime || '0');
//     const subtotal = workspaceData.pricePerHour * duration;
//     const seatsCost = ((bookingDetails?.seats || 1) - 1) * 10;
//     const serviceFee = 6;
//     const total = subtotal + seatsCost + serviceFee;

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         try {
//             const bookingPayload = {
//                 userId: userInfo?._id,
//                 workspaceId: workspaceId,
//                 bookingDetails: bookingDetails,
//                 mobile: formData.phone,
//                 specialRequests: formData.specialRequests,
//                 paymentMethod: formData.paymentMethod,
//                 total: total,
//             };
//             const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
//             const stripe = await loadStripe(stripeKey)
//             const response = await bookings(bookingPayload);
//             stripe?.redirectToCheckout({ sessionId: response.data.data.id })

//         } catch (error) {
//             handleError(error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//     return (
//         <>
//             {isSubmitting && <Loader />}
//             <div className="bg-gray-100 min-h-screen flex flex-col">
//                 <Header />
//                 <main className="flex-grow py-8 px-4">
//                     <div className="max-w-6xl mx-auto">
//                         <div className="mb-6">
//                             <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
//                             <p className="text-gray-600">Complete your booking for {workspaceData.workspaceName}</p>
//                         </div>
//                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                             <div className="lg:col-span-2 space-y-6">
//                                 <UserInfo
//                                     formData={formData}
//                                     handleInputChange={handleInputChange}
//                                 />
//                                 <WorkspaceDetails
//                                     workspace={workspaceData}
//                                     bookingDetails={bookingDetails}
//                                     formData={formData}
//                                     handleInputChange={handleInputChange}
//                                     formatDate={formatDate}
//                                     formatTime={formatTime}
//                                 />
//                                 <PaymentMethod
//                                     formData={formData}
//                                     handleInputChange={handleInputChange}
//                                 />
//                             </div>

//                             {/* Right column - Summary */}
//                             <div className="lg:col-span-1">
//                                 <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-6">
//                                     <h2 className="text-lg font-semibold mb-4 text-gray-800">Booking Summary</h2>

//                                     <div className="space-y-3 mb-4">
//                                         <div className="flex justify-between text-sm">
//                                             <span className="text-gray-600">
//                                                 {parseInt(bookingDetails?.endTime || '0') - parseInt(bookingDetails?.startTime || '0')} hours × ₹{workspaceData.pricePerHour}/hr
//                                             </span>
//                                             <span className="font-medium">₹{subtotal}.00</span>
//                                         </div>
//                                         <div className="flex justify-between text-sm">
//                                             <span className="text-gray-600">Additional seats (×{(bookingDetails?.seats || 1) - 1})</span>
//                                             <span className="font-medium">₹{seatsCost}.00</span>
//                                         </div>
//                                         <div className="flex justify-between text-sm">
//                                             <span className="text-gray-600">Service fee</span>
//                                             <span className="font-medium">₹{serviceFee.toFixed(2)}</span>
//                                         </div>
//                                         <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold">
//                                             <span>Total</span>
//                                             <span className="text-lg text-indigo-700">₹{total.toFixed(2)}</span>
//                                         </div>
//                                     </div>

//                                     <button
//                                         type="submit"
//                                         onClick={handleSubmit}
//                                         disabled={isSubmitting}
//                                         className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-200 font-medium flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//                                     >
//                                         {isSubmitting ? (
//                                             <>
//                                                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                 </svg>
//                                                 Processing...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <span>Complete Booking</span>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                 </svg>
//                                             </>
//                                         )}
//                                     </button>

//                                     <div className="mt-4 space-y-2">
//                                         <div className="flex items-center text-gray-600 text-xs">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                                             </svg>
//                                             <span>Secure checkout</span>
//                                         </div>
//                                         <div className="flex items-center text-gray-600 text-xs">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                             </svg>
//                                             <span>Free cancellation up to 24 hours before</span>
//                                         </div>
//                                     </div>

//                                     <p className="text-xs text-gray-500 mt-4 text-center">
//                                         By completing this booking, you agree to our{' '}
//                                         <a href="/termsAndConditions" className="text-indigo-600 hover:underline">Terms of Service</a> and{' '}
//                                         <a href="/termsAndConditions" className="text-indigo-600 hover:underline">Privacy Policy</a>.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//                 <Footer />
//             </div>
//         </>
//     );
// };

// export default Checkout;

import { bookings, getBookingDetails } from "@/services/api/user";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/user/Header";
import UserInfo from "./UserInfo";
import WorkspaceDetails from "./WorkspaceDetails";
import PaymentMethod from "./PaymentMethod";
import Footer from "@/components/user/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { message } from "antd";
import { checkoutBookingDetails } from "@/interface/user/checkoutPageInterface";

const Checkout = () => {
    const { bookingId } = useParams();
    console.log("bookingId", bookingId);

    const [bookingDetails, setBookingDetails] =
        useState<checkoutBookingDetails>();

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    useEffect(() => {
        const fetchBookingDetails = async (bookingId: string) => {
            try {
                const response = await getBookingDetails(bookingId);
                if (response.status === 200) {
                    setBookingDetails(response.data.data[0]);
                }
            } catch (error) {
                handleError(error);
            }
        };
        if (bookingId) {
            fetchBookingDetails(bookingId);
        }
    }, [bookingId]);

    console.log("my checkout bookingDetails", bookingDetails);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (!paymentMethod) {
                message.error("Please select a payment method");
                return;
            }

            const bookingData = {
                ...bookingDetails,
                phoneNumber,
                paymentMethod,
            };
            console.log("my sending bookingData - ", bookingData);

            const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
            const stripe = await loadStripe(stripeKey);
            const response = await bookings(bookingData);
            stripe?.redirectToCheckout({ sessionId: response.data.data.id });
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow py-8 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Secure Checkout
                            </h1>
                            <p className="text-gray-600">
                                Complete your booking for{" "}
                                {bookingDetails?.workspace?.workspaceName}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <UserInfo
                                    userDetails={bookingDetails?.user}
                                    onPhoneNumberChange={setPhoneNumber}
                                />
                                <WorkspaceDetails
                                    workspace={bookingDetails?.workspace}
                                    bookingDetails={bookingDetails}
                                />
                                <PaymentMethod onPaymentMethodChange={setPaymentMethod} />
                            </div>

                            {/* Right column - Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-6">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                        Booking Summary
                                    </h2>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {bookingDetails?.hours} hours × ₹{" "}
                                                {bookingDetails?.pricePerHour} /hr
                                            </span>
                                            <span className="font-medium">
                                                ₹ {bookingDetails?.total}.00
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                Additional seats ({bookingDetails?.total} ×{" "}
                                                {bookingDetails?.additionalSeats})
                                            </span>
                                            <span className="font-medium">
                                                ₹ {bookingDetails?.additionalSeatsAmount}.00
                                            </span>
                                        </div>
                                        <div className="border-t border-gray-200 flex justify-between text-sm">
                                            <span className="text-gray-600">SubTotal</span>
                                            <span className="font-medium">
                                                ₹ {bookingDetails?.subTotal?.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className=" flex justify-between text-sm">
                                            <span className="text-gray-600">Service fee (10%)</span>
                                            <span className="font-medium">
                                                ₹ {bookingDetails?.serviceFee?.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span className="text-lg text-indigo-700">
                                                ₹ {bookingDetails?.grandTotal?.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-200 font-medium flex items-center justify-center gap-2 "
                                    >
                                        complete booking
                                    </button>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                            <span>Secure checkout</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>Free cancellation up to 24 hours before</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-4 text-center">
                                        By completing this booking, you agree to our{" "}
                                        <a
                                            href="/termsAndConditions"
                                            className="text-indigo-600 hover:underline"
                                        >
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="/termsAndConditions"
                                            className="text-indigo-600 hover:underline"
                                        >
                                            Privacy Policy
                                        </a>
                                        .
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