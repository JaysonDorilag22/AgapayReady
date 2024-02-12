import { useState } from "react";
import axios from "axios";
import Header from "./Components/Header";
import LandingPage from "./Pages/landingPage";
import RegisterPage from "./Pages/Register"
import Map from "./Pages/Map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Blog from "./Components/Blog";
import Footer from "./Components/Footer";
import Dashboard from "./Pages/Dashboard";

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
          <Route path="/dashboard" element={<Dashboard />} />


        </Routes>
        <Footer/>
      </>
    </Router>
  );
};

export default App;
