import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/user/home/HomePage"
import Register from "@/pages/user/registration/Register"
import Login from "@/pages/user/auth/Login"
import Otp from "@/pages/user/registration/Otp"
import ForgotPassword from "@/pages/user/auth/ForgotPassword"
import ChangePassword from "@/pages/user/auth/ChangePassword"
import WithoutAuth from "@/hocs/user/WithoutAuth"


const UserRouter = () => {
    return (
        <>
            < Routes>
                < Route path="/" element={<HomePage />} />
                < Route path="/register" element={<WithoutAuth component={Register}  />} />
                < Route path="/login" element={<WithoutAuth component={Login}  />} />
                < Route path="/otp" element={<WithoutAuth component={Otp}  />} />
                < Route path="/forgotPassword" element={<ForgotPassword />} />
                < Route path="/changePassword/:token" element={<ChangePassword />} />
            </Routes>
        </>
    )
}

export default UserRouter
