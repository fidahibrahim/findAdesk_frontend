import React from 'react';

interface BookingSummaryProps {
    workspace: any;
    bookingDetails: any;
    isSubmitting: boolean;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Summary: React.FC<BookingSummaryProps> = ({
    workspace,
    bookingDetails,
    isSubmitting,
    handleSubmit
}) => {
    const duration = parseInt(bookingDetails?.endTime || '0') - parseInt(bookingDetails?.startTime || '0');
    const subtotal = workspace.pricePerHour * duration;
    const seatsCost = ((bookingDetails?.seats || 1) - 1) * 10;
    const serviceFee = 6;
    const total = subtotal + seatsCost + serviceFee;
    return (
        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Booking Summary</h2>

                <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                            {parseInt(bookingDetails?.endTime || '0') - parseInt(bookingDetails?.startTime || '0')} hours × ₹{workspace.pricePerHour}/hr
                        </span>
                        <span className="font-medium">₹{subtotal}.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Additional seats (×{(bookingDetails?.seats || 1) - 1})</span>
                        <span className="font-medium">₹{seatsCost}.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service fee</span>
                        <span className="font-medium">₹{serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-lg text-indigo-700">₹{total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-200 font-medium flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <span>Complete Booking</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </>
                    )}
                </button>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Free cancellation up to 24 hours before</span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    By completing this booking, you agree to our{' '}
                    <a href="/termsAndConditions" className="text-indigo-600 hover:underline">Terms of Service</a> and{' '}
                    <a href="/termsAndConditions" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default Summary;