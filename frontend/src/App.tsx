import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from '@layout/MainLayout'
import Home from '@pages/Home'
import Login from '@pages/Login'
import NotFound from '@pages/NotFound'

function App() {
  return (
    <MainLayout>
      <Router>
        <Routes>
          <Route element={<Home />} path='/home' ></Route>
          <Route element={<Login />} path='/' ></Route>
          <Route element={<NotFound />} path='*'></Route>
        </Routes>
      </Router>
    </MainLayout>
  )
}

export default App
