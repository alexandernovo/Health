import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from '@layout/MainLayout'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import NotFound from '@pages/NotFound'
import ManageUsers from './pages/ManageUsers'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route element={<Login />} path='/' ></Route>
          <Route element={<Register />} path='/register' ></Route>
          <Route element={<NotFound />} path='*'></Route>
          <Route element={<Home />} path='/home' ></Route>
          <Route element={<ManageUsers />} path='/manageusers' ></Route>
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
