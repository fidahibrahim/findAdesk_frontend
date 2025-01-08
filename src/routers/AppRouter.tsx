import { Route, Routes } from 'react-router-dom'
import UserRouter from './UserRouter'
import AdminRouter from './AdminRouter'
import OwnerRouter from './OwnerRouter'

const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path='/*' element={<UserRouter/>} />
        <Route path='/admin/*' element={<AdminRouter/>} />
        <Route path='/owner/*' element={<OwnerRouter/>} />
    </Routes>
      
    </>
  )
}

export default AppRouter
