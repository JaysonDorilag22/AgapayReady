import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Map from "./Pages/Common/Map";
import Blog from "./Components/Blog";
import Login from "./Components/Login";

//Page
import LandingPage from "./Pages/Common/LandingPage";
import RegisterPage from "./Pages/Common/Register"

//common
import EvacuationGuidelines from "./Pages/Common/EvacuationGuidelines";

//user
import UserDashboard from "./Pages/User/Dashboard";
import Profile from "./Pages/User/Profile";


const App = () => {
  return (
    <Router>
      <>
      <Header/>
        <Routes>
          {/* pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />

          {/* commmon */}
          <Route path="/evacuation/guidelines" element={<EvacuationGuidelines />} />

          {/* user */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<Profile />} />

        </Routes>
        <Footer/>
      </>
    </Router>
  );
};

export default App;
