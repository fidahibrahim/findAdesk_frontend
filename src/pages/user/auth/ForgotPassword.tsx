import { useState } from "react";

const ForgotPassword = () => {
        const [email, setEmail] = useState('');
      
        const handleSubmit = () => {
        //   e.preventDefault();
          // Add your password reset logic here
        };
  return (
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="mb-6 justify-center">
          <img 
            src="/user/logo.png" 
            alt="Logo" 
            className="h-10"
          />
        </div>
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <p className="text-center text-gray-700 mb-8 px-4">
          Please enter your email below<br />
          and we will send you a secure link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#2A2359] text-white rounded-sm hover:bg-[#1F1A45] transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        </div>
        </div>
    </div>
    </>
  )
}

export default ForgotPassword
