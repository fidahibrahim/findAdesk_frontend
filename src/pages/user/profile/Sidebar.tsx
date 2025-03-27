import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import { useState } from 'react';
import { User, Activity, Key, HelpCircle, Menu, X, Wallet } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Layout = ({ children }: any) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 bg-gray-50">
                <aside className={`fixed md:sticky top-0 h-[calc(100vh-4rem)] bg-gray-50 shadow-lg rounded-r-xl transition-all duration-300 z-50 
                    ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
                    <div className="p-4 flex justify-between items-center border-b">
                        <h2 className={`font-semibold text-lg text-gray-800 ${!isSidebarOpen && 'hidden'}`}>
                            Dashboard
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="hover:bg-gray-100 rounded-full"
                        >
                            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </div>

                    <nav className="p-3 space-y-2">
                        <a
                            href="/profile"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                            ${location.pathname === '/profile'
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <User className={`h-5 w-5 ${location.pathname === '/profile' ? 'text-blue-700' : 'text-gray-500'}`} />
                            {isSidebarOpen && (
                                <div className="ml-3 text-left">
                                    <span className="font-medium block">Profile</span>
                                    <span className="text-xs text-gray-500">Manage your personal information</span>
                                </div>
                            )}
                        </a>
                        <a
                            href="/profile/resetPassword"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                            ${location.pathname === '/profile/resetPassword'
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Key className={`h-5 w-5 ${location.pathname === '/profile/resetPassword' ? 'text-blue-700' : 'text-gray-500'}`} />
                            {isSidebarOpen && (
                                <div className="ml-3 text-left">
                                    <span className="font-medium block">Change Password</span>
                                    <span className="text-xs text-gray-500">Update your security credentials</span>
                                </div>
                            )}
                        </a>
                        <a
                            href="/profile/activity"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                            ${location.pathname === '/profile/activity'
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Activity className={`h-5 w-5 ${location.pathname === '/profile/activity' ? 'text-blue-700' : 'text-gray-500'}`} />
                            {isSidebarOpen && (
                                <div className="ml-3 text-left">
                                    <span className="font-medium block">Activity</span>
                                    <span className="text-xs text-gray-500">View your recent actions</span>
                                </div>
                            )}
                        </a>

                        <a
                            href="/profile/wallet"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                            ${location.pathname === '/profile/wallet'
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Wallet className={`h-5 w-5 ${location.pathname === '/profile/wallet' ? 'text-blue-700' : 'text-gray-500'}`} />
                            {isSidebarOpen && (
                                <div className="ml-3 text-left">
                                    <span className="font-medium block">Wallet</span>
                                    <span className="text-xs text-gray-500">Manage your payments and balance</span>
                                </div>
                            )}
                        </a>

                        <a
                            href="/termsAndConditions"
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                            ${location.pathname === '/termsAndConditions'
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <HelpCircle className={`h-5 w-5 ${location.pathname === '/termsAndConditions' ? 'text-blue-700' : 'text-gray-500'}`} />
                            {isSidebarOpen && (
                                <div className="ml-3 text-left">
                                    <span className="font-medium block">Help & Support</span>
                                    <span className="text-xs text-gray-500">Get assistance and support</span>
                                </div>
                            )}
                        </a>
                    </nav>
                </aside>
                <main className="flex-1 p-6 ml-0 md:ml-20">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;