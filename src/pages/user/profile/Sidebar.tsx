import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import { useState, useEffect } from 'react';
import { User, Activity, Key, HelpCircle, Menu, X, Wallet } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Layout = ({ children }: any) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();

    useEffect(() => {
        // Set default sidebar state based on screen size
        setIsSidebarOpen(!isMobile);

        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile !== isMobile) {
                setIsSidebarOpen(!mobile);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 bg-gray-50 relative">
                {/* Mobile overlay when sidebar is open */}
                {isMobile && isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Sidebar */}
                <aside 
                    className={`
                        ${isMobile ? 'fixed left-0' : 'sticky'} 
                        top-0 h-[calc(100vh-4rem)] bg-white shadow-lg rounded-r-xl transition-all duration-300 z-50
                        ${isSidebarOpen ? 'w-72 translate-x-0' : isMobile ? 'w-0 -translate-x-full' : 'w-20'}
                    `}
                >
                    <div className="p-4 flex justify-between items-center border-b">
                        <h2 className={`font-semibold text-lg text-gray-800 ${!isSidebarOpen && 'hidden'}`}>
                            Dashboard
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className={`hover:bg-gray-100 rounded-full ${!isSidebarOpen && isMobile && 'hidden'}`}
                        >
                            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </div>

                    <nav className="p-3 space-y-2 overflow-y-auto h-[calc(100%-60px)]">
                        <NavItem 
                            href="/profile"
                            icon={<User />}
                            title="Profile"
                            description="Manage your personal information"
                            currentPath={location.pathname}
                            isExpanded={isSidebarOpen}
                        />
                        
                        <NavItem 
                            href="/profile/resetPassword"
                            icon={<Key />}
                            title="Change Password"
                            description="Update your security credentials"
                            currentPath={location.pathname}
                            isExpanded={isSidebarOpen}
                        />
                        
                        <NavItem 
                            href="/profile/activity"
                            icon={<Activity />}
                            title="Activity"
                            description="View your recent actions"
                            currentPath={location.pathname}
                            isExpanded={isSidebarOpen}
                        />
                        
                        <NavItem 
                            href="/profile/wallet"
                            icon={<Wallet />}
                            title="Wallet"
                            description="Manage your payments and balance"
                            currentPath={location.pathname}
                            isExpanded={isSidebarOpen}
                        />
                        
                        <NavItem 
                            href="/help"
                            icon={<HelpCircle />}
                            title="Help & Support"
                            description="Get assistance and support"
                            currentPath={location.pathname}
                            isExpanded={isSidebarOpen}
                        />
                    </nav>
                </aside>

                {/* Mobile sidebar toggle button */}
                {isMobile && !isSidebarOpen && (
                    <button
                        onClick={toggleSidebar}
                        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg z-50"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                )}

                {/* Main content area */}
                <main className={`flex-1 p-4 sm:p-6 ${isMobile ? 'ml-0' : isSidebarOpen ? 'ml-0' : 'ml-20'}`}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

// Helper component for nav items
const NavItem = ({ 
    href, 
    icon, 
    title, 
    description, 
    currentPath, 
    isExpanded 
}: { 
    href: string; 
    icon: React.ReactNode; 
    title: string; 
    description: string; 
    currentPath: string; 
    isExpanded: boolean; 
}) => {
    const isActive = currentPath === href;
    
    return (
        <a
            href={href}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
        >
            <div className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-500'} flex-shrink-0`}>
                {icon}
            </div>
            
            {isExpanded && (
                <div className="ml-3 text-left">
                    <span className="font-medium block">{title}</span>
                    <span className="text-xs text-gray-500">{description}</span>
                </div>
            )}
        </a>
    );
};

export default Layout;