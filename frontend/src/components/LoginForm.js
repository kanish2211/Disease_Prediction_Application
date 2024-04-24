// LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", { email, password });
      sessionStorage.setItem("email", email);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Signup failed. Please try again.");
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="h-screen">
      <div className="text-center pt-12 text-6xl text-[#14bbcb] font-extrabold">
        LOGIN
      </div>
      <div className="flex w-9/12 mx-auto justify-center py-8  ">
        <div className=" py-2 w-[48%] mr-2">
          <img
            src="assets/images/login.png"
            className="mx-auto rounded-xl"
            width={590}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className=" w-[48%] my-auto max-w-[620px] ml-2  "
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input block  w-full my-6"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input block  w-full  my-6 "
          />
          <button
            type="submit"
            className="btn bg-[#14bbcb] block  w-6/12  mt-9 mb-4  mx-auto font-bold"
          >
            LOGIN
          </button>
          {error && <p>{error}</p>}
          <div className="text-center text-[#14bbcb]">
            <p>or</p>
            <Link to="/signup">
              <span className="font-bold">Register for New Account</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
