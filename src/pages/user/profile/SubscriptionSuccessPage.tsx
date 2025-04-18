import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { verifySubscription } from "@/services/api/user";
import handleError from "@/utils/errorHandler";

const SubscriptionSuccessPage = () => {
    const [loading, setLoading] = useState(true);
    const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const handleDoneClick = () => {
        navigate("/profile");
    };
    const getSessionIdFromUrl = () => {
        const params = new URLSearchParams(location.search);
        return params.get("session_id");
    };

    const fetchSubscriptionDetails = async (sessionId: string) => {
        try {
            setLoading(true);
            const response = await verifySubscription(sessionId);
            setSubscriptionDetails(response.data.data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const sessionId = getSessionIdFromUrl();
        if (sessionId) {
            fetchSubscriptionDetails(sessionId);
        } else {
            navigate("/profile");
        }
    }, [location]);

    if (loading) {
        return <div>Loading...</div>;
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
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                Subscription Confirmed!
                            </h1>
                            <p className="text-purple-200 text-sm">
                                Your supscription for {subscriptionDetails.planType} plan is now
                                complete.
                            </p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid md:grid-cols-1 gap-6 p-6">
                        {/* Booking Summary */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-purple-600 border-b pb-2 flex items-center">
                                <CreditCard className="mr-2 text-purple-500" size={24} />
                                Subscription Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subscription Plan</span>
                                    <span className="font-medium">
                                        {subscriptionDetails.planType}
                                    </span>
                                </div>
                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-xl font-bold text-purple-600">
                                        ₹{subscriptionDetails.amount}
                                    </span>
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
    );
};

export default SubscriptionSuccessPage;