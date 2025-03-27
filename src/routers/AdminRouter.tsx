import AdminLogin from "@/pages/admin/auth/AdminLogin"
import { Route, Routes } from "react-router-dom"
import ForgotPassword from "@/pages/admin/auth/ForgetPassword"
import ChangePassword from "@/pages/admin/auth/ChangePassword"
import Dashboard from "@/pages/admin/dashboard/Dashboard"
import WithoutAuth from "@/hocs/admin/WithoutAuth"
import WithAuth from "@/hocs/admin/WithAuth"
import Users from "@/pages/admin/userMnagement/Users"
import Owners from "@/pages/admin/ownerManagement/Owners"
import Workspaces from "@/pages/admin/workspaceManagement/Workspaces"
import ViewDetails from "@/pages/admin/workspaceManagement/ViewDetails"
import Revenue from "@/pages/admin/dashboard/Revenue"

const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WithoutAuth component={AdminLogin} />} />
        <Route path="/dashboard" element={<WithAuth component={Dashboard} />} />
        <Route path="forgotPasswordAdmin" element={< ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/userManagement" element={<WithAuth component={Users} />} />
        <Route path="/ownerManagement" element={<WithAuth component={Owners} />} />
        <Route path="/workspaceManagement" element={<WithAuth component={Workspaces} />} />
        <Route path="/workspaceDetails" element={<WithAuth component={ViewDetails} />} />
        <Route path="/revenue" element={<WithAuth component={Revenue} />} />
      </Routes>
    </>
  )
}


export default AdminRouter
