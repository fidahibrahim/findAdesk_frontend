import React, { useState, useEffect } from 'react';
import {
    ChevronDownIcon,
    DollarSignIcon,
    CalendarIcon
} from 'lucide-react';
import Navbar from '@/components/admin/Navbar';
import Header from '@/components/admin/Header';
import handleError from '@/utils/errorHandler';
import { fetchAdminRevenue } from '@/services/api/admin';
import { BookingInt } from '@/interface/admin/BookingInterface';
import Pagination from '@/components/generic/Pagination';

const Revenue: React.FC = () => {
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [filteredRevenue, setFilteredRevenue] = useState<number>(0);
    const [filter, setFilter] = useState<string>('daily');
    const [bookings, setBookings] = useState<BookingInt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [limit] = useState<number>(6);

    useEffect(() => {
        const fetchRevenue = async () => {
            setLoading(true);
            try {
                const response = await fetchAdminRevenue(filter, page, limit);
                console.log(response)
                if (response?.data) {
                    setTotalRevenue(response.data.data.totalRevenue || 0);
                    setFilteredRevenue(response.data.data.filteredRevenue || 0);
                    setBookings(response.data.data.bookings || []);
                    if (response.data.data.pagination) {
                        setTotalPages(response.data.data.pagination.totalPages || 1);
                    }
                }
            } catch (error) {
                handleError(error);
                setTotalRevenue(0);
                setFilteredRevenue(0);
                setBookings([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchRevenue();
    }, [filter, page, limit]);

    const filterRevenue = (period: string) => {
        setPage(1);
        setFilter(period);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    return (
        <div>
            <Navbar />
            <Header />
            <div className="ml-80 mt-16 mb-6 min-h-screen p-4">
                <div className="max-w-6xl bg-gray-100 shadow-sm rounded-lg">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Revenue Details</h2>
                        <div className="relative">
                            <select
                                value={filter}
                                onChange={(e) => filterRevenue(e.target.value)}
                                className="appearance-none bg-gray-100 border border-gray-200 rounded-md py-1 px-3 pr-8 text-sm focus:outline-none"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <ChevronDownIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <div className=" grid grid-cols-2 gap-4 p-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Total Revenue</span>
                                <DollarSignIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex items-center">
                                <h3 className="text-2xl font-bold text-green-800 mr-2">₹{totalRevenue.toFixed(2)}</h3>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)} Revenue
                                </span>
                                <CalendarIcon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex items-center">
                                <h3 className="text-2xl font-bold text-blue-800 mr-2">₹{filteredRevenue.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="text-sm font-bold mb-3 text-gray-700">Booking Details</h3>
                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                            {loading ? (
                                <div className="p-4 text-center text-gray-500">Loading booking data...</div>
                            ) : bookings.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">No bookings found for this period</div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600">
                                            <th className="p-2 text-left text-base font-medium">Workspace</th>
                                            <th className="p-2 text-left text-base font-medium">Mail ID</th>
                                            <th className="p-2 text-left text-base font-medium">Date</th>
                                            <th className="p-2 text-right text-base font-medium">Total Amount</th>
                                            <th className="p-2 text-right text-base font-medium">Service Fee</th>
                                            <th className="p-2 text-center text-base font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking, index) => (
                                            <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                                <td className="p-2 text-sm text-gray-700">{booking.workspaceId?.workspaceName}</td>
                                                <td className="p-2 text-sm text-gray-700">{booking.workspaceId?.workspaceMail}</td>
                                                <td className="p-2 text-sm text-gray-700">{formatDate(booking.date)}</td>
                                                <td className="p-2 text-sm text-right text-gray-700">₹{booking.grandTotal.toFixed(2)}</td>
                                                <td className="p-2 text-sm text-right text-gray-700">₹{booking.serviceFee.toFixed(2)}</td>
                                                <td className="p-2 text-sm text-center">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    {/* Pagination */}
                    {bookings.length > 0 && !loading && (
                        <div className="-ml-80 mt-0 mb-0 px-0 pb-0">
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}
                        />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Revenue;