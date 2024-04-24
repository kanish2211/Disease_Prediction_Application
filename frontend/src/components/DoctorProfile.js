import React from "react";

const DoctorProfile = ({ doctor }) => {
  return (
    <div>
      <h3>{doctor.name}</h3>
      <p>Department: {doctor.department}</p>
      <p>Ratings: {doctor.ratings}</p>
      <p>Reviews: {doctor.reviews}</p>
      <p>Consulting Hospital: {doctor.hospital}</p>
    </div>
  );
};

export default DoctorProfile;
