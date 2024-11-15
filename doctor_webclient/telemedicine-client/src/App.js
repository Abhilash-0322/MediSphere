import React from 'react';
import Navbar from './components/Navbar';
// import DoctorList from './components/DoctorList';
// import DoctorDashboard from './pages/DoctorDashboard';
// import DoctorAppointments from './components/DoctorAppointments';
// import TestSymptomsView from './components/TestSymptomsView';
import BookedAppointments from './components/BookedAppointments';
import ChatbotComponent from './components/ChatbotComponent';

function App() {
  return (
    <div className="App">
      {/* <h1>Telemedicine Client</h1> */}
      <Navbar />
      {/* <DoctorAppointments/> */}
      {/* <DoctorDashboard /> */}
      {/* <TestSymptomsView /> */}
      <BookedAppointments />
      <ChatbotComponent/>
    </div>
  );
}

export default App;