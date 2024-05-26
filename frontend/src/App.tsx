import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from '@layout/MainLayout'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import NotFound from '@pages/NotFound'
import Account from '@pages/Settings/Account'
import ManageUsers from '@pages/ManageUsers'
import ManageConsultationType from '@pages/ManageConsultationType'
import Appointments from '@pages/Appointments'
import Settings from '@pages/Settings'
import PatientRecords from '@pages/PatientRecords/PatientRecords'
import Dashboard from '@pages/Dashboard'
import CreateAppointments from '@pages/CreateAppointments'
import ManageMaternalHealthRecords from '@pages/MaternalHealthRecords/ManageMaternalHealthRecords'
import UpdateManageMaternalHealthRecords from '@pages/MaternalHealthRecords/UpdateManageMaternalHealthRecords'
import ManageRecords from '@pages/PatientRecords/ManageRecords'
import MaternalHealthRecords from '@pages/MaternalHealthRecords/MaternalHealthRecords'
import MaternalHealthRecordReport from '@pages/MaternalHealthRecords/MaternalHealthRecordReport'
import NewbornDeliveryRecords from '@pages/NewbornDeliveryRecords/NewbornDeliveryRecords'
import NewbornDeliveryRecordsUpdate from '@pages/NewbornDeliveryRecords/NewbornDeliveryRecordsUpdate'
import ManageNewbornRecord from '@pages/NewbornDeliveryRecords/ManageNewbornRecord'
import NewbornReportViewer from '@pages/NewbornDeliveryRecords/NewbornReportViewer'
import FamilyPlanningForm from '@pages/FamilyPlanning/FamilyPlanningForm'
import FamilyPlanningFormUpdate from '@pages/FamilyPlanning/FamilyPlanningFormUpdate'
import FamilyPlanningRecords from '@pages/FamilyPlanning/FamilyPlanningRecords'
import FamilyPlanningReportViewer from '@pages/FamilyPlanning/FamilyPlanningReportViewer'
import HypertensiveForm from '@pages/Hypertensive/HypertensiveForm'
import HypertensiveRecord from '@pages/Hypertensive/HypertensiveRecord'
import HypertensiveFormUpdate from '@pages/Hypertensive/HypertensiveFormUpdate'
import HypertensiveReportViewer from '@pages/Hypertensive/HypertensiveReportViewer'
import HypertensiveGroupReport from '@reports/HypertensiveGroupReport'
import VaccinationForm from '@pages/Vaccination/VaccinationForm'
import VaccinationRecord from '@pages/Vaccination/VaccinationRecord'
import VaccinationFormUpdate from '@pages/Vaccination/VaccinationFormUpdate'
import VaccinationReportViewer from '@pages/Vaccination/VaccinationReportViewer'
import ImmunizationForm from '@pages/Immunization/ImmunizationForm'
import ImmunizationRecord from '@pages/Immunization/ImmunizationRecord'
import ImmunizationFormUpdate from '@pages/Immunization/ImmunizationFormUpdate'
import ImmunizationReportViewer from '@pages/Immunization/ImmunizationReportViewer'
import PatientHistory from '@pages/PatientRecords/PatientHistory'
import UpdateAppointments from '@pages/UpdateAppointments'
import EkonsultaForm from '@pages/Ekonsulta/EkonsultaForm'
import EkonsultaRecords from './pages/Ekonsulta/EkonsultaRecords'
import EkonsultaFormUpdate from '@pages/Ekonsulta/EkonsultaFormUpdate'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route element={<Login />} path='/'></Route>
          <Route element={<Register />} path='/register'></Route>
          <Route element={<NotFound />} path='*'></Route>
          <Route element={<Account />} path='/account'></Route>

          <Route element={<Home />} path='/home'></Route>
          <Route element={<ManageUsers />} path='/manageusers'></Route>
          <Route element={<Settings />} path='/settings'></Route>
          <Route element={<PatientRecords />} path='/patientrecords'></Route>
          <Route element={<Appointments />} path='/appointments'></Route>
          <Route element={<Dashboard />} path='/dashboard'></Route>
          <Route element={<ManageConsultationType />} path='/manageconsultationtype'></Route>
          <Route element={<CreateAppointments />} path='/createappointments'></Route>
          <Route element={<UpdateAppointments />} path='/updateappointments/:appointment_id'></Route>
          <Route element={<ManageRecords />} path='/managerecords'></Route>
          <Route element={<PatientHistory />} path='/patient_history'></Route>
          {/* maternal */}
          <Route element={<ManageMaternalHealthRecords />} path='/managematernal/:appointment_id'></Route>
          <Route element={<UpdateManageMaternalHealthRecords />} path='/udpatematernal/:appointment_id'></Route>
          <Route element={<MaternalHealthRecordReport />} path='/maternal_report/:appointment_id'></Route>
          <Route element={<MaternalHealthRecords />} path='/maternal_records/:user_id'></Route>
          {/* patient records */}
          <Route element={<PatientRecords />} path='/patientRecords/:user_id'></Route>
          {/* newborn delivery record */}
          <Route element={<NewbornDeliveryRecords />} path='/newborndeliveryform/:appointment_id'></Route>
          <Route element={<NewbornDeliveryRecordsUpdate />} path='/newborndeliveryformupdate/:appointment_id'></Route>
          <Route element={<ManageNewbornRecord />} path='/newborn_record/:user_id'></Route>
          <Route element={<NewbornReportViewer />} path='/newborn_report/:appointment_id'></Route>
          {/* family planning */}
          <Route element={<FamilyPlanningForm />} path='/familyplanning_form/:appointment_id'></Route>
          <Route element={<FamilyPlanningFormUpdate />} path='/familyplanning_form_update/:appointment_id'></Route>
          <Route element={<FamilyPlanningRecords />} path='/familyPlanning_record/:user_id'></Route>
          <Route element={<FamilyPlanningReportViewer />} path='/familyplanning_report/:appointment_id'></Route>
          {/* hypertensive */}
          <Route element={<HypertensiveForm />} path='/hypertensive_form/:appointment_id'></Route>
          <Route element={<HypertensiveRecord />} path='/hypertensive_record/:user_id'></Route>
          <Route element={<HypertensiveFormUpdate />} path='/hypertensive_update/:appointment_id'></Route>
          <Route element={<HypertensiveReportViewer />} path='/hypertensive_report/:appointment_id'></Route>
          <Route element={<HypertensiveGroupReport />} path='/hypertensive_group_report'></Route>
          {/* vaccination */}
          <Route element={<VaccinationForm />} path='/vaccination_form/:appointment_id'></Route>
          <Route element={<VaccinationRecord />} path='/vaccination_record/:user_id'></Route>
          <Route element={<VaccinationFormUpdate />} path='/vaccination_update/:appointment_id'></Route>
          <Route element={<VaccinationReportViewer />} path='/vaccination_report/:appointment_id'></Route>
          {/* immunization */}
          <Route element={<ImmunizationForm />} path='/immunization_form/:appointment_id'></Route>
          <Route element={<ImmunizationRecord />} path='/immunization_record/:user_id'></Route>
          <Route element={<ImmunizationFormUpdate />} path='/immunization_update/:appointment_id'></Route>
          <Route element={<ImmunizationReportViewer />} path='/immunization_report/:appointment_id'></Route>
          {/* Ekonsulta */}
          <Route element={<EkonsultaForm />} path='/ekonsulta_form/:appointment_id'></Route>
          <Route element={<EkonsultaFormUpdate />} path='/ekonsulta_form_update/:appointment_id'></Route>
          <Route element={<EkonsultaRecords />} path='/ekonsulta_records/:user_id'></Route>
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
