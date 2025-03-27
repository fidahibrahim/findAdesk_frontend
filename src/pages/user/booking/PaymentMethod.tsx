// import React from 'react';

// interface PaymentMethodProps {
//   formData: any;
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }

// const PaymentMethod: React.FC<PaymentMethodProps> = ({ formData, handleInputChange }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//       <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//         <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">3</span>
//         Payment Method
//       </h2>

//       <div className="flex gap-4 mb-4">
//         <div className="flex items-center">
//           <input
//             id="card"
//             name="paymentMethod"
//             type="radio"
//             value="card"
//             checked={formData.paymentMethod === 'card'}
//             onChange={handleInputChange}
//             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//           />
//           <label htmlFor="card" className="ml-2 block text-sm font-medium text-gray-700">
//             Credit Card
//           </label>
//         </div>
//         <div className="flex items-center">
//           <input
//             id="paypal"
//             name="paymentMethod"
//             type="radio"
//             value="paypal"
//             checked={formData.paymentMethod === 'paypal'}
//             onChange={handleInputChange}
//             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//           />
//           <label htmlFor="paypal" className="ml-2 block text-sm font-medium text-gray-700">
//             Pay With Wallet
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethod;

import { useState } from "react";

interface PaymentMethodProps {
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  onPaymentMethodChange,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSelectedMethod(value);
    onPaymentMethodChange(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
          3
        </span>
        Payment Method
      </h2>

      <div className="flex gap-4 mb-4">
        <div className="flex items-center">
          <input
            id="paymentGateway"
            name="paymentMethod"
            type="radio"
            value="paymentGateway"
            checked={selectedMethod === "paymentGateway"}
            onChange={handlePaymentMethodChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <label
            htmlFor="paymentGateway"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Online Payment
          </label>
        </div>
        {/* <div className="flex items-center">
          <input
            id="wallet"
            name="paymentMethod"
            type="radio"
            value="wallet"
            checked={selectedMethod === "wallet"}
            onChange={handlePaymentMethodChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <label
            htmlFor="wallet"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Pay With Wallet
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentMethod;