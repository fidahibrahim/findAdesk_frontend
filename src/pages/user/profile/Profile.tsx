import { useEffect, useState } from 'react';
import { User, Edit, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { profileInterface } from '@/interface/user/profileInterface';
import { addSubscription, getProfile } from '@/services/api/user';
import handleError from '@/utils/errorHandler';
import Layout from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState<profileInterface | null>(null);
    const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
    const [isSubscriptionExpired, setIsSubscriptionExpired] = useState(false);
    const navigate = useNavigate()

    const checkSubscriptionExpiration = (user: profileInterface) => {
        if (!user.isSubscribed || !user.subscriptionEndDate) {
            return false;
        }
        const currentDate = new Date();
        const endDate = new Date(user.subscriptionEndDate);
        return currentDate > endDate;
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                const userData = response.data.data;
                const expired = checkSubscriptionExpiration(userData);
                setIsSubscriptionExpired(expired);

                if (expired && userData.isSubscribed) {
                    userData.isSubscribed = false;
                }

                setProfileData(userData);
            } catch (error) {
                handleError(error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubscribe = async (planType: string, amount: number) => {
        const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        const stripe = await loadStripe(stripeKey);
        const response = await addSubscription(planType, amount);
        stripe?.redirectToCheckout({ sessionId: response.data.data.id });
        setShowSubscriptionPlans(false);
    };

    const formatDate = (dateString?: Date) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getDaysRemaining = (endDateString?: Date) => {
        if (!endDateString) return 0;
        const endDate = new Date(endDateString);
        const currentDate = new Date();
        if (currentDate > endDate) return 0;
        const differenceInTime = endDate.getTime() - currentDate.getTime();
        return Math.ceil(differenceInTime / (1000 * 3600 * 24));
    };

    return (
        <div>
            <Layout>
                <Card className="max-w-4xl mx-auto shadow-md">

                    <CardContent className="p-8 relative">
                        {profileData && !profileData.isSubscribed && (
                            <button
                                className="absolute top-6 right-6 px-7 py-2 text-sm rounded-lg font-medium text-red-700 border-2 border-red-600"
                                onClick={() => setShowSubscriptionPlans(!showSubscriptionPlans)}
                            >
                                Subscribe
                            </button>
                        )}
                        <div className="space-y-8">
                            <div className="flex items-center space-x-6 pb-6 border-b">
                                <div className="w-28 h-28 rounded-full overflow-hidden shadow-md">
                                    {profileData?.image ? (
                                        <img src={profileData.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                                            <User className="w-14 h-14 text-blue-500" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{profileData?.name}</h1>
                                    <p className="text-gray-500">{profileData?.email}</p>
                                    <Button variant="outline" size="sm"
                                        className="mt-2"
                                        onClick={() => navigate("/editProfile")}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                                            <p className="mt-1 font-medium text-gray-900">{profileData?.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Email</label>
                                            <p className="mt-1 font-medium text-gray-900">{profileData?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                {profileData?.isSubscribed && (
                                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-lg font-semibold text-blue-800">Subscription Status</h2>
                                            <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                <span className="text-sm font-medium">Active</span>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-sm font-medium text-blue-600">Plan Type</label>
                                                <p className="mt-1 font-medium text-gray-900 capitalize">
                                                    {profileData.subscriptionType} Plan
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-blue-600">Benefits</label>
                                                <p className="mt-1 text-gray-700">
                                                    {profileData.subscriptionType === 'monthly' ? (
                                                        'Cancel up to 1 hour before booking with no cancellation fees'
                                                    ) : (
                                                        'All monthly plan features plus 20% discount'
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-blue-600">Start Date</label>
                                                <p className="mt-1 text-gray-700">
                                                    {formatDate(profileData.subscriptionStartDate)}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-blue-600">End Date</label>
                                                <div className="mt-1 flex items-center">
                                                    <p className="text-gray-700 mr-2">
                                                        {formatDate(profileData.subscriptionEndDate)}
                                                    </p>
                                                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                                        {getDaysRemaining(profileData.subscriptionEndDate)} days remaining
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Expired Subscription Notice */}
                                {isSubscriptionExpired && (
                                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                                        <div className="flex items-center space-x-3 text-yellow-800">
                                            <AlertCircle className="w-5 h-5" />
                                            <h3 className="font-medium">Your subscription has expired</h3>
                                        </div>
                                        <p className="mt-2 text-yellow-700 pl-8">
                                            Your {profileData?.subscriptionType} plan expired on {formatDate(profileData?.subscriptionEndDate)}.
                                            Please renew your subscription to continue enjoying our premium features.
                                        </p>
                                        <div className="mt-4 pl-8">
                                            <Button
                                                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                                                onClick={() => setShowSubscriptionPlans(true)}
                                            >
                                                Renew Subscription
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Subscription Plans Modal */}
                {showSubscriptionPlans && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Choose Your Subscription Plan</h2>
                                <button
                                    onClick={() => setShowSubscriptionPlans(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Monthly Plan Card */}
                                <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                    <div className="bg-blue-50 p-4 border-b">
                                        <h3 className="text-xl font-bold text-center">Monthly Plan</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-center mb-4">
                                            <span className="text-3xl font-bold">₹79.00</span>
                                            <span className="text-gray-500">/month</span>
                                        </div>
                                        <ul className="space-y-2 mb-6">
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                Cancel up to 1 hour before booking
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                No cancellation fees
                                            </li>

                                        </ul>
                                        <Button
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            onClick={() => handleSubscribe('monthly', 79)}
                                        >
                                            {isSubscriptionExpired ? "Renew Now" : "Subscribe Now"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Yearly Plan Card */}
                                <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
                                    <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                                        Save 20%
                                    </div>
                                    <div className="bg-blue-50 p-4 border-b">
                                        <h3 className="text-xl font-bold text-center">Yearly Plan</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-center mb-4">
                                            <span className="text-3xl font-bold">₹189.06</span>
                                            <span className="text-gray-500">/year</span>
                                            <p className="text-sm text-gray-500">₹15.08/month, billed annually</p>
                                        </div>
                                        <ul className="space-y-2 mb-6">
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                All monthly plan features
                                            </li>
                                            <li className="flex items-center ">
                                                <span className="text-green-500 mr-2">✓</span>
                                                20% discount vs monthly plan
                                            </li>
                                        </ul>
                                        <Button
                                            className="w-full bg-green-600 hover:bg-green-700"
                                            onClick={() => handleSubscribe('yearly', 189.06)}
                                        >
                                            {isSubscriptionExpired ? "Renew Now" : "Subscribe Now"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
        </div>
    );
};

export default ProfilePage;