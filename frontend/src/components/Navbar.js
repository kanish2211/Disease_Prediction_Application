import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Home.css";
const Navbar = () => {
  // Get the current location using useLocation from react-router-dom
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <Link to="/">Home</Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/prediction" ? "active" : ""
          }`}
        >
          <Link to="/prediction">Disease Prediction</Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/prediction" ? "active" : ""
          }`}
        >
          <Link to="/blogs">Blogs</Link>
        </li>
        {/* Add more navigation items with the same pattern */}
      </ul>
    </nav>
  );
};

export default Navbar;
