// Home.js
import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Welcome to Disease Prediction</h1>
        <p className="subtitle">Start your medical journey here</p>
      </div>
      <div className="content">
        <div className="info-card">
          <Link to="/mission">
            <h2 className="info-title">Our Vision and Mission</h2>
            <p className="info-text">
              Vision Statement: "To empower individuals and healthcare
              professionals with a powerful diagnostic too...
            </p>
          </Link>
        </div>
        <div className="info-card">
          <Link to="/blogs">
            <h2 className="info-title">BLOGS</h2>
            <p className="info-text">
              Get sto read about more new and excitig medical related blogs
              here.
            </p>
          </Link>
        </div>
        {/* Add more content */}
      </div>
    </div>
  );
};

export default Home;
