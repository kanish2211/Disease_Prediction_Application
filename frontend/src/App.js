import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Prediction from "./components/Prediction";
import Navbar from "./components/Navbar";
import BlogList from "./components/Blogs";
import MissionVissio from "./components/MissionVision";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import HealthDetails from "./components/HealthDetails";
import LandingPage from "./components/LandingPage";
import PreLoginNavbar from "./components/preLoginNavBar";
import Footer from "./components/Footer";
import DoctorConsultation from "./components/DoctorConsultation";

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const Layout2 = ({ children }) => (
  <>
    <PreLoginNavbar />
    {children}
  </>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    // Your login logic here
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <div className="bg-gray-100">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/health-details" element={<HealthDetails />} />
          <Route
            path="/"
            element={
              <Layout2>
                <LandingPage />
              </Layout2>
            }
          />
          {true && (
            <>
              <Route
                path="/home"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/prediction"
                element={
                  <Layout>
                    <Prediction />
                  </Layout>
                }
              />
              <Route
                path="/blogs"
                element={
                  <Layout>
                    <BlogList />
                  </Layout>
                }
              />
              <Route
                path="/mission"
                element={
                  <Layout>
                    <MissionVissio />
                  </Layout>
                }
              />
              <Route
                path="/doctor-consultation"
                element={
                  <Layout>
                    <DoctorConsultation />
                  </Layout>
                }
              />
            </>
          )}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
