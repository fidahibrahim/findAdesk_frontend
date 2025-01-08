import { useState, useEffect, useRef } from "react"
import { ToggleButton } from "./ToggleButton"
import { useDispatch, useSelector } from "react-redux"
import { persistor, RootState } from "@/redux/store/store"
import { logout } from "@/services/api/user"
import { removeUserInfo } from "@/redux/slice/userSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"



const Header = () => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        dispatch(removeUserInfo());
        persistor.purge()
        toast.success("Logout Successful!")
        navigate('/login');
    }


    useEffect(() => {
        const handleClick = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    return (
        <div>
            <header className="bg-gray-100 border-b border-gray-200 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Left - Logo */}
                    <div>
                        <img
                            src="/user/logo.png"
                            alt="Logo"
                            className="h-8 w-auto"
                        />
                    </div>
                    {/* Middle - Navigation */}
                    <nav className="flex space-x-6 text-[#0C5A8D]">
                        <a href="/" className="hover:text-gray-900 dark:hover:text-indigo-400">
                            Home
                        </a>
                        <a href="/explore" className="hover:text-gray-900 dark:hover:text-indigo-400">
                            Explore
                        </a>
                        <div className="relative" ref={dropdownRef} >
                            <span
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="hover:text-gray-900 dark:hover:text-indigo-400 cursor-pointer"
                            >
                                {userInfo ? userInfo.name : 'Profile'}
                            </span>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1">
                                        <a
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Account
                                        </a>
                                        {userInfo ? (
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Logout
                                            </button>
                                        ) : (
                                            <a
                                                href="/login"
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Login
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    </nav>

                    {/* Right - Buttons */}
                    <div className="flex items-center space-x-8">
                        {
                            !userInfo && (<button className="px-7 py-2 text-sm rounded-lg font-medium text-[#0C5A8D] border-2 border-gray-400">
                                <a href="/login"> Login </a>
                            </button>)
                        }
                        <ToggleButton />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
