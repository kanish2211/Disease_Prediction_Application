import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Prediction from "./components/Prediction";
import Navbar from "./components/Navbar";
import BlogList from "./components/Blogs";
import MissionVission from "./components/MissionVision";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import HealthDetails from "./components/HealthDetails";
import LandingPage from "./components/LandingPage";
import PreLoginNavbar from "./components/preLoginNavBar";
import Footer from "./components/Footer";
import DoctorConsultation from "./components/DoctorConsultation";

const LoggedInLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const PreLoginLayout = ({ children }) => (
  <>
    <PreLoginNavbar />
    {children}
  </>
);

const Layout = ({ children }) => {
  return (
    <>
      {sessionStorage.getItem("email") == null ? (
        <PreLoginLayout />
      ) : (
        <LoggedInLayout />
      )}
      {children}
    </>
  );
};

function App() {
  const isLoggedIn = sessionStorage.getItem("email") != null;
  return (
    <div className="bg-gray-100">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/health-details" element={<HealthDetails />} />
          <Route
            path="/"
            element={
              <Layout>
                <LandingPage />
              </Layout>
            }
          />
          {isLoggedIn && (
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
                    <MissionVission />
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
