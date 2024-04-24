import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const HealthDetails = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    bloodPressure: "",
    allergies: "",
    medications: "",
    medicalConditions: "",
    diabetes: false,
    hypertension: false,
    hypotension: false,
    nearSightedness: false,
    fatigue: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type);
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
    const email = sessionStorage.getItem("email");

    setEmail(email);
  }, []);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [errorGetEmail, setErrorGetEmail] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user-details?email=${email}`
      );
      setUser(response.data);
    } catch (error) {
      setErrorGetEmail("Failed to fetch user details. Please try again.");
      console.log(errorGetEmail);
    }
  };

  useEffect(() => {
    if (email) {
      getUserDetails();
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    if (!formData.weight || !formData.height) {
      setError("Please fill in all required fields");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/medical-details",
        { ...formData, email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/home"); // Redirect to the next page after successful submission
    } catch (error) {
      console.error("Submission failed:", error);
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <div className="h-full  min-h-screen">
      <div className="text-center pt-12 text-6xl text-[#14bbcb] font-extrabold">
        MEDICAL RECORD
      </div>
      <div className="  py-8  w-full flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className=" my-auto  mx-2 border-2 shadow-2xl  p-10 rounded-[30px] w-[80%] border-[#d0bccc] "
        >
          <div></div>
          <div className="flex justify-start ">
            <div className="">
              <img
                src="assets/images/health_details.png"
                className="mx-auto rounded-[200px] "
                width={500}
              />
            </div>

            <div className="w-8/12 ">
              <p className="text-xl text-gray-500">
                Please Fill your medical details below.
              </p>
              <p className="text-gray-400">
                Make sure the details you enter are accurate to your knowledge.
              </p>
              <input
                type="text"
                value={user?.name}
                name="name"
                onChange={handleChange}
                placeholder="Name"
                required
                className="input block w-full my-6"
                disabled
              />
              <input
                type="email"
                value={user?.email}
                onChange={handleChange}
                placeholder="Email"
                required
                disabled
                className="input block w-full my-6"
              />
              <div className="flex justify-between w-full my-6">
                <select
                  value={user?.gender}
                  onChange={handleChange}
                  required
                  className="input block w-[48%]"
                  disabled
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Others">Others</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <input
                  type="text"
                  value={user?.dateOfBirth}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  required
                  disabled
                  className="input block  w-[48%] "
                />
              </div>
              <input
                type="tel"
                value={user?.phnumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                disabled
                className="input block w-full my-6"
              />
            </div>
          </div>
          <input
            type="number"
            value={formData.weight}
            onChange={handleChange}
            name="weight"
            placeholder="Weight in kgs"
            required
            className="input block w-full my-6"
          />
          <input
            type="number"
            value={formData.height}
            onChange={handleChange}
            name="height"
            placeholder="Height in cms"
            required
            className="input block w-full my-6"
          />
          {/* Additional fields */}
          <input
            type="text"
            value={formData.bloodPressure}
            onChange={handleChange}
            placeholder="Blood Pressure"
            className="input block w-full my-6"
            name="bloodPressure"
          />
          <input
            type="text"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="Allergies"
            name="allergies"
            className="input block w-full my-6"
          />
          <input
            type="text"
            value={formData.medications}
            onChange={handleChange}
            placeholder="Medications"
            name="medications"
            className="input block w-full my-6"
          />
          <input
            type="text"
            value={formData.medicalConditions}
            onChange={handleChange}
            name="medicalConditions"
            placeholder="Medical Conditions"
            className="input block w-full my-6"
          />
          {/* Checkboxes for common diseases */}
          <div className="my-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.diabetes}
                onChange={handleChange}
                className="form-checkbox"
                name="diabetes"
              />
              <span className="ml-2">Diabetes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                checked={formData.hypertension}
                onChange={handleChange}
                className="form-checkbox"
                nonce="hypertension"
              />
              <span className="ml-2">Hypertension</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                checked={formData.hypotension}
                onChange={handleChange}
                className="form-checkbox"
                name="hypotension"
              />
              <span className="ml-2">Hypotension</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                checked={formData.nearSightedness}
                onChange={handleChange}
                className="form-checkbox"
                name="nearSightedness"
              />
              <span className="ml-2">Near-sightedness</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                checked={formData.fatigue}
                onChange={handleChange}
                name="fatigue"
                className="form-checkbox"
              />
              <span className="ml-2">Fatigue</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn bg-[#14bbcb] block w-6/12 mt-9 mb-4 mx-auto font-bold"
          >
            CONTINUE
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default HealthDetails;
