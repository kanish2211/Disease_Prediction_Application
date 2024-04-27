import React, { useState } from "react";
import DoctorProfile from "./DoctorProfile";

const DoctorConsultation = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  // Function to handle department selection
  const handleDepartmentSelect = (event) => {
    setSelectedDepartment(event.target.value);
  };

  // Function to handle location selection
  const handleLocationSelect = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Function to handle search button click
  const handleSearchClick = () => {
    setSearchClicked(true);
    fetchDoctors(selectedDepartment, selectedLocation);
  };

  // Function to fetch doctors data
  const fetchDoctors = (department, location) => {
    // For demonstration purpose, using dummy data
    // Replace this with your actual API call
    const dummyDoctors = [
      {
        id: 1,
        name: "Dr. John Doe",
        department: "Gynaecology",
        ratings: "4.5",
        hospital: "ABC Hospital",
        location: "New York",
      },
      {
        id: 2,
        name: "Dr. Jane Smith",
        department: "Cardiology",
        ratings: "4.8",
        hospital: "XYZ Hospital",
        location: "Los Angeles",
      },
      // Add more dummy data for other departments
    ];

    // Filter doctors based on selected department and location
    const filteredDoctors = dummyDoctors.filter(
      (doctor) =>
        (!department || doctor.department === department) &&
        (!location || doctor.location === location)
    );
    setDoctors(filteredDoctors);
  };

  return (
    <div style={{ backgroundColor: "#c7afc1", padding: "20px" }}>
      <h2>Doctor Consultation Appointment Maker</h2>
      <div style={{ backgroundColor: "#8EBAF1", padding: "10px" }}>
        <label htmlFor="department">Select Department:</label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={handleDepartmentSelect}
        >
          <option value="">Select</option>
          <option value="Gynaecology">Gynaecology</option>
          <option value="Cardiology">Cardiology</option>
          {/* Add options for other departments */}
        </select>
      </div>
      <div
        style={{
          backgroundColor: "#EE9C6F",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <label htmlFor="location">Select Location:</label>
        <input
          type="text"
          id="location"
          value={selectedLocation}
          onChange={handleLocationSelect}
          placeholder="Enter Location"
          style={{ marginLeft: "10px" }}
        />
      </div>
      <button
        onClick={handleSearchClick}
        style={{
          backgroundColor: "#14BBCB",
          color: "#fff",
          padding: "10px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
      <div
        style={{
          backgroundColor: "#14BBCB",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <h3>Doctors</h3>
        {searchClicked && doctors.length === 0 ? (
          <p>No doctors found</p>
        ) : (
          doctors.map((doctor) => (
            <DoctorProfile key={doctor.id} doctor={doctor} />
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorConsultation;
