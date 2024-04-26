import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex justify-between items-center bg-[#14bbcb] h-16 p-4 text-white">
        <div className="flex items-center">
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-gray-800 opacity-50 z-50"
              onClick={toggleMenu}
            ></div>
          )}
          <button className="menu-icon" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <h1 className="text-xl ml-4">HealWell</h1>
        </div>
        <div className="profile flex items-center">
          <img
            src="/assets/profile.jpg"
            alt="Profile"
            className="rounded-full h-8 w-8"
          />
          <p className="ml-2">Your Name</p>
          <div className="profile-menu ml-2">
            {isMenuOpen && (
              <div className="menu-dialog bg-gray-800 text-white absolute top-0 left-0 h-screen p-4 z-50 w-2/12">
                <span>HI User </span>
                <ul>
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/meds">Meds</Link>
                  </li>
                  <li>
                    <Link to="/consult">Consult a Doctor</Link>
                  </li>
                  <li>
                    <Link to="/predict">Predict a Disease</Link>
                  </li>
                  <li
                    onTouchEnd={() => {
                      sessionStorage.removeItem("email");
                    }}
                  >
                    <Link to="/login">Signout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
