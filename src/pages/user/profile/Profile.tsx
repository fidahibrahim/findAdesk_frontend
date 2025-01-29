import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import { useState } from 'react';
import { User, Activity, LogOut, HelpCircle, Edit, Copy } from 'lucide-react';

const ProfilePage = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const navItems = [
        { title: 'Profile', icon: User },
        { title: 'Activity', icon: Activity },
        { title: 'Logout', icon: LogOut },
        { title: 'Help & support', icon: HelpCircle },
    ];

    const profileData = {
        name: 'Fidah ibrahim',
        email: 'Fida@gmail.com',
        phone: '8891136504',
        addresses: [
            {
                name: 'Fidah ibrahim',
                street: '123 Elm Street, calicut',
                region: 'kerala',
                zip: '277519'
            },

        ]
    };

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-grow">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="flex gap-8">
                            {/* Sidebar */}
                            <div className={`transition-all duration-300 ${isNavOpen ? 'w-64' : 'w-12'}`}>
                                <div className={`transition-all duration-300 ${isNavOpen
                                    ? 'bg-white rounded-lg shadow-sm p-6 w-full'
                                    : 'w-12 h-12 bg-white rounded-full shadow-sm'
                                    }`}>
                                    <div
                                        className={`cursor-pointer ${isNavOpen ? 'mb-6' : ''}`}
                                        onClick={() => setIsNavOpen(!isNavOpen)}
                                    >
                                        <div className={`w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center ${!isNavOpen ? 'w-12 h-12' : ''
                                            }`}>
                                            <User className="w-6 h-6 text-gray-500" />
                                        </div>
                                    </div>

                                    {isNavOpen && (
                                        <nav className="space-y-6">
                                            {navItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="flex items-center space-x-3 w-full px-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                    <span>{item.title}</span>
                                                </button>
                                            ))}
                                        </nav>
                                    )}
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1">
                                <div className="bg-white rounded-lg shadow-sm">
                                    {/* Tabs */}
                                    <div className="flex border-b px-32">
                                        <button
                                            className={`py-8 px-20 font-medium ${activeTab === 'profile'
                                                ? 'border-b-2 border-blue-600 text-blue-600'
                                                : 'text-gray-500'
                                                }`}
                                            onClick={() => setActiveTab('profile')}
                                        >
                                            Profile details
                                        </button>
                                        <button
                                            className={`py-4 px-20 font-medium ${activeTab === 'booking'
                                                ? 'border-b-2 border-blue-600 text-blue-600'
                                                : 'text-gray-500'
                                                }`}
                                            onClick={() => setActiveTab('booking')}
                                        >
                                            Booking details
                                        </button>
                                        <button
                                            className={`py-4 px-32 font-medium ${activeTab === 'wallet'
                                                ? 'border-b-2 border-blue-600 text-blue-600'
                                                : 'text-gray-500'
                                                }`}
                                            onClick={() => setActiveTab('wallet')}
                                        >
                                            Wallet
                                        </button>
                                    </div>

                                    {/* Profile Content */}
                                    {activeTab === 'profile' && (
                                        <div className="p-20">
                                            <div className="flex items-start space-x-16 ">
                                                <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <User className="w-14 h-14 text-gray-400" />
                                                </div>
                                                <div className="flex-1 space-y-8">
                                                    <div className="space-y-2">
                                                        <div>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <p className="text-sm text-gray-500">Name</p>
                                                                <Edit className="w-4 h-4 text-gray-700 cursor-pointer" />
                                                            </div>
                                                            <p className="font-medium">{profileData.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500 mb-2">E-mail</p>
                                                            <p className="font-medium">{profileData.email}</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="font-medium text-lg mb-2">Address</h3>
                                                        <div className="space-y-2">
                                                            {profileData.addresses.map((address, index) => (
                                                                <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                                                                    <div className="absolute right-4 top-4 flex space-x-2">
                                                                        <Edit className="w-4 h-4 text-gray-700 cursor-pointer" />
                                                                        <Copy className="w-4 h-4 text-gray-700 cursor-pointer" />
                                                                    </div>
                                                                    <p className="font-medium">{address.name}</p>
                                                                    <p className="text-gray-600 mt-2">{address.street}</p>
                                                                    <p className="text-gray-600">{address.region}</p>
                                                                    {address.zip && <p className="text-gray-600">{address.zip}</p>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Other tabs content */}
                                    {activeTab === 'booking' && (
                                        <div className="p-8">
                                            <p className="text-gray-500">Booking details content goes here</p>
                                        </div>
                                    )}
                                    {activeTab === 'wallet' && (
                                        <div className="p-8">
                                            <p className="text-gray-500">Wallet content goes here</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ProfilePage;