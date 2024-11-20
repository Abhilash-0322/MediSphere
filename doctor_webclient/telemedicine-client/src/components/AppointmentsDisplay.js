
// import React, { useState, useEffect } from 'react';

// const AppointmentsDisplay = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     appointment_id: '',
//     medicine_name: '',
//     dose: '',
//     frequency: '',
//     duration: '',
//     instructions: ''
//   });

//   const styles = {
//     container: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '20px',
//       fontFamily: 'Arial, sans-serif'
//     },
//     header: {
//       marginBottom: '20px'
//     },
//     cardsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//       gap: '20px',
//       padding: '20px 0'
//     },
//     card: {
//       backgroundColor: 'white',
//       borderRadius: '8px',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//       padding: '20px',
//       transition: 'transform 0.2s',
//       cursor: 'pointer'
//     },
//     statusBadge: {
//       padding: '6px 12px',
//       borderRadius: '16px',
//       fontSize: '14px',
//       display: 'inline-block',
//       marginBottom: '10px'
//     },
//     button: {
//       backgroundColor: '#3b82f6',
//       color: 'white',
//       border: 'none',
//       padding: '8px 16px',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       marginTop: '10px'
//     },
//     modal: {
//       position: 'fixed',
//       top: '0',
//       left: '0',
//       right: '0',
//       bottom: '0',
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1000
//     },
//     modalContent: {
//       backgroundColor: 'white',
//       padding: '30px',
//       borderRadius: '8px',
//       maxWidth: '500px',
//       width: '90%',
//       maxHeight: '90vh',
//       overflow: 'auto'
//     },
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '15px'
//     },
//     textarea: {
//       padding: '8px',
//       border: '1px solid #ddd',
//       borderRadius: '4px',
//       fontSize: '16px',
//       minHeight: '100px',
//       width: '100%',
//       boxSizing: 'border-box'
//     },
//     closeButton: {
//       backgroundColor: '#ef4444',
//       color: 'white',
//       border: 'none',
//       padding: '8px 16px',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       marginRight: '10px'
//     },
//     label: {
//       fontWeight: 'bold',
//       marginBottom: '5px',
//       display: 'block'
//     },
//     errorMessage: {
//       color: '#ef4444',
//       fontSize: '14px',
//       marginTop: '5px'
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/test/symptoms', {
//         headers: {
//           'Authorization': 'Bearer sample token'
//         }
//       });
//       if (!response.ok) throw new Error('Failed to fetch appointments');
//       const data = await response.json();
//       setAppointments(data.appointments);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitPrescription = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8000/prescriptions/submit', {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Bearer sample token',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(prescriptionData)
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to submit prescription');
//       }
      
//       const result = await response.json();
//       alert('Prescription submitted successfully!');
//       setSelectedAppointment(null);
//       setPrescriptionData({
//         appointment_id: '',
//         prescription_details: '',
//         doctor_notes: ''
//       });
      
//       // Refresh appointments to show updated status
//       fetchAppointments();
//     } catch (err) {
//       alert('Error submitting prescription: ' + err.message);
//     }
//   };

//   const getStatusStyle = (status) => {
//     const baseStyle = styles.statusBadge;
//     const statusColors = {
//       prescribed: { backgroundColor: '#dcfce7', color: '#166534' },
//       confirmed: { backgroundColor: '#dbeafe', color: '#1e40af' },
//       pending: { backgroundColor: '#fef9c3', color: '#854d0e' },
//       default: { backgroundColor: '#f3f4f6', color: '#374151' }
//     };

//     return { ...baseStyle, ...statusColors[status?.toLowerCase() || 'default'] };
//   };

//   const handleAppointmentSelect = (appointment) => {
//     setSelectedAppointment(appointment);
//     setPrescriptionData({
//       appointment_id: appointment.appointment_id,
//       prescription_details: '',
//       doctor_notes: ''
//     });
//   };

//   if (loading) return <div style={styles.container}>Loading appointments...</div>;
//   if (error) return <div style={styles.container}>Error: {error}</div>;

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1>Appointments ({appointments.length})</h1>
//       </div>

//       <div style={styles.cardsGrid}>
//         {appointments.map((appointment) => (
//           <div 
//             key={appointment.appointment_id}
//             style={styles.card}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             <span style={getStatusStyle(appointment.status)}>
//               {appointment.status || 'Pending'}
//             </span>
//             <h3>{appointment.name || 'N/A'}</h3>
//             <p>ID: {appointment.appointment_id.slice(0, 8)}...</p>
//             <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
//             <p>Age: {appointment.gender || 'N/A'}</p>
//             <p>Mobile: {appointment.mobile.slice(0, 8)}...</p>
//             <button 
//               style={styles.button}
//               onClick={() => handleAppointmentSelect(appointment)}
//             >
//               View Details & Prescribe
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedAppointment && (
//         <div style={styles.modal}>
//           <div style={styles.modalContent}>
//             <h2>Appointment Details</h2>
//             <div style={{ marginBottom: '20px' }}>
//               <p><strong>Patient:</strong> {selectedAppointment.name}</p>
//               <p><strong>ID:</strong> {selectedAppointment.appointment_id}</p>
//               <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
//               <p><strong>Age:</strong> {selectedAppointment.gender}</p>
//               <p><strong>Mobile:</strong> {selectedAppointment.mobile}</p>
//               <p><strong>Status:</strong> {selectedAppointment.status}</p>
//             </div>

//             <h3>Prescribe Medicine</h3>
//             <form style={styles.form} onSubmit={submitPrescription}>
//               <div>
//                 <label style={styles.label}>Prescription Details</label>
//                 <textarea
//                   style={styles.textarea}
//                   value={prescriptionData.prescription_details}
//                   onChange={(e) => setPrescriptionData({
//                     ...prescriptionData,
//                     prescription_details: e.target.value
//                   })}
//                   placeholder="Enter medicine details, dosage, and duration"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label style={styles.label}>Doctor's Notes</label>
//                 <textarea
//                   style={styles.textarea}
//                   value={prescriptionData.doctor_notes}
//                   onChange={(e) => setPrescriptionData({
//                     ...prescriptionData,
//                     doctor_notes: e.target.value
//                   })}
//                   placeholder="Enter any additional notes or instructions"
//                   required
//                 />
//               </div>

//               <div>
//                 <button 
//                   type="button" 
//                   style={styles.closeButton}
//                   onClick={() => setSelectedAppointment(null)}
//                 >
//                   Close
//                 </button>
//                 <button type="submit" style={styles.button}>
//                   Submit Prescription
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentsDisplay;

// import React, { useState, useEffect } from 'react';
// import './AppointmentsDisplay.css';

// const AppointmentsDisplay = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [submissionError, setSubmissionError] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     appointment_id: '',
//     medicine_name: '',
//     dose: '',
//     frequency: '',
//     duration: '',
//     instructions: ''
//   });

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/test/symptoms', {
//         headers: {
//           'Authorization': 'Bearer sample token'
//         }
//       });
//       if (!response.ok) throw new Error('Failed to fetch appointments');
//       const data = await response.json();
//       setAppointments(data.appointments);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitPrescription = async (e) => {
//     e.preventDefault();
//     setSubmissionError(null);
    
//     // Validate required fields
//     const requiredFields = ['medicine_name', 'dose', 'frequency', 'duration', 'instructions'];
//     const missingFields = requiredFields.filter(field => !prescriptionData[field]);
    
//     if (missingFields.length > 0) {
//       setSubmissionError(`Please fill in all required fields: ${missingFields.join(', ')}`);
//       return;
//     }

//     try {
//       console.log('Submitting Prescription Data:', prescriptionData);
      
//       const response = await fetch('http://localhost:8000/prescriptions/submit', {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Bearer sample token',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...prescriptionData,
//           created_at: new Date().toISOString().split('T')[0]
//         })
//       });
      
//       const responseData = await response.json();
      
//       if (!response.ok) {
//         console.error('Submission Error Response:', responseData);
//         throw new Error(responseData.detail || 'Failed to submit prescription');
//       }
      
//       alert('Prescription submitted successfully!');
//       setSelectedAppointment(null);
//       setPrescriptionData({
//         appointment_id: '',
//         medicine_name: '',
//         dose: '',
//         frequency: '',
//         duration: '',
//         instructions: ''
//       });
      
//       fetchAppointments();
//     } catch (err) {
//       console.error('Prescription Submission Error:', err);
//       setSubmissionError(err.message || 'An unexpected error occurred');
//     }
//   };

//   const getStatusStyle = (status) => {
//     const statusColors = {
//       prescribed: 'status-green',
//       confirmed: 'status-blue',
//       pending: 'status-yellow',
//       default: 'status-gray'
//     };

//     return statusColors[status?.toLowerCase() || 'default'];
//   };

//   const handleAppointmentSelect = (appointment) => {
//     setSelectedAppointment(appointment);
//     setSubmissionError(null);
//     setPrescriptionData({
//       appointment_id: appointment.appointment_id,
//       medicine_name: '',
//       dose: '',
//       frequency: '',
//       duration: '',
//       instructions: ''
//     });
//   };

//   if (loading) return <div className="loading">Loading appointments...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="container">
//       <div className="header">
//         <h1>Appointments ({appointments.length})</h1>
//       </div>

//       <div className="appointments-grid">
//         {appointments.map((appointment) => (
//           <div key={appointment.appointment_id} className="card">
//             <div className={`status ${getStatusStyle(appointment.status)}`}>
//               {appointment.status || 'Pending'}
//             </div>
//             <div className="card-header">
//               <h2>{appointment.name || 'N/A'}</h2>
//             </div>
//             <div className="card-content">
//               <p>ID: {appointment.appointment_id.slice(0, 8)}...</p>
//               <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
//               <p>Age: {appointment.gender || 'N/A'}</p>
//               <p>Mobile: {appointment.mobile.slice(0, 8)}...</p>
//               <button onClick={() => handleAppointmentSelect(appointment)}>
//                 View Details & Prescribe
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedAppointment && (
//         <div className="modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Appointment Details</h2>
//               <div className="appointment-details">
//                 <p><strong>Patient:</strong> {selectedAppointment.name}</p>
//                 <p><strong>ID:</strong> {selectedAppointment.appointment_id}</p>
//                 <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
//                 <p><strong>Age:</strong> {selectedAppointment.gender}</p>
//                 <p><strong>Mobile:</strong> {selectedAppointment.mobile}</p>
//                 <p><strong>Status:</strong> {selectedAppointment.status}</p>
//               </div>
//             </div>

//             <div className="prescription-section">
//               <h3>Prescribe Medicine</h3>
//               {submissionError && (
//                 <div className="error-message">
//                   {submissionError}
//                 </div>
//               )}
//               <form onSubmit={submitPrescription}>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label>Medicine Name</label>
//                     <input
//                       value={prescriptionData.medicine_name}
//                       onChange={(e) => setPrescriptionData({
//                         ...prescriptionData,
//                         medicine_name: e.target.value
//                       })}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Dose</label>
//                     <input
//                       value={prescriptionData.dose}
//                       onChange={(e) => setPrescriptionData({
//                         ...prescriptionData,
//                         dose: e.target.value
//                       })}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label>Frequency</label>
//                     <input
//                       value={prescriptionData.frequency}
//                       onChange={(e) => setPrescriptionData({
//                         ...prescriptionData,
//                         frequency: e.target.value
//                       })}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Duration</label>
//                     <input
//                       value={prescriptionData.duration}
//                       onChange={(e) => setPrescriptionData({
//                         ...prescriptionData,
//                         duration: e.target.value
//                       })}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Instructions</label>
//                   <textarea
//                     value={prescriptionData.instructions}
//                     onChange={(e) => setPrescriptionData({
//                       ...prescriptionData,
//                       instructions: e.target.value
//                     })}
//                     placeholder="Enter any additional instructions"
//                     required
//                   />
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     className="btn-cancel"
//                     onClick={() => setSelectedAppointment(null)}
//                   >
//                     Close
//                   </button>
//                   <button className="btn-submit">
//                     Submit Prescription
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentsDisplay;



// import React, { useState, useEffect } from 'react';
// import './AppointmentsDisplay.css';

// const AppointmentsDisplay = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [submissionError, setSubmissionError] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     appointment_id: '',
//     medicine_name: '',
//     dose: '',
//     frequency: '',
//     duration: '',
//     instructions: ''
//   });

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/test/symptoms', {
//         headers: {
//           'Authorization': 'Bearer sample token'
//         }
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to fetch appointments: ${errorText}`);
//       }
      
//       const data = await response.json();
//       console.log('Fetched Appointments:', JSON.stringify(data, null, 2));
//       setAppointments(data.appointments || []);
//     } catch (err) {
//       console.error('Fetch Appointments Error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitPrescription = async (e) => {
//     e.preventDefault();
//     setSubmissionError(null);
    
//     // Validate required fields
//     const requiredFields = ['medicine_name', 'dose', 'frequency', 'duration', 'instructions'];
//     const missingFields = requiredFields.filter(field => !prescriptionData[field]);
    
//     if (missingFields.length > 0) {
//       setSubmissionError(`Please fill in all required fields: ${missingFields.join(', ')}`);
//       return;
//     }

//     try {
//       console.log('Submitting Prescription Data:', JSON.stringify(prescriptionData, null, 2));
      
//       const preparedData = {
//         ...prescriptionData,
//         appointment_id: selectedAppointment.appointment_id,
//         created_at: new Date().toISOString().split('T')[0]
//       };

//       const response = await fetch('http://localhost:8000/prescriptions/submit', {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Bearer sample token',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(preparedData)
//       });
      
//       // Improved error handling
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Submission Error Response:', errorText);
//         throw new Error(errorText || 'Failed to submit prescription');
//       }
      
//       const responseData = await response.json();
//       console.log('Submission Success:', JSON.stringify(responseData, null, 2));
      
//       alert('Prescription submitted successfully!');
//       setSelectedAppointment(null);
//       setPrescriptionData({
//         appointment_id: '',
//         medicine_name: '',
//         dose: '',
//         frequency: '',
//         duration: '',
//         instructions: ''
//       });
      
//       fetchAppointments();
//     } catch (err) {
//       console.error('Prescription Submission Error:', err);
//       setSubmissionError(err.message || 'An unexpected error occurred');
//     }
//   };

//   const getStatusStyle = (status) => {
//     const statusColors = {
//       prescribed: 'status-green',
//       confirmed: 'status-blue',
//       pending: 'status-yellow',
//       default: 'status-gray'
//     };

//     return statusColors[status?.toLowerCase() || 'default'];
//   };

//   const handleAppointmentSelect = (appointment) => {
//     setSelectedAppointment(appointment);
//     setSubmissionError(null);
//     setPrescriptionData({
//       medicine_name: '',
//       dose: '',
//       frequency: '',
//       duration: '',
//       instructions: ''
//     });
//   };

//   if (loading) return <div className="loading">Loading appointments...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="container">
//       <div className="header">
//         <h1>Appointments ({appointments.length})</h1>
//       </div>

//       <div className="appointments-grid">
//         {appointments.map((appointment) => (
//           <div key={appointment.appointment_id} className="card">
//             <div className={`status ${getStatusStyle(appointment.status)}`}>
//               {appointment.status || 'Pending'}
//             </div>
//             <div className="card-header">
//               <h2>{appointment.name || 'N/A'}</h2>
//             </div>
//             <div className="card-content">
//               <p>ID: {appointment.appointment_id.slice(0, 8)}...</p>
//               <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
//               <p>Age: {appointment.gender || 'N/A'}</p>
//               <p>Mobile: {appointment.mobile.slice(0, 8)}...</p>
//               <button onClick={() => handleAppointmentSelect(appointment)}>
//                 View Details & Prescribe
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedAppointment && (
//         <div className="modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Appointment Details</h2>
//               <div className="appointment-details">
//                 <p><strong>Patient:</strong> {selectedAppointment.name}</p>
//                 <p><strong>ID:</strong> {selectedAppointment.appointment_id}</p>
//                 <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
//                 <p><strong>Age:</strong> {selectedAppointment.gender}</p>
//                 <p><strong>Mobile:</strong> {selectedAppointment.mobile}</p>
//                 <p><strong>Status:</strong> {selectedAppointment.status}</p>
//               </div>
//             </div>

//             <div className="prescription-section">
//               <h3>Prescribe Medicine</h3>
//               {submissionError && (
//                 <div className="error-message">
//                   {submissionError}
//                 </div>
//               )}
//               <form onSubmit={submitPrescription}>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label>Medicine Name</label>
//                     <input
//                       value={prescriptionData.medicine_name}
//                       onChange={(e) => setPrescriptionData({
//                         ...prescriptionData,
//                         medicine_name: e.target.value
//                       })}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Dose</label>
//                     <input
//                       value={prescriptionData.dose}
//                       onChange={(e) => setPrescriptionData({
//                         ...prescriptionData,
//                         dose: e.target.value
//                       })}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label>Frequency</label>
//                     <input
//                       value={prescriptionData.frequency}
//                       onChange={(e) => setPrescriptionData({
//                         ...prescriptionData,
//                         frequency: e.target.value
//                       })}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Duration</label>
//                     <input
//                       value={prescriptionData.duration}
//                       onChange={(e) => setPrescriptionData({
//                         ...prescriptionData,
//                         duration: e.target.value
//                       })}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Instructions</label>
//                   <textarea
//                     value={prescriptionData.instructions}
//                     onChange={(e) => setPrescriptionData({
//                       ...prescriptionData,
//                       instructions: e.target.value
//                     })}
//                     placeholder="Enter any additional instructions"
//                     required
//                   />
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     className="btn-cancel"
//                     onClick={() => setSelectedAppointment(null)}
//                   >
//                     Close
//                   </button>
//                   <button className="btn-submit">
//                     Submit Prescription
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentsDisplay;


import React, { useState, useEffect } from 'react';
import './AppointmentsDisplay.css';

const AppointmentsDisplay = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    medicine_name: '',
    dose: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/test/symptoms', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'sample_token'}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch appointments: ${errorText}`);
      }
      
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error('Fetch Appointments Error:', err);
      setError(err.message || 'Unable to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const submitPrescription = async (e) => {
    e.preventDefault();
    setSubmissionError(null);
    setIsSubmitting(true);
    
    // Validate all required fields
    const requiredFields = ['medicine_name', 'dose', 'frequency', 'duration', 'instructions'];
    const missingFields = requiredFields.filter(field => !prescriptionData[field].trim());
    
    if (missingFields.length > 0 || !selectedAppointment) {
      setSubmissionError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const preparedData = {
        appointment_id: selectedAppointment.appointment_id,
        medicine_name: prescriptionData.medicine_name.trim(),
        dose: prescriptionData.dose.trim(),
        frequency: prescriptionData.frequency.trim(),
        duration: prescriptionData.duration.trim(),
        instructions: prescriptionData.instructions.trim()
      };

      console.log('Prepared Prescription Data:', JSON.stringify(preparedData, null, 2));

      const response = await fetch('http://localhost:8000/prescriptions/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'sample_token'}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preparedData)
      });
      
      // Log full response for debugging
      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error(`Server response is not valid JSON: ${responseText}`);
      }
      
      if (!response.ok) {
        // Extract error message, falling back to generic error
        const errorMessage = responseData.detail || 
                             responseData.message || 
                             'Prescription submission failed';
        throw new Error(errorMessage);
      }
      
      console.log('Prescription Submission Success:', responseData);
      
      // Success handling
      alert('Prescription submitted successfully!');
      
      // Reset form and states
      setSelectedAppointment(null);
      setPrescriptionData({
        medicine_name: '',
        dose: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
      
      // Refresh appointments
      fetchAppointments();
    } catch (err) {
      console.error('Prescription Submission Error:', {
        message: err.message,
        stack: err.stack
      });
      
      setSubmissionError(err.message || 'An unexpected error occurred during prescription submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusStyle = (status) => {
    const statusColors = {
      prescribed: 'status-green',
      confirmed: 'status-blue',
      pending: 'status-yellow',
      default: 'status-gray'
    };

    return statusColors[status?.toLowerCase() || 'default'];
  };

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setSubmissionError(null);
    setPrescriptionData({
      medicine_name: '',
      dose: '',
      frequency: '',
      duration: '',
      instructions: ''
    });
  };

  const handleInputChange = (field, value) => {
    setPrescriptionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>🩺 Appointments ({appointments.length})</h1>
      </div>

      <div className="appointments-grid">
        {appointments.map((appointment) => (
          <div key={appointment.appointment_id} className="card">
            <div className={`status ${getStatusStyle(appointment.status)}`}>
              {appointment.status || 'Pending'}
            </div>
            <div className="card-header">
              <h2>{appointment.name || 'N/A'}</h2>
            </div>
            <div className="card-content">
              <p>ID: {appointment.appointment_id.slice(0, 8)}...</p>
              <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
              <p>Age: {appointment.gender || 'N/A'}</p>
              <p>Mobile: {appointment.mobile.slice(0, 8)}...</p>
              <button onClick={() => handleAppointmentSelect(appointment)}>
                View Details & Prescribe
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAppointment && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Appointment Details</h2>
              <div className="appointment-details">
                <p><strong>Patient:</strong> {selectedAppointment.name}</p>
                <p><strong>ID:</strong> {selectedAppointment.appointment_id}</p>
                <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
                <p><strong>Age:</strong> {selectedAppointment.gender}</p>
                <p><strong>Mobile:</strong> {selectedAppointment.mobile}</p>
                <p><strong>Status:</strong> {selectedAppointment.status}</p>
              </div>
            </div>

            <div className="prescription-section">
              <h3>Prescribe Medicine</h3>
              {submissionError && (
                <div className="error-message">
                  {submissionError}
                </div>
              )}
              <form onSubmit={submitPrescription}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Medicine Name</label>
                    <input
                      value={prescriptionData.medicine_name}
                      onChange={(e) => handleInputChange('medicine_name', e.target.value)}
                      placeholder="Enter medicine name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Dose</label>
                    <input
                      value={prescriptionData.dose}
                      onChange={(e) => handleInputChange('dose', e.target.value)}
                      placeholder="Enter dosage"
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Frequency</label>
                    <input
                      value={prescriptionData.frequency}
                      onChange={(e) => handleInputChange('frequency', e.target.value)}
                      placeholder="e.g., Twice daily"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      value={prescriptionData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="e.g., 7 days"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Instructions</label>
                  <textarea
                    value={prescriptionData.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    placeholder="Enter any additional instructions"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setSelectedAppointment(null)}
                    disabled={isSubmitting}
                  >
                    Close
                  </button>
                  <button 
                    type="submit" 
                    className="btn-submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Prescription'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsDisplay;