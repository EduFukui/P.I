import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Maps from '../pages/Maps'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/maps' element={<Maps />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes