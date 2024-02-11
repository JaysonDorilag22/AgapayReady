import { useState } from "react";
import axios from "axios";
import Header from "./Components/Header";
import LandingPage from "./Pages/landingPage";
import Map from "./Pages/Map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Blog from "./Components/Blog";

const App = () => {
  return (
    <Router>
      <>
      <Header/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
