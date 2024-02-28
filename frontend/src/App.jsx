import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import LandingPage from "./Pages/Common/LandingPage";
import Map from "./Pages/Common/Map";
import Blog from "./components/Blog";
import RegisterPage from "./Pages/Common/Register";
import Login from "./Pages/Common/Login";
import EvacuationGuidelines from "./Pages/Common/EvacuationGuidelines";
import UserDashboard from "./Pages/User/Dashboard";
import Profile from "./Pages/User/Profile";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateGuidelines from "./Pages/Admin/guidelines/CreateGuidelines";
import CreateSteps from "./Pages/Admin/guidelines/CreateSteps";
import CreateContacts from "./Pages/Admin/contacts/CreateContacts";
import CreateCategoryContacts from "./Pages/Admin/contacts/CreateCategoryContacts";
import CreateCategoryGuidelines from "./Pages/Admin/guidelines/CreateCategoryGuidelines";
import GuidelineTable from "./Pages/Admin/guidelines/GuidelineTable";
import GuidelineSteps from "./Pages/Admin/guidelines/GuidelineSteps";
import UpdateCategoryContacts from "./Pages/Admin/contacts/UpdateCategoryContacts";
import UpdateCategoryGuidelines from "./Pages/Admin/guidelines/UpdateCategoryGuidelines";
import UpdateGuidelines from "./Pages/Admin/guidelines/UpdateGuidelines";
import UpdateContacts from "./Pages/Admin/contacts/UpdateContacts";
import CreateDepartment from "./Pages/Admin/department/CreateDepartment";
import UpdateDepartment from "./Pages/Admin/department/UpdateDepartment";
import UpdateSteps from "./Pages/Admin/guidelines/UpdateSteps";
import EmergencyReport from "./Pages/Admin/EmergencyReport";
import ToastNotification from "./components/ToastNotification";
import AdminProfile from "./Pages/Admin/AdminProfile";

const socket = io("http://localhost:4000");

const AdminRoutesWrapper = ({ element }) => {
  const userRole = useSelector((state) => state.user.currentUser?.role);

  useEffect(() => {
    if (userRole !== "Admin") {
      window.location.href = "/";
    }
  }, [userRole]);

  return <>{element}</>;
};
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [newReport, setNewReport] = useState(null);

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
      {!isAdmin && <Navbar />}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="map" element={<Map />} />
        <Route path="blog" element={<Blog />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<Login />} />
        <Route path="evacuation/guidelines" element={<EvacuationGuidelines />} />
        <Route path="user/dashboard" element={<UserDashboard />} />
        <Route path="user/profile" element={<Profile />} />

        <Route
          path="/admin/*"
          element={
            <AdminRoutesWrapper
              element={<Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="report" element={<EmergencyReport />} />
                <Route path="create/steps" element={<CreateSteps />} />
                <Route path="create/departments" element={<CreateDepartment />} />
                <Route path="create/contacts" element={<CreateContacts />} />
                <Route path="create/guidelines" element={<CreateGuidelines />} />
                <Route path="create/category/contacts" element={<CreateCategoryContacts />} />
                <Route path="create/category/guidelines" element={<CreateCategoryGuidelines />} />
                <Route path="update/steps/:stepId" element={<UpdateSteps />} />
                <Route path="update/departments/:departmentId" element={<UpdateDepartment />} />
                <Route path="update/contacts/:contactId" element={<UpdateContacts />} />
                <Route path="update/guidelines/:guidelineId" element={<UpdateGuidelines />} />
                <Route path="update/category/contacts/:categoryId" element={<UpdateCategoryContacts />} />
                <Route path="update/category/guidelines/:categoryId" element={<UpdateCategoryGuidelines />} />
                <Route path="guideline/table" element={<GuidelineTable />} />
                <Route path="guidelines/:guidelineId" element={<GuidelineSteps />} />
                <Route path="profile" element={<AdminProfile />} />
              </Routes>}
            />
          }
        />
        {/* Gumana ka naaaaaa */}
      </Routes>
      {!isAdmin && <Footer />}
      {isAdmin && <ToastNotification newReport={newReport} />}
    </Router>
  );
};


export default App;
