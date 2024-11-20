import React from 'react';
import Navbar from './components/Navbar';
import BookedAppointments from './components/BookedAppointments';
import ChatbotComponent from './components/ChatbotComponent';
import DoctorDashboard from './pages/DoctorDashboard';


function Appointment() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<DoctorDashboard />}/>
        </Routes>
      </Router>
      <BookedAppointments />
      <ChatbotComponent/>
    </div>
  );
}

export default Appointment;