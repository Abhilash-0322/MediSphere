import React from 'react';
// import DoctorList from './components/DoctorList';
import DoctorDashboard from './pages/DoctorDashboard';
import TestSymptomsView from './components/TestSymptomsView';

function App() {
  return (
    <div className="App">
      <h1>Telemedicine Client</h1>
      <DoctorDashboard />
      <TestSymptomsView />
    </div>
  );
}

export default App;