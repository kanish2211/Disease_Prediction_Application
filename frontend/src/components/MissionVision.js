// MissionVissio.js
import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const MissionVission = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Vision Statement:</h1>
        <p className="subtitle">
          To empower individuals and healthcare professionals with a powerful
          diagnostic tool that leverages machine learning to provide accurate
          disease predictions. Our vision is to create a world where early
          detection and prevention of diseases are made easy and accessible to
          all, thereby improving the overall health and well-being of
          individuals.
        </p>
      </div>
      <div className="header">
        <h1 className="title">Mission Statement:</h1>
        <p className="subtitle">
          "Our mission is to develop and deploy cutting-edge machine learning
          models to predict diseases accurately, enabling early intervention and
          treatment
        </p>
        <p className="subtitle">
          We are committed to providing a user-friendly and reliable platform
          that allows users to input their symptoms and receive instant disease
          predictions.
        </p>
        <p className="subtitle">
          We aim to enhance healthcare outcomes by making disease diagnosis more
          efficient, thereby reducing the burden on healthcare systems.
        </p>
        <p className="subtitle">
          Our mission is to educate and inform users about diseases, their
          symptoms, and recommended precautions, fostering a culture of
          proactive health management
        </p>
        <p className="subtitle">
          We strive to ensure that our application is accessible, user-friendly,
          and continually updated with the latest medical data and research
        </p>
      </div>
    </div>
  );
};

export default MissionVission;
