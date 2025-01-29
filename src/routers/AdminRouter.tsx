import AdminLogin from "@/pages/admin/auth/AdminLogin"
import { Route, Routes } from "react-router-dom"
import ForgetPassword from "@/pages/admin/auth/ForgetPassword"
import ChangePassword from "@/pages/admin/auth/ChangePassword"
import Dashboard from "@/pages/admin/dashboard/Dashboard"
import WithoutAuth from "@/hocs/admin/WithoutAuth"
import WithAuth from "@/hocs/admin/WithAuth"
import Users from "@/pages/admin/userMnagement/Users"
import Owners from "@/pages/admin/ownerManagement/Owners"
import Workspaces from "@/pages/admin/workspaceManagement/Workspaces"

const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WithoutAuth component={AdminLogin} />} />
        <Route path="/dashboard" element={<WithAuth component={Dashboard} />} />
        <Route path="/forgotPassword" element={< ForgetPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/userManagement" element={<WithAuth component={Users}  />} />
        <Route path="/ownerManagement" element={<WithAuth component={Owners}  />} />
        <Route path="/workspaceManagement" element={<WithAuth component={Workspaces} />} />
      </Routes>
    </>
  )
}


export default AdminRouter
