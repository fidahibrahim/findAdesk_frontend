import { useState, useEffect, useRef } from "react"
import { ToggleButton } from "./ToggleButton"
import { useDispatch, useSelector } from "react-redux"
import { persistor, RootState } from "@/redux/store/store"
import { logout } from "@/services/api/user"
import { removeUserInfo } from "@/redux/slice/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Header = () => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await logout()
        if (response?.status === 200) {
            dispatch(removeUserInfo());
            persistor.purge()
            navigate('/login');
            toast.success("Logout Successful!")
        }

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
            <header className="bg-white/45 border-b border-gray-200 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <Link
                            to="/">
                            <img
                                src="/user/logo.png"
                                alt="Logo"
                                className="h-8 w-auto "
                            />
                        </Link>
                    </div>

                    <nav className="flex ml-56 space-x-6 text-[#0C5A8D]">
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
                    {
                        !userInfo && (
                            <div className="ml-32 group cursor-pointer">
                                <div className="flex items-center mt-2 text-[#0C5A8D]">
                                    <span className="flex flex-col ">
                                        <span className="text-xs font-semibold">LIST</span>
                                        <span className="text-xs font-medium leading-tight">YOUR SPACE</span>
                                    </span>
                                    <div className="ml-1 bg-[#c1c0dd] mt-3  rounded-full w-4 h-4 flex items-center justify-center group-hover:bg-indigo-700" >
                                        <Link to="/owner/" >
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 10 10"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 2.5V7.5M2.5 5H7.5"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
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
