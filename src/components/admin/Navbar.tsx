import { Home, Users, Briefcase, User, DollarSign } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-4">
          <a href="/admin/dashboard" className="flex mt-12 px-3 items-center space-x-9">
            <img src="/user/logo.png" alt="FINDADESK" className="h-12" />
          </a>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <a
              href="/admin/dashboard"
              className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/admin/dashboard"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </a>
            <a
              href="/admin/userManagement"
              className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/admin/userManagement"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <User size={20} />
              <span>User Management</span>
            </a>
            <a
              href="/admin/ownerManagement"
              className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/admin/ownerManagement"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Users size={20} />
              <span>Owner Management</span>
            </a>
            <a
              href="/admin/workspace"
              className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/admin/workspace"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Briefcase size={20} />
              <span>Work Space</span>
            </a>
            <a
              href="/admin/revenue"
              className={`flex items-center space-x-2 p-2 rounded-lg ${location.pathname === "/admin/revenue"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <DollarSign size={20} />
              <span>Revenue</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
