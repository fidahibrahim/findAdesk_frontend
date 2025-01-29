import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/user/home/HomePage"
import Register from "@/pages/user/registration/Register"
import Login from "@/pages/user/auth/Login"
import Otp from "@/pages/user/registration/Otp"
import ChangePassword from "@/pages/user/auth/ChangePassword"
import WithoutAuth from "@/hocs/user/WithoutAuth"
import ForgotPassword from "@/components/generic/ForgotPasswordForm"
import ProfilePage from "@/pages/user/profile/Profile"
import WithAuth from "@/hocs/user/WithAuth"


const UserRouter = () => {
    return (
        <>
            < Routes>
                < Route path="/" element={<HomePage />} />
                < Route path="/register" element={<WithoutAuth component={Register}  />} />
                < Route path="/login" element={<WithoutAuth component={Login}  />} />
                < Route path="/otp" element={<WithoutAuth component={Otp}  />} />
                < Route path="/forgotPassword" element={<ForgotPassword />} />
                < Route path="/resetPassword/:token" element={<ChangePassword />} />
                <Route path="/profile" element={<WithAuth component={ProfilePage} />} />
            </Routes>
        </>
    )
}

export default UserRouter
