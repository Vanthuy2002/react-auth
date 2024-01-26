import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import HomePage from '../pages/Home'
import Admin from '../pages/Admin'
import Posts from '../pages/Setting'
import { PresistData } from '../components/PresistData'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login></Login>} />
      <Route path='/register' element={<Register></Register>} />
      <Route element={<PresistData />}>
        <Route path='/' element={<HomePage></HomePage>} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/posts' element={<Posts />} />
      </Route>
    </Routes>
  )
}
