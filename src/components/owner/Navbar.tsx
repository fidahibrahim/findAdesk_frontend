import { Home, Settings, FileText, Star, AlertCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="p-4">
                    <a href="/owner/dashboard" className="flex mt-12 px-3 items-center space-x-9">
                        <img src="/user/logo.png" alt="FINDADESK" className="h-12" />
                    </a>
                </div>

                <nav className="mt-8">
                    <div className="px-4 space-y-2">
                        <a
                            href="/owner/dashboard"
                            className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/dashboard"
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Home size={20} />
                            <span>Dashboard</span>
                        </a>
                        <a
                            href="/workspace"
                            className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/workspace"
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <FileText size={20} />
                            <span>Workspace</span>
                        </a>
                        <a
                            href="/bookings"
                            className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/bookings"
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <FileText size={20} />
                            <span>Bookings</span>
                        </a>
                        <a
                            href="/reviews"
                            className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/reviews"
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Star size={20} />
                            <span>Reviews</span>
                        </a>
                        <a
                            href="/disputes"
                            className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/disputes"
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <AlertCircle size={20} />
                            <span>Disputes</span>
                        </a>
                        <a
                            href="/settings"
                            className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/settings"
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Settings size={20} />
                            <span>Settings</span>
                        </a>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;