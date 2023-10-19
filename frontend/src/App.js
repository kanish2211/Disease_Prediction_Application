import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Prediction from "./components/Prediction";
import Navbar from "./components/Navbar";
import BlogList from "./components/Blogs";
import MissionVissio from "./components/MissionVision";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/mission" element={<MissionVissio />} />
      </Routes>
    </Router>
  );
}

export default App;
