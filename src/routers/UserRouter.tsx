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
import AboutUs from "@/pages/user/static/AboutUs"
import ContactUs from "@/pages/user/static/ContactUs"
import TermsAndConditions from "@/pages/user/static/TermsAndConditions"
import Explore from "@/pages/user/explore/Explore"
import Filtered from "@/pages/user/explore/Filtered"
import WorkspaceDetails from "@/pages/user/explore/WorkspaceDetails"
import EditProfile from "@/pages/user/profile/EditProfile"
import ResetPassword from "@/pages/user/profile/ResetPassword"
import Checkout from "@/pages/user/booking/Checkout"
import Activity from "@/pages/user/profile/Activity"
import BookingConfirmation from "@/pages/user/booking/BookingConfirmation"
import BookingDetails from "@/pages/user/booking/BookingDetails"
import Wallet from "@/pages/user/profile/Wallet"
import SavedWorkspaceDetails from "@/pages/user/explore/SavedWorkspaceDetails"
import Help from "@/pages/user/profile/Help"
import Transactions from "@/pages/user/profile/Transactions"


const UserRouter = () => {
    return (
        <>
            < Routes>
                < Route path="/" element={<HomePage />} />
                < Route path="/register" element={<WithoutAuth component={Register} />} />
                < Route path="/login" element={<WithoutAuth component={Login} />} />
                < Route path="/otp" element={<WithoutAuth component={Otp} />} />
                < Route path="/forgotPassword" element={<ForgotPassword />} />
                < Route path="/resetPassword/:token" element={<ChangePassword />} />
                < Route path="/profile" element={<WithAuth component={ProfilePage} />} />
                < Route path="/help" element={<WithAuth component={Help} />} />
                < Route path="/editProfile" element={<WithAuth component={EditProfile} />} />
                < Route path="/profile/resetPassword" element={<WithAuth component={ResetPassword} />} />
                < Route path="/profile/activity" element={<WithAuth component={Activity} />} />
                < Route path="/profile/wallet" element={<WithAuth component={Wallet} />} />
                < Route path="/aboutUs" element={<AboutUs />} />
                < Route path="/contactUs" element={<ContactUs />} />
                < Route path="/termsAndConditions" element={<TermsAndConditions />} />
                < Route path="/explore" element={<Explore />} />
                < Route path="/searchWorkspace" element={<WithAuth component={Filtered} />} />
                < Route path="/workspaceDetails" element={<WithAuth component={WorkspaceDetails} />} />
                < Route path="/workspaceDetails/:workspaceId" element={<WithAuth component={SavedWorkspaceDetails} />} />
                < Route path="/checkout/:bookingId" element={<WithAuth component={Checkout} />} />
                < Route path="/bookingConfirmation/:bookingId" element={<WithAuth component={BookingConfirmation} />} />
                < Route path="/bookingDetails/:bookingId" element={<WithAuth component={BookingDetails} />} />
                < Route path="/transactionHistory" element={<WithAuth component={Transactions} />} />
            </Routes>
        </>
    )
}

export default UserRouter
