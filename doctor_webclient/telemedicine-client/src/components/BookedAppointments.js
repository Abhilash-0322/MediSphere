// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BookedAppointments = () => {
//     const [symptomsData, setSymptomsData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Function to fetch symptoms data from the backend
//         const fetchSymptomsData = async () => {
//             try {
//                 const token = 'Bearer sample-token'; // Replace with your actual token
//                 const response = await axios.get('http://127.0.0.1:8000/test/symptoms', {
//                     headers: {
//                         Authorization: token,
//                     },
//                 });
//                 setSymptomsData(response.data.submissions || []);
//             } catch (err) {
//                 console.error('Error fetching symptoms:', err);
//                 setError('Failed to fetch data.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSymptomsData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>Booked Appointments</h2>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//                 {symptomsData.length > 0 ? (
//                     symptomsData.map((entry) => (
//                         <div
//                             key={entry.submission_id}
//                             style={{
//                                 border: '1px solid #ccc',
//                                 borderRadius: '8px',
//                                 padding: '15px',
//                                 maxWidth: '300px',
//                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                             }}
//                         >
//                             <h3>Patient ID: {entry.patient_id}</h3>
//                             <p><strong>Submission ID:</strong> {entry.submission_id}</p>
//                             <p><strong>Symptoms:</strong></p>
//                             <ul>
//                                 {entry.symptoms.map((symptom, index) => (
//                                     <li key={index}>{symptom}</li>
//                                 ))}
//                             </ul>
//                             <p style={{color:'lime'}}><strong>Status:</strong> {entry.status}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No symptoms submissions found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BookedAppointments;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Main Appointments List Component
const BookedAppointments = () => {
  const [symptomsData, setSymptomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchSymptomsData = async () => {
      try {
        const token = 'Bearer sample-token';
        const response = await axios.get('http://127.0.0.1:8000/test/symptoms', {
          headers: { Authorization: token },
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={styles.container}>
      {!showDetails ? (
        <AppointmentsList 
          symptomsData={symptomsData}
          onViewDetails={(appointment) => {
            setSelectedAppointment(appointment);
            setShowDetails(true);
          }}
        />
      ) : (
        <AppointmentDetails
          appointment={selectedAppointment}
          onBack={() => {
            setShowDetails(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
};

// Appointment Card List Component
const AppointmentsList = ({ symptomsData, onViewDetails }) => {
  return (
    <div style={styles.listContainer}>
      <h2 style={styles.heading}>Booked Appointments</h2>
      <div style={styles.cardsGrid}>
        {symptomsData.length > 0 ? (
          symptomsData.map((entry) => (
            <AppointmentCard
              key={entry.submission_id}
              appointment={entry}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <p style={styles.noData}>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

// Individual Appointment Card Component
const AppointmentCard = ({ appointment, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      'pending': '#ffd700',
      'confirmed': '#90EE90',
      'completed': '#98FB98',
      'cancelled': '#FFB6C1'
    };
    return colors[status.toLowerCase()] || '#808080';
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Patient ID: {appointment.patient_id}</h3>
        <span style={{
          ...styles.status,
          backgroundColor: getStatusColor(appointment.status)
        }}>
          {appointment.status}
        </span>
      </div>
      
      <div style={styles.cardBody}>
        <p style={styles.submissionId}>
          <strong>Submission ID:</strong> {appointment.submission_id}
        </p>
        
        <div style={styles.symptomsSection}>
          <p style={styles.symptomsTitle}><strong>Reported Symptoms:</strong></p>
          <ul style={styles.symptomsList}>
            {appointment.symptoms.map((symptom, index) => (
              <li key={index} style={styles.symptomItem}>{symptom}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        style={styles.viewButton}
        onClick={() => onViewDetails(appointment)}
      >
        View Details
      </button>
    </div>
  );
};

// Detailed Appointment View Component
const AppointmentDetails = ({ appointment, onBack }) => {
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add your actual API call here
      alert('Prescription saved successfully!');
    } catch (error) {
      alert('Failed to save prescription');
    } finally {
      setSaving(false);
    }
  };
  
//   try {
//     const response = await fetch(`/api/appointments/${appointment.appointment_id}/prescription`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer sample-token` // Assuming you store the token in localStorage
//       },
//       body: JSON.stringify({
//         appointment_id: appointment.appointment_id,
//         prescription_details: prescription,
//         doctor_notes: notes
//       })
//     });

//     if (!response.ok) {
//       throw new Error('Failed to save prescription');
//     }

//     const data = await response.json();
//     alert('Prescription saved successfully!');
    
//     // Optionally, you can clear the form or handle the response
//     // setPrescription('');
//     // setNotes('');
    
//   } catch (error) {
//     alert('Failed to save prescription: ' + error.message);
//   } finally {
//     setSaving(false);
//   }
// };

  return (
    <div style={styles.detailsContainer}>
      <button style={styles.backButton} onClick={onBack}>
        ← Back to Appointments
      </button>

      <div style={styles.detailsContent}>
        <div style={styles.patientInfo}>
          <h2 style={styles.detailsHeading}>Appointment Details</h2>
          <p><strong>Patient ID:</strong> {appointment.patient_id}</p>
          <p><strong>Submission ID:</strong> {appointment.submission_id}</p>
          <p><strong>Status:</strong> {appointment.status}</p>
          
          <div style={styles.symptomsDetail}>
            <h3>Reported Symptoms:</h3>
            <ul>
              {appointment.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.prescriptionForm}>
          <h3 style={styles.formHeading}>Prescription & Notes</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Prescription</label>
            <textarea
              style={styles.textarea}
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter prescription details..."
              rows={6}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Doctor's Notes</label>
            <textarea
              style={styles.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any additional notes..."
              rows={4}
            />
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Prescription'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div style={styles.loadingContainer}>
    <div style={styles.spinner}></div>
    <p>Loading appointments...</p>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div style={styles.errorContainer}>
    <p style={styles.errorMessage}>{message}</p>
  </div>
);

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  listContainer: {
    width: '100%',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  cardTitle: {
    margin: '0',
    fontSize: '18px',
    color: '#333',
  },
  status: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
  },
  cardBody: {
    marginBottom: '15px',
  },
  submissionId: {
    color: '#666',
    marginBottom: '10px',
  },
  symptomsSection: {
    marginTop: '10px',
  },
  symptomsTitle: {
    marginBottom: '8px',
  },
  symptomsList: {
    margin: '0',
    paddingLeft: '20px',
  },
  symptomItem: {
    marginBottom: '4px',
    color: '#555',
  },
  viewButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#6a1b9a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#8e24aa',
    },
  },
  detailsContainer: {
    marginTop: '40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #6a1b9a',
    borderRadius: '8px',
    color: '#6a1b9a',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#f3e5f5',
    },
  },
  detailsContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
  },
  patientInfo: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  detailsHeading: {
    color: '#333',
    marginBottom: '20px',
  },
  symptomsDetail: {
    marginTop: '20px',
  },
  prescriptionForm: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  formHeading: {
    color: '#333',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: '500',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical',
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#6a1b9a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#8e24aa',
    },
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #6a1b9a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    padding: '20px',
    backgroundColor: '#ffebee',
    borderRadius: '8px',
    marginTop: '20px',
  },
  errorMessage: {
    color: '#c62828',
    margin: 0,
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    padding: '40px',
  },
};

export default BookedAppointments;