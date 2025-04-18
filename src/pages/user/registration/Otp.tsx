import { useEffect, useState, } from 'react';
import Footer from '@/components/user/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { resendOtp, verifyOtp } from '@/services/api/user';
import handleError from '@/utils/errorHandler';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const location = useLocation();
  const navigate = useNavigate()

  const email = location.state?.email;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [email]);


  const handleChange = (value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  }

  const handleVerify = async () => {
    if (otp.length !== 4) {
      toast.error("Please enter a 4-digit valid OTP")
      return
    }

    setIsVerifying(true);
    try {
      const response = await verifyOtp(email, otp)
      if (response?.status === 200) {
        toast.success("OTP verified successfully")
        navigate("/login")
      } else {
        toast.error("Invalid something went wrong");
      }
    } catch (error) {
      handleError(error)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    try {
      const response = await resendOtp(email)
      if (response?.status === 200) {
        toast.success("OTP resend successfully")
        setTimer(60)
      } else if (response?.status === 401) {
        toast.error("Invalid Otp Please try again")
      } else {
        toast.error("Please try again")
      }
    } catch (error) {
      handleError(error)
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Logo Section */}
          <div className="mb-6">
            <img
              src="/user/logo.png"
              alt="Logo"
              className="h-10"
            />
          </div>

          {/* Verification Card */}
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Verify your Account
            </h2>
            <p className="text-gray-600 mb-6">
              Enter the 4 digit OTP we send to your email
            </p>

            {/* OTP Input */}
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter OTP"
              />
            </div>

            {/* Resend Link */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleResend}
                disabled={timer > 0}
                className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
              >
                Resend OTP {timer > 0 && `(${timer}s)`}
              </button>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isVerifying || otp.length !== 4}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex justify-center items-center"
            >
              {isVerifying ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Otp;