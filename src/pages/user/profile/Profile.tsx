import { useEffect, useState } from 'react';
import { User, Edit, Copy, Activity, LogOut, HelpCircle, Menu, X } from 'lucide-react';
import Footer from '@/components/user/Footer';
import Header from '@/components/user/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { profileInterface } from '@/interface/user/profileInterface';
import { getProfile } from '@/services/api/user';
import handleError from '@/utils/errorHandler';

const ProfilePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState<profileInterface | null>(null);

    const navItems = [
        { id: 'profile', title: 'Profile', icon: User },
        { id: 'activity', title: 'Activity', icon: Activity },
        { id: 'wallet', title: 'Wallet', icon: Activity },
        { id: 'help', title: 'Help & Support', icon: HelpCircle },
        { id: 'logout', title: 'Logout', icon: LogOut },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                console.log(response,"response profile")
                setProfileData(response.data.data);
            } catch (error) {
                handleError(error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="flex-1 flex">
                {/* Sidebar */}
                <aside
                    className={`fixed md:relative bg-white border-r border-gray-200 h-[calc(100vh-4rem)] transition-all duration-300 z-50 
            ${isSidebarOpen ? 'w-64' : 'w-20'}`}
                >
                    <div className="p-4 flex justify-between items-center border-b">
                        <h2 className={`font-semibold ${!isSidebarOpen && 'hidden'}`}>Dashboard</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="hover:bg-gray-100"
                        >
                            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </div>

                    <nav className="p-2 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors
                  ${activeTab === item.id
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-blue-700' : 'text-gray-500'}`} />
                                {isSidebarOpen && (
                                    <span className="ml-3 font-medium">{item.title}</span>
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Card className="max-w-4xl mx-auto">
                        <CardContent className="p-6">
                            {activeTab === 'profile' && (
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-6 pb-6 border-b">
                                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                                            <User className="w-12 h-12 text-blue-500" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-semibold text-gray-900">{profileData?.name}</h1>
                                            <p className="text-gray-500">{profileData?.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-lg font-semibold">Personal Information</h2>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-sm text-gray-500">Full Name</label>
                                                    <p className="mt-1 font-medium">{profileData?.name}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-gray-500">Email</label>
                                                    <p className="mt-1 font-medium">{profileData?.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-lg font-semibold">Addresses</h2>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Manage
                                                </Button>
                                            </div>
                                            {profileData?.address && profileData.address.length > 0 ? (
                                                <div className="grid gap-4">
                                                    {profileData.address.map((address, index) => (
                                                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="font-medium">{address.place}</p>
                                                                    <p className="text-gray-600 mt-1">{address.state}</p>
                                                                    <p className="text-gray-600">{address.pincode}</p>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <Button variant="ghost" size="icon">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon">
                                                                        <Copy className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                                    <p className="text-gray-500">No addresses added yet</p>
                                                    {/* <Button variant="outline" className="mt-4">
                                                        Add Address
                                                    </Button> */}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className="py-4">
                                    <h2 className="text-lg font-semibold mb-4">Activity</h2>
                                    <p className="text-gray-500">Your recent activity will appear here</p>
                                </div>
                            )}

                            {activeTab === 'wallet' && (
                                <div className="py-4">
                                    <h2 className="text-lg font-semibold mb-4">Wallet</h2>
                                    <p className="text-gray-500">Your wallet details will appear here</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;