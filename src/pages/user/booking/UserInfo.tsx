// import React from 'react';

// interface UserInfoProps {
//     formData: any;
//     handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }

// const UserInfo: React.FC<UserInfoProps> = ({ formData, handleInputChange }) => {
//     return (
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                 <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span>
//                 Your Information
//             </h2>
//             <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                         <input
//                             type="text"
//                             id="fullName"
//                             name="fullName"
//                             value={formData.fullName}
//                             readOnly
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                             placeholder="Enter your full name"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             readOnly
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                             placeholder="Enter your email"
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (optional)</label>
//                     <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                         placeholder="For booking updates"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserInfo;

import React, { useState } from "react";

interface userDetails {
  name: string;
  email: string;
  mobile: string;
}

interface UserInfoProps {
  userDetails: userDetails | undefined;
  onPhoneNumberChange: (phone: string) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  userDetails,
  onPhoneNumberChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
    if (value.length > 0 && value.length !== 10) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
    }
    onPhoneNumberChange(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
          1
        </span>
        Your Information
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userDetails?.name || ""}
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails?.email || ""}
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            maxLength={10}
            className={`w-full px-4 py-2.5 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition
              ${phoneError ? "border-red-500" : "border-gray-300"}
            `}
            placeholder="For booking updates"
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;