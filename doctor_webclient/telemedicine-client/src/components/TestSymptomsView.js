import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TestSymptomsView = () => {
  const [symptomsData, setSymptomsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await api.get('/test/symptoms', {
          headers: {
            Authorization: 'Bearer sample-token', // Replace with your actual token
          },
        });
        setSymptomsData(response.data.submissions);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSymptoms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Test - All Symptoms Submissions</h2>
      <ul>
        {symptomsData.map((item) => (
          <li key={item.submission_id}>
            <strong>Patient ID:</strong> {item.patient_id} <br />
            <strong>Symptoms:</strong> {item.symptoms.join(', ')} <br />
            <strong>Status:</strong> {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestSymptomsView;