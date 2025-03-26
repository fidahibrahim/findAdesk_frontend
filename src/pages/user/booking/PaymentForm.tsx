// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useState } from 'react';

// const PaymentForm = ({ formData, total, handleSubmit }: any) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [paymentError, setPaymentError] = useState<string | null>(null);
//     const [paymentProcessing, setPaymentProcessing] = useState(false);

//     const handlePayment = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setPaymentProcessing(true);
//         const cardElement = elements.getElement(CardElement);

//         try {
//             // Create payment intent on your server
//             const response = await fetch('/api/create-payment-intent', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     amount: total * 100, // Convert to cents
//                     currency: 'inr', // Adjust currency as needed
//                 }),
//             });

//             const { clientSecret } = await response.json();

//             // Confirm card payment
//             const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardElement!,
//                     billing_details: {
//                         name: formData.cardName,
//                         email: formData.email,
//                     },
//                 },
//             });

//             if (paymentResult.error) {
//                 setPaymentError(paymentResult.error.message || 'Payment failed');
//                 setPaymentProcessing(false);
//             } else if (paymentResult.paymentIntent?.status === 'succeeded') {
//                 // Payment successful, proceed with booking
//                 handleSubmit(e);
//             }
//         } catch (error) {
//             setPaymentError('An error occurred during payment');
//             setPaymentProcessing(false);
//         }
//     };

//     return (
//         <form onSubmit={handlePayment}>
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
//                 <CardElement
//                     options={{
//                         style: {
//                             base: {
//                                 fontSize: '16px',
//                                 color: '#424770',
//                                 '::placeholder': {
//                                     color: '#aab7c4',
//                                 },
//                             },
//                             invalid: {
//                                 color: '#9e2146',
//                             },
//                         },
//                     }}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-md"
//                 />
//             </div>
//             {paymentError && <p className="text-red-600 text-sm mb-4">{paymentError}</p>}
//             <button
//                 type="submit"
//                 disabled={!stripe || paymentProcessing}
//                 className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-200 font-medium ${paymentProcessing ? 'opacity-70 cursor-not-allowed' : ''
//                     }`}
//             >
//                 {paymentProcessing ? 'Processing...' : 'Pay Now'}
//             </button>
//         </form>
//     );
// };

// export default PaymentForm