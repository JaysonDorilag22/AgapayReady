// import React, { useEffect, useState } from "react";
// import { io } from 'socket.io-client';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import LandingPage from "./Pages/Common/LandingPage";
// import Map from "./Pages/Common/Map";
// import Blog from "./components/Blog";
// import RegisterPage from "./Pages/Common/Register";
// import Login from "./Pages/Common/Login";
// import EvacuationGuidelines from "./Pages/Common/EvacuationGuidelines";
// import UserDashboard from "./Pages/User/Dashboard";
// import Profile from "./Pages/User/Profile";
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import CreateGuidelines from "./Pages/Admin/guidelines/CreateGuidelines";
// import CreateSteps from "./Pages/Admin/guidelines/CreateSteps";
// import CreateContacts from "./Pages/Admin/contacts/CreateContacts";
// import CreateCategoryContacts from "./Pages/Admin/contacts/CreateCategoryContacts";
// import CreateCategoryGuidelines from "./Pages/Admin/guidelines/CreateCategoryGuidelines";
// import GuidelineTable from "./Pages/Admin/guidelines/GuidelineTable";
// import GuidelineSteps from "./Pages/Admin/guidelines/GuidelineSteps";
// import UpdateCategoryContacts from "./Pages/Admin/contacts/UpdateCategoryContacts";
// import UpdateCategoryGuidelines from "./Pages/Admin/guidelines/UpdateCategoryGuidelines";
// import UpdateGuidelines from "./Pages/Admin/guidelines/UpdateGuidelines";
// import UpdateContacts from "./Pages/Admin/contacts/UpdateContacts";
// import CreateDepartment from "./Pages/Admin/department/CreateDepartment";
// import UpdateDepartment from "./Pages/Admin/department/UpdateDepartment";
// import UpdateSteps from "./Pages/Admin/guidelines/UpdateSteps";
// import EmergencyReport from "./Pages/Admin/EmergencyReport";

// const socket = io("http://localhost:4000"); // Establish Socket.IO connection

// const AdminRoutesWrapper = ({ element }) => {
//   const userRole = useSelector((state) => state.user.currentUser?.role);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userRole !== "Admin") {
//       navigate("/"); // Redirect to home if user is not admin
//     }
//   }, [userRole, navigate]);

//   return <>{element}</>;
// };

// const App = () => {
//   const [showToast, setShowToast] = useState(false); // State to control whether to show the toast
//   const [newReport, setNewReport] = useState(null); // State to store the new report data

//   useEffect(() => {
//     // Listen for new reports in real-time
//     socket.on('newEmergencyReport', (newReport) => {
//       // Set the new report data to show the toast
//       setNewReport(newReport);
//       // Show the toast
//       setShowToast(true);
//     });

//     // Clean up event listener on component unmount
//     return () => {
//       socket.off('newEmergencyReport');
//     };
//   }, []);

//   const showNewReportToast = () => {
//     toast.success(`New Emergency Report: ${newReport.location} - ${newReport.description}`);
//   };

//   return (
//     <Router>
//       {/* Conditional rendering of Header */}
//       {!isAdminPage && <Header />}

//       <Routes>
//         {/* pages */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/map" element={<Map />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/login" element={<Login />} />

//         {/* common */}
//         <Route path="/evacuation/guidelines" element={<EvacuationGuidelines />} />

//         {/* user */}
//         <Route path="/user/dashboard" element={<UserDashboard />} />
//         <Route path="/user/profile" element={<Profile />} />
//         {/* admin */}
//         {/* Create */}
//         <Route path="/admin/create/steps" element={<AdminRoutesWrapper element={<CreateSteps />} />} />
//         <Route path="/admin/create/departments" element={<AdminRoutesWrapper element={<CreateDepartment />} />} />
//         <Route path="/admin/create/contacts" element={<AdminRoutesWrapper element={<CreateContacts />} />} />
//         <Route path="/admin/create/guidelines" element={<AdminRoutesWrapper element={<CreateGuidelines />} />} />
//         <Route path="/admin/create/category/contacts" element={<AdminRoutesWrapper element={<CreateCategoryContacts />} />} />
//         <Route path="/admin/create/category/guidelines" element={<AdminRoutesWrapper element={<CreateCategoryGuidelines />} />} />
//         {/* Update */}
//         <Route path="/admin/update/steps/:stepId" element={<AdminRoutesWrapper element={<UpdateSteps />} />} />
//         <Route path="/admin/update/departments/:departmentId" element={<AdminRoutesWrapper element={<UpdateDepartment />} />} />
//         <Route path="/admin/update/contacts/:contactId" element={<AdminRoutesWrapper element={<UpdateContacts />} />} />
//         <Route path="/admin/update/guidelines/:guidelineId" element={<AdminRoutesWrapper element={<UpdateGuidelines />} />} />
//         <Route path="/admin/update/category/contacts/:categoryId" element={<AdminRoutesWrapper element={<UpdateCategoryContacts />} />} />
//         <Route path="/admin/update/category/guidelines/:categoryId" element={<AdminRoutesWrapper element={<UpdateCategoryGuidelines />} />} />

//         {/* Tables */}
//         <Route path="/admin/guideline/table" element={<AdminRoutesWrapper element={<GuidelineTable />} />} />
//         <Route path="/admin/guidelines/:guidelineId" element={<AdminRoutesWrapper element={<GuidelineSteps />} />} />
//         <Route path="/admin/dashboard" element={<AdminRoutesWrapper element={<AdminDashboard />} />} />
//         <Route path="/admin/report" element={<AdminRoutesWrapper element={<EmergencyReport />} />} />

//       </Routes>

//       {/* Conditional rendering of Footer */}
//       {!isAdminPage && <Footer />}
//       {showToast && <ToastContainer />}
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiAlarmWarningLine } from 'react-icons/ri'; 
import { io } from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
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

const socket = io("http://localhost:4000");

const AdminRoutesWrapper = ({ element }) => {
  const userRole = useSelector((state) => state.user.currentUser?.role);

  useEffect(() => {
    if (userRole !== "Admin") {
      // Redirect to home if user is not admin
      window.location.href = "/";
    }
  }, [userRole]);

  return <>{element}</>;
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [newReport, setNewReport] = useState(null);

  useEffect(() => {
    // Listen for new emergency reports
    socket.on("newEmergencyReport", (newReport) => {
      setNewReport(newReport);
      // Show toast only if the user is in the admin section
      if (isAdmin) {
        setShowToast(true);
      }
    });

    return () => {
      socket.off("newEmergencyReport");
    };
  }, [isAdmin]);

  useEffect(() => {
    // Show toast when new report is received
    if (isAdmin && newReport) {
      showNewReportToast(newReport);
    }
  }, [isAdmin, newReport]);

  const showNewReportToast = (newReport) => {
    toast.success(
      `New Emergency Report: ${newReport.location} - ${newReport.description}`,
      {
        // Add an icon to the toast notification
        icon: <RiAlarmWarningLine size={24} />,
        // Set a custom style for the toast
        toastStyle: {
          backgroundColor: 'red',
          color: 'white',
        },
      }
    );
  };

  // Check if the current route is in the admin section
  useEffect(() => {
    setIsAdmin(window.location.pathname.startsWith("/admin"));
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutesWrapper
              element={<AdminDashboard />}
              isAdmin={isAdmin}
            />
          }
        />
        <Route
          path="/admin/report"
          element={
            <AdminRoutesWrapper
              element={<EmergencyReport />}
              isAdmin={isAdmin}
            />
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/evacuation/guidelines"
          element={<EvacuationGuidelines />}
        />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route
          path="/admin/create/steps"
          element={<AdminRoutesWrapper element={<CreateSteps />} />}
        />
        <Route
          path="/admin/create/departments"
          element={<AdminRoutesWrapper element={<CreateDepartment />} />}
        />
        <Route
          path="/admin/create/contacts"
          element={<AdminRoutesWrapper element={<CreateContacts />} />}
        />
        <Route
          path="/admin/create/guidelines"
          element={<AdminRoutesWrapper element={<CreateGuidelines />} />}
        />
        <Route
          path="/admin/create/category/contacts"
          element={
            <AdminRoutesWrapper element={<CreateCategoryContacts />} />
          }
        />
        <Route
          path="/admin/create/category/guidelines"
          element={
            <AdminRoutesWrapper element={<CreateCategoryGuidelines />} />
          }
        />
        <Route
          path="/admin/update/steps/:stepId"
          element={<AdminRoutesWrapper element={<UpdateSteps />} />}
        />
        <Route
          path="/admin/update/departments/:departmentId"
          element={<AdminRoutesWrapper element={<UpdateDepartment />} />}
        />
        <Route
          path="/admin/update/contacts/:contactId"
          element={<AdminRoutesWrapper element={<UpdateContacts />} />}
        />
        <Route
          path="/admin/update/guidelines/:guidelineId"
          element={<AdminRoutesWrapper element={<UpdateGuidelines />} />}
        />
        <Route
          path="/admin/update/category/contacts/:categoryId"
          element={
            <AdminRoutesWrapper element={<UpdateCategoryContacts />} />
          }
        />
        <Route
          path="/admin/update/category/guidelines/:categoryId"
          element={
            <AdminRoutesWrapper element={<UpdateCategoryGuidelines />} />
          }
        />
        <Route
          path="/admin/guideline/table"
          element={<AdminRoutesWrapper element={<GuidelineTable />} />}
        />
        <Route
          path="/admin/guidelines/:guidelineId"
          element={<AdminRoutesWrapper element={<GuidelineSteps />} />}
        />
      </Routes>
      <Footer />
      {isAdmin && showToast && <ToastContainer />}
    </Router>
  );
};

export default App;
