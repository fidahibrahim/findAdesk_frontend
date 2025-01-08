import {  ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { adminLogout } from "@/services/api/admin"
import { useDispatch, useSelector } from 'react-redux';
import { AdminLogout } from '@/redux/slice/adminSlice';
import { persistor, RootState } from '@/redux/store/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const adminInfo = useSelector((state: RootState) => state.admin.adminInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async ()=>{
        await adminLogout()
        dispatch(AdminLogout())
        persistor.purge()
        toast.success("Logout Successful!")
        navigate('/admin/');
    }

  return (
    <>
      <header className="bg-white shadow-md">
          <div className="flex justify-between items-center py-8">
            <div className="relative ml-auto mr-8  ">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span >Welcome , 
                  {
                    adminInfo ? adminInfo.name  : <span> Admin</span>
                  }
                  
                </span>
                <ChevronDown size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
    </>
  )
}

export default Header
