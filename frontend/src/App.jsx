import { useState } from "react";
import axios from "axios";
import Header from "./Components/Header";
import LandingPage from "./Pages/Common/LandingPage";
import RegisterPage from "./Pages/Common/Register"
import Map from "./Pages/Common/Map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Blog from "./Components/Blog";
import Footer from "./Components/Footer";
import UserDashboard from "./Pages/User/Dashboard";
import Login from "./Components/Login";
import EvacuationGuidelines from "./Pages/Common/EvacuationGuidelines";

const App = () => {
  return (
    <Router>
      <>
      <Header/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/evacuation/guidelines" element={<EvacuationGuidelines />} />

        </Routes>
        <Footer/>
      </>
    </Router>
  );
};

export default App;
