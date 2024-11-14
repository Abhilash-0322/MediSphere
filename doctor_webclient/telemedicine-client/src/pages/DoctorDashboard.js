// src/pages/DoctorDashboard.js
import React from 'react';
import DoctorAppointments from '../components/DoctorAppointments';

const DoctorDashboard = () => {
  const doctorId = '1'; // Replace with actual doctor ID from login/authentication context

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <DoctorAppointments doctorId={doctorId} />
    </div>
  );
};

export default DoctorDashboard;