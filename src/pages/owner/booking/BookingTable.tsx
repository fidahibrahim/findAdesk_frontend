import { bookingRes } from "@/interface/owner/WorkspaceRegisterValues";
import { UserTableProps } from "@/pages/admin/userMnagement/UserTable";
import { listBookings } from "@/services/api/owner";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingTable: React.FC<UserTableProps> = ({ search, page, setTotalPages }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [bookingData, setBookingData] = useState<bookingRes[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const response = await listBookings(search, page)
                if (response.status === 200) {
                    setBookingData(response.data.data.bookings)
                    setTotalPages(response.data.data.totalPages);
                }
            } catch (error) {
                handleError(error)
            } finally {
                setLoading(false);
            }
        }

        fetchBookings()
    }, [page, search, setTotalPages])

    const formatDate = (date: string | Date): string => {
        const dateObject = date instanceof Date ? date : new Date(date);
        return dateObject.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
    const handleVievClick = (bookingId: string | undefined) => {
        navigate("/owner/BookingViewDetails", { state: { bookingId: bookingId } })
    }
    return (
        <div className="bg-white rounded-lg ml-64 shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 pl-10 pr-1 text-left text-sm font-medium text-gray-600">Sl. No</th>
                            <th className="py-3 text-left  pl-16 px-3 text-sm font-medium text-gray-600">Booking ID</th>
                            <th className="py-3 text-left pl-10 text-sm font-medium text-gray-600">Date</th>
                            <th className="py-3 text-left pl-10 text-sm font-medium text-gray-600">Price</th>
                            <th className="py-3 text-left pl-10 text-sm font-medium text-gray-600">Status</th>
                            <th className="py-3 text-left px-24 pl-10 text-sm font-medium text-gray-600">Payment Method</th>
                            <th className="py-3 text-left text-sm font-medium text-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-600">
                                    Loading...
                                </td>
                            </tr>
                        ) : bookingData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-600">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            bookingData.map((booking, index) => (
                                <tr key={booking._id} className="bg-blue-50">
                                    <td className="py-3 pl-10 pr-2 text-sm">{(page - 1) * 6 + index + 1}</td>
                                    <td className="py-3 px-16 text-sm">{booking.bookingId}</td>
                                    <td className="py-3 px-12 text-sm">{formatDate(booking.date)}</td>
                                    <td className="py-3 px-11 text-sm">{booking.grandTotal}</td>
                                    <td className="py-3 px-11 text-sm">{booking.status}</td>
                                    <td className="py-3 px-11 text-sm">{booking.paymentMethod}</td>
                                    <td onClick={() => handleVievClick(booking._id)}
                                        className="py-3 px-10 text-sm text-blue-500 underline"> View </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookingTable
