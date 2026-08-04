import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Maps from '../pages/Maps'
import Login from '../pages/Login'
import Register from '../pages/Register'


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/maps' element={<Maps />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes