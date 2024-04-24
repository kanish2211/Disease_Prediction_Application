import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const PreLoginNavbar = () => {
  return (
    <nav className="sticky top-0 bg-[#14bbcb] h-16 p-4 flex justify-between z-10">
      <p className="font-extrabold text-xl shadow-2xl">HealWell</p>
      <div className="nav-list flex">
        <p className="focus:underline hover:underline mx-3">
          <Link to="/login">Login</Link>
        </p>
        <p>|</p>
        <p className="focus:underline hover:underline mx-3">
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </nav>
  );
};

export default PreLoginNavbar;
