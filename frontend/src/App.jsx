import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';

// Components
import Navbar from './Navbar';
import AdminNavbar from './Pages/Admin/AdminNavbar';
import EarthquakeGuidelines from './Pages/Common/EarthquakeGuidelines';
import UserFooter from './UserFooter';
import LandingPage from './Pages/Common/LandingPage';
import GuidelineCollections from './Pages/Common/GuidelineCollections';
import ContactsCollections from './Pages/Common/ContactsCollections';
import BlogPage from './Pages/Common/BlogPage';
import Register from './Pages/Common/Register';
import ConfirmationPage from './Pages/Common/ConfirmationPage';
import Login from './Pages/Common/Login';
import EvacuationGuidelines from './Pages/Common/EvacuationGuidelines';
import Profile from './Pages/User/Profile';
import UserDashboard from './Pages/User/UserDashboard';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminProfile from './Pages/Admin/AdminProfile';
import CreateGuidelines from './Pages/Admin/guidelines/CreateGuidelines';
import UpdateGuidelines from './Pages/Admin/guidelines/UpdateGuidelines';
import Guidelinesteps from './Pages/Admin/guidelines/GuidelineSteps';
import CreateSteps from './Pages/Admin/guidelines/CreateSteps';
import UpdateSteps from './Pages/Admin/guidelines/UpdateSteps';
import CreateContacts from './Pages/Admin/contacts/CreateContacts';
import UpdateContacts from './Pages/Admin/contacts/UpdateContacts';
import CreateCategoryGuidelines from './Pages/Admin/guidelines/CreateCategoryGuidelines';
import UpdateCategoryGuidelines from './Pages/Admin/guidelines/UpdateCategoryGuidelines';
import CreateCategoryContacts from './Pages/Admin/contacts/CreateCategoryContacts';
import UpdateCategoryContacts from './Pages/Admin/contacts/UpdateCategoryContacts';
import CreateDepartment from './Pages/Admin/department/CreateDepartment';
import UpdateDepartment from './Pages/Admin/department/UpdateDepartment';
import EmergencyReport from './Pages/Admin/EmergencyReport';
import ToastNotification from './Pages/Admin/ToastNotification';
import GuidelineTable from './Pages/Admin/guidelines/GuidelineTable';
import GuidelinesbyCategory from './Pages/Common/GuidelinesbyCategory';
import ContactsbyCategory from './Pages/Common/ContactsbyCategory';
import EmailConfirmation from './Pages/Common/EmailConfirmation';
import ContactsTable from './Pages/Admin/contacts/ContactsTable';
import DepartmentTable from './Pages/Admin/department/DepartmentTable';
import CategoryContactsTable from './Pages/Admin/contacts/CategoryContactsTable';
import CategoryGuidelinesTable from './Pages/Admin/guidelines/CategoryGuidelinesTable';
import ForgotPassword from './Pages/Common/ForgotPassword';
import ResetPassword from './Pages/Common/ResetPassword';

const socket = io("http://localhost:4000");

const AdminRouterWrapper = ({ element }) => {
  const userRole = useSelector((state) => state.user.currentUser?.role);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userRole !== "Admin") {
      navigate("/");
    }
  }, [userRole, navigate]);

  return <>{element}</>;
};

function HeaderComponent() {
  const location = useLocation();
  const user = useSelector(state => state.user.currentUser);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminUser = user && user.role === 'Admin';

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {isAdminRoute && isAdminUser && <AdminNavbar />}
    </>
  );
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [newReport, setNewReport] = useState(null);
  const [comfirmReport] = useState(null);
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    socket.on("newEmergencyReport", (newReport) => {
      setNewReport(newReport);
    });
    
    return () => {
      socket.off("newEmergencyReport");
    };
  }, []);

  useEffect(() => {
    setIsAdmin(window.location.pathname.startsWith("/admin"));
  }, []);

  return (
    <Router>
      <HeaderComponent />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/email-verification' element={<EmailConfirmation />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/guidelines' element={<GuidelineCollections />} />
        <Route path='/contacts' element={<ContactsCollections />} />
        <Route path='/user/evacuation/guidelines' element={<EvacuationGuidelines />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/user/dashboard' element={<UserDashboard />} />
        <Route path='/EarthquakeGuidelines' element={<EarthquakeGuidelines />} />
        <Route path='/guidelines/category/guideline/:categoryId' element={<GuidelinesbyCategory />} />
        <Route path='/contacts/category/contact/:categoryId' element={<ContactsbyCategory />} />
        <Route path="/email-confirm/:userId/:token" element={<ConfirmationPage />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />


        <Route path='/admin/*' element={
          <AdminRouterWrapper
            element={<Routes>
              <Route path='dashboard' element={<AdminDashboard />} />
              <Route path='profile' element={<Profile />} />
              <Route path='report' element={<EmergencyReport />} />
              <Route path='create/steps' element={<CreateSteps />} />
              <Route path='create/contacts' element={<CreateContacts />} />
              <Route path='create/guidelines' element={<CreateGuidelines />} />
              <Route path='create/category/contacts' element={<CreateCategoryContacts />} />
              <Route path='create/category/guidelines' element={<CreateCategoryGuidelines />} />
              <Route path='create/departments' element={<CreateDepartment />} />
              <Route path='update/steps/:stepId' element={<UpdateSteps />} />
              <Route path='update/departments/:departmentId' element={<UpdateDepartment />} />
              <Route path='update/contact/:contactId' element={<UpdateContacts />} />
              <Route path='update/guidelines/:guidelineId' element={<UpdateGuidelines />} />
              <Route path='update/category/contacts/:categoryId' element={<UpdateCategoryContacts />} />
              <Route path='update/category/guidelines/:categoryId' element={<UpdateCategoryGuidelines />} />
              <Route path='guideline/table' element={<GuidelineTable />} />
              <Route path='guideline/category/table' element={<CategoryGuidelinesTable />} />
              <Route path='contact/table' element={<ContactsTable />} />
              <Route path='contact/category/table' element={<CategoryContactsTable />} />
              <Route path='department/table' element={<DepartmentTable />} />
              <Route path='guidelines/:guidelineId' element={<Guidelinesteps />} />
              <Route path='profile' element={<AdminProfile />} />
            </Routes>}
          />
        } />
      </Routes>
      {!isAdmin && <UserFooter />}
      {isAdmin && <ToastNotification newReport={newReport} />}
    </Router>
  );
}

export default App;
