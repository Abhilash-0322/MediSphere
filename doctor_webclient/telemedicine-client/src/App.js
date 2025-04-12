import React from 'react';
import Navbar from './components/Navbar';
// import DoctorList from './components/DoctorList';
// import DoctorDashboard from './pages/DoctorDashboard';
// import DoctorAppointments from './components/DoctorAppointments';
// import TestSymptomsView from './components/TestSymptomsView';
// import BookedAppointments from './components/BookedAppointments';
import ChatbotComponent from './components/ChatbotComponent';
import DoctorDashboard from './pages/DoctorDashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AppointmentsDisplay from './components/AppointmentsDisplay';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>  
        <Routes>
          <Route path="/" element={<DoctorDashboard />} />
          <Route path="/booked-appointments" element={<AppointmentsDisplay/>}/>
        </Routes>
      </Router>
      <ChatbotComponent/>
    </div>
  );
}

export default App;