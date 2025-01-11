import { resendOtp, verifyOtp } from "@/services/api/owner";

import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Otp = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [isVerifying, setIsVerifying] = useState(false);
    console.log(isVerifying);
    const navigate = useNavigate()
    const location = useLocation()
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
        console.log(email, "email in state")
        setIsVerifying(true);
        try {
            console.log(email, otp, "eeee and oooooooooo")
            const response = await verifyOtp(email, otp)
            if (response?.status === 200) {
                toast.success("OTP verified successfully")
                navigate("/owner/")
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
            console.log(response, "response in handleresend");
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
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="grid w-full max-w-[800px] grid-cols-2">
                    <div className="relative h-[500px]">
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-20">
                            <img
                                src="/user/logo.png"
                                alt="Logo"
                                className="h-14 w-auto"
                            />
                        </div>

                        <div className="h-full">
                            <img
                                src="/user/banner-1.jpg"
                                alt="Interior"
                                className="h-full w-full object-cover grayscale"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col h-[500px] bg-gray-50 items-center px-12 py-8">
                        <div className="mb-2 self-start">
                            <img
                                src="/user/logo.png"
                                alt="Logo"
                                className="h-6 w-auto"
                            />
                        </div>

                        <div className="mb-8 text-center w-full">
                            <h1 className="mb-2 text-2xl font-normal text-gray-900">Sign Up</h1>
                            <p className="text-sm text-gray-600">
                                Register your spaceinto<br />findAdesk for listing with top workspace providers.
                            </p>
                        </div>
                        <div className="mb-5 mt-4 text-center w-full">
                            <p className="text-sm text-gray-600">
                                Otp send to your email address <br /> <span className='text-blue-800' >example@gmail.com</span>
                            </p>

                        </div>

                        <form className="flex flex-col space-y-5 w-full" onSubmit={(e) => { e.preventDefault(); }}>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => handleChange(e.target.value)}
                                    placeholder="Enter 4 digit otp"
                                    className="rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
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

                            <button
                                type="submit"
                                onClick={handleVerify}
                                className="mt-2 rounded bg-[#1a1464] py-2.5 text-lg font-normal text-white hover:bg-[#13104d]"
                            >
                                Verify Otp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Otp
