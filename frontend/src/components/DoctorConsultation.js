import React, { useState } from "react";
import DoctorProfile from "./DoctorProfile";

const DoctorConsultation = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);

  // Function to handle department selection
  const handleDepartmentSelect = (event) => {
    setSelectedDepartment(event.target.value);
    // You can fetch doctors data based on the selected department here
    // For demonstration purpose, I'm just setting dummy data
    // Replace this with your actual API call
    const dummyDoctors = [
      {
        id: 1,
        name: "Dr. John Doe",
        department: "Gynaecology",
        ratings: "4.5",
        reviews: "120",
        hospital: "ABC Hospital",
      },
      {
        id: 2,
        name: "Dr. Jane Smith",
        department: "Cardiology",
        ratings: "4.8",
        reviews: "150",
        hospital: "XYZ Hospital",
      },
      // Add more dummy data for other departments
    ];
    setDoctors(dummyDoctors);
  };

  return (
    <div>
      <h2>Doctor Consultation Appointment Maker</h2>
      <div>
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
      <div>
        <h3>Doctors</h3>
        {doctors.map((doctor) => (
          <DoctorProfile key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorConsultation;
