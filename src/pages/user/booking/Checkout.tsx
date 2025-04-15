import { bookings, getBookingDetails, walletPayment } from "@/services/api/user";
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
    const [bookingDetails, setBookingDetails] =
        useState<checkoutBookingDetails>();

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    console.log(paymentMethod, 'payment method selected heree it is')

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

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            console.log(paymentMethod, 'payment method selected in handle subit')
            if (!paymentMethod) {
                message.error("Please select a payment method");
                return;
            }
            const bookingData = {
                ...bookingDetails,
                phoneNumber,
                paymentMethod,
            };
            if (paymentMethod === 'wallet') {
                const response = await walletPayment(bookingData)
                console.log(response)
            } else {
                const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
                const stripe = await loadStripe(stripeKey);
                const response = await bookings(bookingData);
                stripe?.redirectToCheckout({ sessionId: response.data.data.id });
            }

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
                                <PaymentMethod
                                    onPaymentMethodChange={setPaymentMethod}
                                    grandTotal={bookingDetails?.grandTotal || 0}
                                />
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