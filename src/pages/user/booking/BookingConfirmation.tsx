// import Footer from '@/components/user/Footer';
// import Header from '@/components/user/Header';
// import { getBookingDetails } from '@/services/api/user';
// import handleError from '@/utils/errorHandler';
// import { CheckCircle } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { bookingInterface } from "@/interface/user/bookingInterface";
// import { workspaceData } from '@/interface/user/workspaceInterface';


// const BookingConfirmation = () => {
//     const [bookingData, setBookingData] = useState<bookingInterface>(null);
//     const [loading, setLoading] = useState(true);
//     const [workspace, setWorkspaceData] = useState<workspaceData>();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const workspaceData = {
//         bookingId: 'BK12132',
//         workspace: "BROTOTYPE",
//         date: '12/12/23',
//         startTime: '9.00 PM',
//         endTime: '10.00 PM',
//         seats: '2',
//         amenities: ['wifi', 'projector'],
//         customerName: 'Fathima Fida',
//         email: 'example@gmail.com',
//         phone: '2325213124',
//         specialRequests: 'add a consistent network support',
//         pricing: '123/hr',
//         paymentMethod: 'Card'
//     }
//     useEffect(() => {
//         const fetchBookingDetails = async () => {
//             try {
//                 setLoading(true)
//                 const bookingId = new URLSearchParams(location.search).get('bookingId') ||
//                     (location.state && location.state.bookingId);

//                 if (!bookingId) {
//                     navigate('/bookings', { replace: true });
//                     return;
//                 }
//                 const response = await getBookingDetails(bookingId)
//                 if (response.status) {
//                     setBookingData(response.data.booking)
//                     setWorkspaceData(response.data.workspace)
//                 }
//             } catch (error) {
//                 handleError(error)
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchBookingDetails();
//     }, [location, navigate])

//     const formatDate = (dateString: any) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     // Format time for display
//     const formatTime = (dateString: any) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         return date.toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true
//         });
//     };

//     // Calculate pricing details
//     const calculatePricing = () => {
//         if (!bookingData || !workspaceData) return null;
        
//         // Calculate duration in hours
//         const startTime = new Date(bookingData.startTime);
//         const endTime = new Date(bookingData.endTime);
//         const durationHours = (bookingData.endTime - bookingData.startTime) / (1000 * 60 * 60);
        
//         // Calculate subtotal
//         const pricePerHour = workspace.pricePerHour || 0;
//         const subtotal = pricePerHour * durationHours;
        
//         // Calculate seat cost (assuming 10 per additional seat)
//         const seats = parseInt(bookingData.seats) || 1;
//         const seatsCost = (seats - 1) * 10;
        
//         // Assume service fee is 6 or calculate based on your business logic
//         const serviceFee = 6;
        
//         // Total should match what's stored in the database
//         const total = bookingData.total;
        
//         return {
//             durationHours,
//             pricePerHour,
//             subtotal,
//             seatsCost,
//             serviceFee,
//             total
//         };
//     };

//     if (!bookingData || !workspaceData) {
//         return (
//             <div>
//                 <Header />
//                 <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
//                     <p>Booking not found</p>
//                     <button 
//                         className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md"
//                         onClick={() => navigate('/explore')}
//                     >
//                         Browse Workspaces
//                     </button>
//                 </div>
//                 <Footer />
//             </div>
//         );
//     }
//     const pricing = calculatePricing();
//     return (
//         <div>
//             <Header />
//             <div className="bg-gray-100 min-h-screen flex flex-col">
//                 <main className="flex-grow py-8 px-4">
//                     <div className="max-w-6xl mx-auto">
//                         <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-6">
//                             <div className="flex items-center mb-6">
//                                 <CheckCircle className="text-green-500 mr-3 h-8 w-8" />
//                                 <div>
//                                     <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed</h1>
//                                     <p className="text-gray-600">Your booking for {workspaceData.workspace} is confirmed with Booking ID {workspaceData.bookingId} </p>
//                                 </div>
//                             </div>

//                             <div className="border-b border-gray-200 pb-6 mb-6">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <h2 className="text-lg font-semibold text-gray-800">Booking Details</h2>
//                                     <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Confirmed</span>
//                                 </div>

//                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                                     <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//                                         <p className="text-xs text-gray-500">Date</p>
//                                         <p className="font-medium">{workspaceData.date}</p>
//                                     </div>
//                                     <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//                                         <p className="text-xs text-gray-500">Time</p>
//                                         <p className="font-medium">{workspaceData.startTime} - {workspaceData.endTime}</p>
//                                     </div>
//                                     <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//                                         <p className="text-xs text-gray-500">Seats</p>
//                                         <p className="font-medium">{workspaceData.seats} people</p>
//                                     </div>
//                                     <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//                                         <p className="text-xs text-gray-500">Booking ID</p>
//                                         <p className="font-medium">{workspaceData.bookingId}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="border-b border-gray-200 pb-6 mb-6">
//                                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Workspace Details</h2>
//                                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                                     <div className="flex flex-col md:flex-row">
//                                         <div className="md:w-3/4">
//                                             <h3 className="font-semibold text-gray-800 text-lg">{workspaceData.workspace}</h3>
//                                             <p className="text-gray-600 mb-2">Modern workspace with all amenities for your productivity needs</p>
//                                             <div className="flex flex-wrap gap-2 mt-2">
//                                                 {workspaceData.amenities && workspaceData.amenities.map((amenity, index) => (
//                                                     <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                                                         {amenity}
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="border-b border-gray-200 pb-6 mb-6">
//                                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div>
//                                         <p className="text-sm text-gray-500">Name</p>
//                                         <p className="font-medium">{workspaceData.customerName}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm text-gray-500">Email</p>
//                                         <p className="font-medium">{workspaceData.email}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm text-gray-500">Phone</p>
//                                         <p className="font-medium">{workspaceData.phone}</p>
//                                     </div>
//                                 </div>

//                                 {workspaceData.specialRequests && (
//                                     <div className="mt-4">
//                                         <p className="text-sm text-gray-500">Special Requests</p>
//                                         <p className="bg-gray-50 p-3 rounded-md border border-gray-200 mt-1">{workspaceData.specialRequests}</p>
//                                     </div>
//                                 )}
//                             </div>

//                             <div>
//                                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h2>
//                                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                                     <div className="space-y-3 mb-4">
//                                         <div className="flex justify-between text-sm">
//                                             <span className="text-gray-600">
//                                                 {workspaceData.pricing} hours × ₹{workspaceData.pricing}/hr
//                                             </span>
//                                             <span className="font-medium">₹{workspaceData.pricing}.00</span>
//                                         </div>
//                                         <div className="flex justify-between text-sm">
//                                             <span className="text-gray-600">Additional seats (×{workspaceData.pricing})</span>
//                                             <span className="font-medium">₹{workspaceData.pricing}.00</span>
//                                         </div>
//                                         <div className="flex justify-between text-sm">
//                                             <span className="text-gray-600">Service fee</span>
//                                             <span className="font-medium">₹{workspaceData.pricing}</span>
//                                         </div>
//                                         <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold">
//                                             <span>Payment Method</span>
//                                             <span className="text-lg text-indigo-700">{workspaceData.paymentMethod}</span>
//                                         </div>
//                                         <div className="border-gray-200 flex justify-between font-semibold">
//                                             <span>Total</span>
//                                             <span className="text-lg text-indigo-700">₹{workspaceData.pricing}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="mt-6 flex justify-between items-center">
//                                 <button className="bg-white text-indigo-600 border border-indigo-600 py-3 px-4 rounded-md hover:bg-indigo-50 font-medium">
//                                     Download Receipt
//                                 </button>
//                                 <button className="bg-white text-indigo-600 border border-indigo-600 py-3 px-4 rounded-md hover:bg-indigo-50 font-medium">
//                                     Done
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default BookingConfirmation;