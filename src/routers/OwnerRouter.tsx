import ChangePassword from '@/pages/owner/auth/ChangePassword'
import ForgetPassword from '@/pages/owner/auth/ForgetPassword'
import OwnerLogin from '@/pages/owner/auth/OwnerLogin'
import Otp from '@/pages/owner/Registration/Otp'
import Register from '@/pages/owner/Registration/Register'
import RegisterForm from '@/pages/owner/Registration/RegisterForm'
import { Route, Routes } from 'react-router-dom'

const OwnerRouter = () => {
  return (
    <>
      <Routes>
            <Route path='/' element={<OwnerLogin/>} />
            <Route path='/forgotPassword' element={<ForgetPassword/>} />
            <Route path='/changePassword' element={<ChangePassword/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/otp' element={<Otp/>} />
            <Route path='/registerOwner' element={<RegisterForm/>} />
      </Routes>
    </>
  )
}

export default OwnerRouter
