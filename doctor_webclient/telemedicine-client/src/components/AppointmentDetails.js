import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AppointmentDetails = () => {
    const { submissionId } = useParams(); // Get the ID from the URL
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch appointment details using the ID
        const fetchAppointmentDetails = async () => {
            try {
                const token = 'Bearer sample-token'; // Replace with your actual token
                const response = await axios.get(`http://127.0.0.1:8000/appointments/${submissionId}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setAppointmentDetails(response.data);
            } catch (err) {
                console.error('Error fetching appointment details:', err);
                setError('Failed to fetch details.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointmentDetails();
    }, [submissionId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Appointment Details</h2>
            <p><strong>Patient ID:</strong> {appointmentDetails.patient_id}</p>
            <p><strong>Submission ID:</strong> {appointmentDetails.submission_id}</p>
            <p><strong>Symptoms:</strong></p>
            <ul>
                {appointmentDetails.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                ))}
            </ul>
            <p><strong>Status:</strong> {appointmentDetails.status}</p>
            <p><strong>Notes:</strong> {appointmentDetails.notes}</p>
        </div>
    );
};

export default AppointmentDetails;