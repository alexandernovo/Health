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
import UpdateManageMaternalHealthRecords from './pages/MaternalHealthRecords/UpdateManageMaternalHealthRecords'
import ManageRecords from '@pages/PatientRecords/ManageRecords'
import MaternalHealthRecords from './pages/MaternalHealthRecords/MaternalHealthRecords'
import MaternalHealthRecordReport from './pages/MaternalHealthRecords/MaternalHealthRecordReport'
import NewbornDeliveryRecords from './pages/NewbornDeliveryRecords/NewbornDeliveryRecords'
import NewbornDeliveryRecordsUpdate from './pages/NewbornDeliveryRecords/NewbornDeliveryRecordsUpdate'
import ManageNewbornRecord from './pages/NewbornDeliveryRecords/ManageNewbornRecord'
import NewbornReportViewer from './pages/NewbornDeliveryRecords/NewbornReportViewer'
import FamilyPlanningForm from './pages/FamilyPlanning/FamilyPlanningForm'

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
          <Route element={<UpdateManageMaternalHealthRecords />} path='/udpatematernal/:appointment_id' ></Route>
          <Route element={<MaternalHealthRecordReport />} path='/maternal_report/:appointment_id' ></Route>
          <Route element={<MaternalHealthRecords />} path='/maternal_records/:user_id' ></Route>
          {/* patient records */}
          <Route element={<PatientRecords />} path='/patientRecords/:user_id' ></Route>
          {/* newborn delivery record */}
          <Route element={<NewbornDeliveryRecords />} path='/newborndeliveryform/:appointment_id' ></Route>
          <Route element={<NewbornDeliveryRecordsUpdate />} path='/newborndeliveryformupdate/:appointment_id' ></Route>
          <Route element={<ManageNewbornRecord />} path='/newborn_record/:user_id' ></Route>
          <Route element={<NewbornReportViewer />} path='/newborn_report/:appointment_id' ></Route>
          {/* family planning */}
          <Route element={<FamilyPlanningForm />} path='/familyplanning_form/:appointment_id' ></Route>

        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
