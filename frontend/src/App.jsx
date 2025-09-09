import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all necessary pages and components
import LoginPage from './pages/Login.jsx';
import DoctorLayout from './pages/doctor/DoctorDashboard.jsx'; // DoctorDashboard acts as the layout
import DashboardOverview from './pages/doctor/DashboardOverview.jsx';
import AppointmentsPage from './pages/doctor/AppointmentsPage.jsx';
import PatientsPage from './pages/doctor/PatientsPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />

        {/* Nested Doctor Routes */}
        <Route 
          path="/doctor" 
          element={<PrivateRoute allowedRoles={['doctor']}><DoctorLayout /></PrivateRoute>}
        >
          <Route path="dashboard" element={<DashboardOverview />} /> 
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="patients" element={<PatientsPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

