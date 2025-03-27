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

const Revenue: React.FC = () => {
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [filteredRevenue, setFilteredRevenue] = useState<number>(0);
    const [filter, setFilter] = useState<string>('daily');

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await fetchAdminRevenue(filter);
                if (response?.data) {
                    setTotalRevenue(response.data.data.totalRevenue || 0);
                    setFilteredRevenue(response.data.data.filteredRevenue || 0);
                }
            } catch (error) {
                handleError(error);
                setTotalRevenue(0);
                setFilteredRevenue(0);
            }
        };

        fetchRevenue();
    }, [filter]);

    const filterRevenue = (period: string) => {
        setFilter(period);
    };

    return (
        <div>
            <Navbar />
            <Header />
            <div className="ml-80 mt-20 min-h-screen p-4">
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

                    {/* <div className="p-4">
                        <h3 className="text-sm font-bold mb-3 text-gray-700">Booking Details</h3>
                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600">
                                        <th className="p-2 text-left text-base font-medium">Workspace ID</th>
                                        <th className="p-2 text-left text-base font-medium">Date</th>
                                        <th className="p-2 text-right text-base font-medium">Total Amount</th>
                                        <th className="p-2 text-right text-base font-medium">Service Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="border-b border-gray-200 last:border-b-0">
                                            <td className="p-2 text-sm text-gray-700">#{booking.id}</td>
                                            <td className="p-2 text-sm text-gray-700">{booking.date.toLocaleDateString()}</td>
                                            <td className="p-2 text-sm text-right text-gray-700">₹{booking.totalAmount.toFixed(2)}</td>
                                            <td className="p-2 text-sm text-right text-gray-700">₹{booking.serviceFee.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Revenue;