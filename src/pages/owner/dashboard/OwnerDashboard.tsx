import Header from '@/components/owner/Header';
import Navbar from '@/components/owner/Navbar';
import { getDashboardData } from '@/services/api/owner';
import handleError from '@/utils/errorHandler';
import { useEffect, useState } from 'react';
import RevenueCharts from './RevenueChart';

interface Booking {
    _id: string,
    bookingId: string,
    date: string,
    grandTotal: number,
    paymentMethod: string,
    status: string
}

interface Workspace {
    _id: string,
    workspaceName: string,
    workspaceMail: string,
    pricePerHour: number,
    status: string
}

interface Stats {
    workspaceCount: number;
    bookingCount: number;
    totalRevenue: number;
}
interface DashboardData {
    stats: Stats;
    recentBookings: Booking[];
    recentWorkspaces: Workspace[];
    monthlyRevenue: number[];
    yearlyRevenue: number[];
}


const OwnerDashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        stats: {
            workspaceCount: 0,
            bookingCount: 0,
            totalRevenue: 0
        },
        recentBookings: [],
        recentWorkspaces: [],
        monthlyRevenue: Array(12).fill(0),
        yearlyRevenue: Array(5).fill(0)
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await getDashboardData()
                console.log(response)
                if (response.data) {
                    setDashboardData(response.data.data);
                }
            } catch (err) {
                handleError(err)
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData()
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Header />
            {/* Main Content */}
            <div className="ml-64">
                {/* Dashboard Content */}
                <div className="p-8">
                    <h1 className="text-xl mb-0 font-semibold">Dashboard</h1>
                    <p className='text-lg mb-8 text-gray-500 ' >whole data about your business is here.</p>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-gray-500 text-sm mb-1">Total Workspace</h3>
                                    <p className="text-2xl font-semibold">{dashboardData.stats.workspaceCount}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-gray-500 text-sm mb-1">Total Bookings</h3>
                                    <p className="text-2xl font-semibold">{dashboardData.stats.bookingCount}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-gray-500 text-sm mb-1">Total Revenue</h3>
                                    <p className="text-2xl font-semibold">₹{dashboardData.stats.totalRevenue}</p>
                                </div>
                            </div>

                            {/* Charts */}
                            <RevenueCharts
                                monthlyRevenue={dashboardData.monthlyRevenue}
                                yearlyRevenue={dashboardData.yearlyRevenue}
                                loading={loading}
                            />

                            {/* Recent Bookings */}
                            <div className="bg-white rounded-lg shadow-sm mb-8">
                                <div className="p-6">
                                    <h3 className="text-gray-700 font-medium mb-4">Recent Bookings</h3>
                                    {dashboardData.recentBookings.length > 0 ? (
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-left text-gray-500 text-sm">
                                                    <th className="pb-3">Booking ID</th>
                                                    <th className="pb-3">Date</th>
                                                    <th className="pb-3">Total</th>
                                                    <th className="pb-3">Payment</th>
                                                    <th className="pb-3">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-700">
                                                {dashboardData.recentBookings.map((booking) => (
                                                    <tr key={booking._id}>
                                                        <td className="py-2">{booking.bookingId}</td>
                                                        <td>{formatDate(booking.date)}</td>
                                                        <td>₹{booking.grandTotal}</td>
                                                        <td>{booking.paymentMethod}</td>
                                                        <td>{booking.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">No recent bookings found</p>
                                    )}

                                    <div className="mt-4 text-right">
                                        <a href="/owner/bookings" className="text-blue-600 text-sm hover:underline">View all Bookings</a>
                                    </div>
                                </div>
                            </div>

                            {/* Workspace Table */}
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-6">
                                    <h3 className="text-gray-700 font-medium mb-4">Added Workspace</h3>
                                    {dashboardData.recentWorkspaces && dashboardData.recentWorkspaces.length > 0 ? (
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-left text-gray-500 text-sm">
                                                    <th className="pb-3">sl.no</th>
                                                    <th className="pb-3">Name</th>
                                                    <th className="pb-3">Email</th>
                                                    <th className="pb-3">Price/hr</th>
                                                    <th className="pb-3">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-700">
                                                {dashboardData.recentWorkspaces.map((workspace, index) => (
                                                    <tr key={workspace._id}>
                                                        <td className="py-2">{index + 1}</td>
                                                        <td>{workspace.workspaceName}</td>
                                                        <td>{workspace.workspaceMail}</td>
                                                        <td>{formatCurrency(workspace.pricePerHour)}</td>
                                                        <td>
                                                            <span className={`px-2 py-1 rounded-full text-xs ${workspace.status === 'Approved'
                                                                ? 'bg-green-100 text-green-800'
                                                                : workspace.status === 'Rejected'
                                                                    ? 'bg-red-100 text-red-800'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {workspace.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">No workspaces added yet</p>
                                    )}
                                    <div className="mt-4 text-right">
                                        <a href="/owner/workspace" className="text-blue-600 text-sm hover:underline">View all Workplaces</a>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OwnerDashboard
