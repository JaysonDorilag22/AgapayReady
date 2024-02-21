import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Page Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./Pages/Common/LandingPage";
import Map from "./Pages/Common/Map";
import Blog from "./components/Blog";
import RegisterPage from "./Pages/Common/Register";
import Login from "./Pages/Common/Login";

// Common Components
import EvacuationGuidelines from "./Pages/Common/EvacuationGuidelines";

// User Components
import UserDashboard from "./Pages/User/Dashboard";
import Profile from "./Pages/User/Profile";

// Admin Components
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateGuidelines from "./Pages/Admin/guidelines/CreateGuidelines";
import CreateSteps from "./Pages/Admin/guidelines/CreateSteps";
import CreateContacts from "./Pages/Admin/contacts/CreateContacts";
import GuidelineTable from "./Pages/Admin/guidelines/GuidelineTable";
import GuidelineSteps from "./Pages/Admin/guidelines/GuidelineSteps";

const AdminRoutesWrapper = ({ element }) => {
  const userRole = useSelector((state) => state.user.currentUser?.role);

  if (userRole !== "Admin") {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

const App = () => {
  const userRole = useSelector((state) => state.user.currentUser?.role);
  const isAdminPage = window.location.pathname.startsWith('/admin'); // Check if the current page is under /admin

  return (
    <Router>
      {/* Conditional rendering of Header */}
      {!isAdminPage && <Header />}
      
      <Routes>
        {/* pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />

        {/* common */}
        <Route path="/evacuation/guidelines" element={<EvacuationGuidelines />} />

        {/* user */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<Profile />} />

        {/* admin */}
        <Route path="/admin/create/guidelines" element={<AdminRoutesWrapper element={<CreateGuidelines />} />} />
        <Route path="/admin/create/steps" element={<AdminRoutesWrapper element={<CreateSteps />} />} />
        <Route path="/admin/create/contacts" element={<AdminRoutesWrapper element={<CreateContacts />} />} />
        <Route path="/admin/guideline/table" element={<AdminRoutesWrapper element={<GuidelineTable />} />} />
        <Route path="/guidelines/:guidelineId" element={<AdminRoutesWrapper element={<GuidelineSteps />} />} />
        <Route path="/admin/dashboard" element={<AdminRoutesWrapper element={<AdminDashboard />} />} />
      </Routes>

      {/* Conditional rendering of Footer */}
      {!isAdminPage && <Footer />}
    </Router>
  );
};

export default App;
