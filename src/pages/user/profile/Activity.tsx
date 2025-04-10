import { useEffect, useState } from 'react';
import Layout from './Sidebar';
import BookingCard from './BookingCard';
import { BookingDetailsInt } from '@/interface/owner/BookingInterfaces';
import handleError from '@/utils/errorHandler';
import { fetchBookingHistory } from '@/services/api/user';

const Activity = () => {
    const [bookings, setBookings] = useState<BookingDetailsInt[] | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetchBookingHistory(filter);
                if (response && response.data && response.data.data) {
                    setBookings(response.data.data);
                } else {
                    setBookings([]);
                }
            } catch (error) {
                handleError(error);
                setError('Failed to fetch bookings');
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [filter]);
    const getPageTitle = () => {
        if (filter === 'saved') {
            return 'Saved Workspaces';
        }
        return 'Booking History';
    };
    if (loading) {
        return (
            <Layout>
                <div className="text-center py-12">Loading bookings...</div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout>
                <div className="text-center py-12 text-red-500">{error}</div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h2>
                    <select
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Bookings</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="saved">Saved</option>
                    </select>
                </div>

                {bookings?.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No bookings found for the selected filter.
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings?.map((booking) => (
                            <BookingCard
                                key={booking._id}
                                booking={booking}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Activity;