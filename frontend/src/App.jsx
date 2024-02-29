import React, {useState, useEffect} from 'react';
import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Components
import Navbar from './Navbar';
import UserFooter from './UserFooter'
import LandingPage from './Pages/Common/LandingPage';
import Blog from './components/Blog';
import Register from './Pages/Common/Register';
import Login from './Pages/Common/Login';
import EvacuationGuideines from './Pages/Common/EvacuationGuidelines';

//User
import Profile from './Pages/User/Profile';

//Admin
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminProfile from './Pages/Admin/AdminProfile';

//Guidelines
import CreateGuidelines from './Pages/Admin/guidelines/CreateGuidelines';
import UpdateGuidelines from './Pages/Admin/guidelines/UpdateGuidelines';
import Guidelinesteps from './Pages/Admin/guidelines/GuidelineSteps';

//Steps
import CreateSteps from './Pages/Admin/guidelines/CreateSteps';
import UpdateSteps from './Pages/Admin/guidelines/UpdateSteps';

//Contacts
import CreateContacts from './Pages/Admin/contacts/CreateContacts';
import UpdateContacts from './Pages/Admin/contacts/UpdateCategoryContacts';

//Report
import EmergencyReport from './Pages/Admin/EmergencyReport';

//Categories
import CreateCategoryGuidelines from './Pages/Admin/guidelines/CreateCategoryGuidelines';
import UpdateCategoryGuidelines from './Pages/Admin/guidelines/UpdateCategoryGuidelines';

import CreateCategoryContacts from './Pages/Admin/contacts/UpdateCategoryContacts';
import UpdateCategoryContacts from './Pages/Admin/contacts/UpdateCategoryContacts';

import CreateDepartment from './Pages/Admin/department/CreateDepartment';
import UpdateDepartment from './Pages/Admin/department/UpdateDepartment';


import ToastNotification from './components/ToastNotification';
import GuidelineTable from './Pages/Admin/guidelines/GuidelineTable';

const socket = io("http://localhost:4000");

const AdminRouterWrapper = ({ element }) => {
  const userRole = useSelector((state) => state.user.currentUser?.role);

  useEffect(() => {
    if (userRole !== "Admin") {
      window.location.href = "/";
    }
  }, [userRole]);

  return <>{ element }</>;
};

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [newReport, setNewReport] = useState(null);

  useEffect(() =>{
    socket.on("newEmergencyReport", (newReport) => {
      setNewReport(newReport);
    });
    
    return () => {
      socket.off("newEmergencyReport");
    }
  })

  useEffect(() => {
    setIsAdmin(window.location.pathname.startsWith("/admin"));
  }, []);

  return (
    <Router>
    {!isAdmin && <Navbar/>}
      <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/blog' element={<Blog/>} />
      <Route path='/evacuation/guidelines' element={<EvacuationGuideines/>} />
      <Route path='/user/profile' element={<Profile/>} />

      <Route path='/admin/*' element = {
        <AdminRouterWrapper
        element={<Routes>
      <Route path='dashboard' element={<AdminDashboard/>} />
      <Route path='report' element={<EmergencyReport/>} />
      <Route path='create/steps' element={<CreateSteps/>} />
      <Route path='create/contacts' element={<CreateContacts/>} />
      <Route path='create/guidelines' element={<CreateGuidelines/>} />
      <Route path='create/category/contacts' element={<CreateCategoryContacts/>} />
      <Route path='create/category/guidelines' element={<CreateCategoryGuidelines/>} />
      <Route path='update/steps/:stepId' element={<UpdateSteps/>} />
      <Route path='update/departments/:departmentId' element={<UpdateDepartment/>} />
      <Route path='update/contacts/:contactId' element={<UpdateContacts/>} />
      <Route path='update/guidelines/:guidelineId' element={<UpdateGuidelines/>} />
      <Route path='update/category/contacts/:categoryId' element={<UpdateCategoryContacts/>} />
      <Route path='update/category/guidelines/:categoryId' element={<UpdateCategoryGuidelines/>} />
      <Route path='guideline/table' element={<GuidelineTable/>} />
      <Route path='guidelines/:guidelineId' element={<Guidelinesteps/>} />
      <Route path='profile' element={<AdminProfile/>} />
      </Routes>
      }
      />
      }
      />
      </Routes>
      {!isAdmin && <UserFooter/>}
    </Router>
  )
}

export default App