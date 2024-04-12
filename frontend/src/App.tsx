import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from '@layout/MainLayout'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import NotFound from '@pages/NotFound'
import ManageUsers from '@pages/ManageUsers'
import ManageConsultationType from '@pages/ManageConsultationType'
import Appointments from '@pages/Appointments'
import Settings from '@pages/Settings'
import PatientRecords from '@pages/PatientRecords/PatientRecords'
import Dashboard from '@pages/Dashboard'
import CreateAppointments from '@pages/CreateAppointments'
import ManageMaternalHealthRecords from '@pages/MaternalHealthRecords/ManageMaternalHealthRecords'
import ManageRecords from '@pages/PatientRecords/ManageRecords'
import MaternalHealthRecords from './pages/MaternalHealthRecords/MaternalHealthRecords'

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
          <Route element={<Settings />} path='/settings' ></Route>
          <Route element={<PatientRecords />} path='/patientrecords' ></Route>
          <Route element={<Appointments />} path='/appointments' ></Route>
          <Route element={<Dashboard />} path='/dashboard' ></Route>
          <Route element={<ManageConsultationType />} path='/manageconsultationtype' ></Route>
          <Route element={<CreateAppointments />} path='/createappointments' ></Route>
          <Route element={<ManageRecords />} path='/managerecords' ></Route>
          {/* maternal */}
          <Route element={<ManageMaternalHealthRecords />} path='/managematernal/:appointment_id' ></Route>
          <Route element={<MaternalHealthRecords />} path='/maternal_records/:user_id/:consultationTypeId' ></Route>
          {/* patient records */}
          <Route element={<PatientRecords />} path='/patientRecords/:user_id' ></Route>
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
