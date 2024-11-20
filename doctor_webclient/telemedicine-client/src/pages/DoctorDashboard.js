
import React, { useState, useEffect } from 'react';
import BookedAppointments from '../components/BookedAppointments';
import PrescriptionViewer from '../components/PrescriptionViewer';

const styles = {
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f4f6f9',
    fontFamily: 'Arial, sans-serif',
    marginTop: '110px'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  profileAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  profileName: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#2c3e50'
  },
  profileRole: {
    margin: 0,
    color: '#7f8c8d',
    fontSize: '0.9rem'
  },
  navigationMenu: {
    display: 'flex',
    gap: '15px'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 15px',
    borderRadius: '8px',
    color: '#718096'
  },
  activeNavButton: {
    backgroundColor: '#3b82f6',
    color: 'white'
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    overflowY: 'auto'
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #edf2f7'
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

// Simulated icons (inline SVG)
const Icons = {
  Appointments: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Patients: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Prescriptions: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
  ),
  Notifications: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  )
};

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('appointments');
  const [dashboardData, setDashboardData] = useState({
    appointments: [],
    patients: [],
    prescriptions: [],
    notifications: []
  });

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // const token = localStorage.getItem('token');
        
        // Mock API calls - replace with actual endpoints
        const endpoints = [
          '/test/symptoms',
          '/patients',
          '/prescriptions',
          '/notifications'
        ];

        const results = await Promise.all(
          endpoints.map(endpoint => 
            fetch(endpoint, {
              headers: {
                'Authorization': `Bearer sample-token`,  // Replace with your token
              }
            }).then(res => res.json())
          )
        );

        setDashboardData({
          appointments: results[0],
          patients: results[1],
          prescriptions: results[2],
          notifications: results[3]
        });
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const renderSection = () => {
    switch(activeSection) {
      case 'appointments':
        return (
          <div style={styles.sectionContainer}>
            <h2>Recent Appointments</h2>
            {dashboardData.appointments.map(appointment => (
              <div key={appointment.id} style={styles.cardContainer}>
                <div>
                  <h3>Patient: {appointment.patientName}</h3>
                  <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                  <p>Status: {appointment.status}</p>
                </div>
                <button style={styles.actionButton}>View Details</button>
              </div>
            ))}
          </div>,
          <BookedAppointments/>
        );
      case 'patients':
        return (
          <div style={styles.sectionContainer}>
            <h2>Patient List</h2>
            {dashboardData.patients.map(patient => (
              <div key={patient.id} style={styles.cardContainer}>
                <div>
                  <h3>{patient.name}</h3>
                  <p>Age: {patient.age} | Gender: {patient.gender}</p>
                </div>
                <button style={styles.actionButton}>View Profile</button>
              </div>
            ))}
          </div>
        );
      case 'prescriptions':
        return (
          <div style={styles.sectionContainer}>
            <h2>Recent Prescriptions</h2>
            {dashboardData.prescriptions.map(prescription => (
              <div key={prescription.id} style={styles.cardContainer}>
                <div>
                  <h3>Patient: {prescription.patientName}</h3>
                  <p>Date: {new Date(prescription.date).toLocaleString()}</p>
                  <p>Medication: {prescription.medication}</p>
                </div>
                <button style={styles.actionButton}>View Prescription</button>
              </div>
            ))}
          </div>,
          <PrescriptionViewer/>
        );
      case 'notifications':
        return (
          <div style={styles.sectionContainer}>
            <h2>Notifications</h2>
            {dashboardData.notifications.map(notification => (
              <div key={notification.id} style={styles.cardContainer}>
                <div>
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <small>{new Date(notification.timestamp).toLocaleString()}</small>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.dashboardHeader}>
        <div style={styles.profileSection}>
          <div style={styles.profileAvatar}>DR</div>
          <div style={styles.profileInfo}>
            <h1 style={styles.profileName}>Dr. Smith</h1>
            <p style={styles.profileRole}>General Physician</p>
          </div>
        </div>
        <nav style={styles.navigationMenu}>
          {[
            { key: 'appointments', icon: Icons.Appointments, label: 'Appointments' },
            { key: 'patients', icon: Icons.Patients, label: 'Patients' },
            { key: 'prescriptions', icon: Icons.Prescriptions, label: 'Prescriptions' },
            { key: 'notifications', icon: Icons.Notifications, label: 'Notifications' }
          ].map(item => (
            <button 
              key={item.key}
              style={{
                ...styles.navButton,
                ...(activeSection === item.key ? styles.activeNavButton : {})
              }}
              onClick={() => setActiveSection(item.key)}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main style={styles.mainContent}>
        {renderSection()}
      </main>
    </div>
  );
};

export default DoctorDashboard;