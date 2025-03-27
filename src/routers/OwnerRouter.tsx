import WithAuth from '@/hocs/owner/WithAuth'
import WithoutAuth from '@/hocs/owner/WithoutAuth'
import ChangePassword from '@/pages/owner/auth/ChangePassword'
import ForgotPassword from "@/components/generic/ForgotPasswordForm"
import OwnerLogin from '@/pages/owner/auth/OwnerLogin'
import OwnerDashboard from '@/pages/owner/dashboard/OwnerDashboard'
import Otp from '@/pages/owner/Registration/Otp'
import Register from '@/pages/owner/Registration/Register'
import EditWorkspace from '@/pages/owner/workspaceManage/EditWorkspace'
import Registration from '@/pages/owner/workspaceManage/Registration'
import ViewDetails from '@/pages/owner/workspaceManage/ViewDetails'
import Workspace from '@/pages/owner/workspaceManage/Workspace'
import { Route, Routes } from 'react-router-dom'
import Booking from '@/pages/owner/booking/Booking'
import BookingViewDetails from '@/pages/owner/booking/BookingViewDetails'

const OwnerRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<WithoutAuth component={OwnerLogin} />} />
        <Route path='/register' element={<WithoutAuth component={Register}  />} />
        <Route path='/otp' element={<WithoutAuth component={Otp}  />} />
        <Route path='/dashboard' element={<WithAuth component={OwnerDashboard} />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/workspace' element={<WithAuth component={Workspace} />} />
        <Route path='/workspaceRegister' element={<WithAuth component={Registration} />} />
        <Route path='/viewDetails' element={<WithAuth component={ViewDetails} />} />
        <Route path='/editWorkspace' element={<WithAuth component={EditWorkspace} />} />
        <Route path='/bookings' element={<WithAuth component={Booking} />} />
        <Route path='/bookingViewDetails' element={<WithAuth component={BookingViewDetails} />} />
      </Routes>
    </>
  )
}

export default OwnerRouter
