import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    phnumber: "",
    error: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, email, ...data } = formData;
    if (password !== confirmPassword) {
      setFormData({ ...formData, error: "Passwords do not match" });
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/signup",
        { ...data, email },
        { headers: { "Content-Type": "application/json" } }
      );
      sessionStorage.setItem("email", email);
      navigate("/health-details");
    } catch (error) {
      console.error("Signup failed:", error);
      setFormData({ ...formData, error: "Signup failed. Please try again." });
    }
  };

  return (
    <div className="h-screen">
      <div className="text-center pt-12 text-6xl text-[#14bbcb] font-extrabold">
        SIGN UP
      </div>
      <div className="flex w-9/12 mx-auto justify-center py-8">
        <div className="py-2 w-[48%] mr-2">
          <img
            src="assets/images/login.png"
            className="mx-auto rounded-xl"
            width={590}
            alt="Signup"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-[48%] my-auto max-w-[620px] ml-2"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="input block w-full my-6"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="input block w-full my-6"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="input block w-full my-6"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="input block w-full my-6"
          />
          <div className="flex justify-between w-full my-6">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="input block w-[48%]"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Others">Others</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              placeholder="Date of Birth"
              required
              className="input block  w-[48%] "
            />
          </div>

          <input
            type="tel"
            name="phnumber"
            value={formData.phnumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="input block w-full my-6"
          />
          <button
            type="submit"
            className="btn bg-[#14bbcb] block w-6/12 mt-9 mb-4 mx-auto font-bold"
          >
            REGISTER
          </button>
          {formData.error && <p>{formData.error}</p>}
          <div className="text-center text-[#14bbcb]">
            <p>or</p>
            <Link to="/login">
              <span className="font-bold">
                Login If you already have an Account
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
