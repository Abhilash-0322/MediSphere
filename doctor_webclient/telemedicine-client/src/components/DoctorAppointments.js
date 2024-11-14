// src/components/DoctorAppointments.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DoctorAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get(`/appointments/${doctorId}`);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [doctorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.appointment_id}>
            <strong>Patient ID:</strong> {appointment.patient_id} <br />
            <strong>Symptoms:</strong> {appointment.symptoms.join(', ')} <br />
            <strong>Status:</strong> {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorAppointments;