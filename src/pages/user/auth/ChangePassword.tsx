import { useState } from 'react'

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    placeholder='Enter New Password'
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    placeholder='Confirm the Password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#2A2359] text-white rounded-sm hover:bg-[#1F1A45] transition-colors"
                            >
                                Submit
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
