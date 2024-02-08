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

const App = () => {
  return (
    <Router>
      <>
      <Header/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
