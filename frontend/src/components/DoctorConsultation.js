import React, { useState, useEffect } from "react";
import DoctorProfile from "./DoctorProfile";
import Select from "react-select";

const DoctorConsultation = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocationSpltyData();
  }, []);

  const fetchLocationSpltyData = async () => {
    try {
      const response = await fetch("http://localhost:5000/location-splty-data");
      if (!response.ok) {
        throw new Error("Failed to fetch location and specialty data");
      }
      const data = await response.json();
      setDepartments(
        data.specialties.map((specialty) => ({
          value: specialty,
          label: specialty,
        }))
      );
      setLocations(
        data.locations.map((location) => ({ value: location, label: location }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doctors?location=${selectedLocation}&specialty=${selectedDepartment}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error(error);
      setDoctors([]);
    }
  };

  const handleDepartmentChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
  };

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
    fetchDoctors();
  };

  return (
    <div style={{ backgroundColor: "#c7afc1", padding: "20px" }}>
      <h2>Doctor Consultation Appointment Maker</h2>
      <div style={{ backgroundColor: "#8EBAF1", padding: "10px" }}>
        <label htmlFor="department">Select Department:</label>
        <Select
          id="department"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          options={departments}
          isClearable
          placeholder="Select Department"
        />
      </div>
      <div
        style={{
          backgroundColor: "#EE9C6F",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <label htmlFor="location">Select Location:</label>
        <Select
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange}
          options={locations}
          isClearable
          placeholder="Select Location"
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
        {doctors.length === 0 && searchClicked ? (
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
