import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookedAppointments = () => {
    const [symptomsData, setSymptomsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch symptoms data from the backend
        const fetchSymptomsData = async () => {
            try {
                const token = 'Bearer sample-token'; // Replace with your actual token
                const response = await axios.get('http://127.0.0.1:8000/test/symptoms', {
                    headers: {
                        Authorization: token,
                    },
                });
                setSymptomsData(response.data.submissions || []);
            } catch (err) {
                console.error('Error fetching symptoms:', err);
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchSymptomsData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Booked Appointments</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {symptomsData.length > 0 ? (
                    symptomsData.map((entry) => (
                        <div
                            key={entry.submission_id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '15px',
                                maxWidth: '300px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h3>Patient ID: {entry.patient_id}</h3>
                            <p><strong>Submission ID:</strong> {entry.submission_id}</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                {entry.symptoms.map((symptom, index) => (
                                    <li key={index}>{symptom}</li>
                                ))}
                            </ul>
                            <p style={{color:'lime'}}><strong>Status:</strong> {entry.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No symptoms submissions found.</p>
                )}
            </div>
        </div>
    );
};

export default BookedAppointments;