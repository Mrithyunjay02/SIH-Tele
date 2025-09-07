import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all necessary pages and components
import LoginPage from './pages/Login.jsx';
import DoctorLayout from './pages/doctor/DoctorDashboard.jsx'; // This is the main layout with the sidebar
import DashboardOverview from './pages/doctor/DashboardOverview.jsx'; // This is the main dashboard content
import AppointmentsPage from './pages/doctor/AppointmentsPage.jsx';
import PatientsPage from './pages/doctor/PatientsPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes that anyone can access */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />

        {/* This is the new nested routing structure.
          All doctor-related pages will be rendered inside the DoctorLayout component.
        */}
        <Route 
          path="/doctor" 
          element={<PrivateRoute allowedRoles={['doctor']}><DoctorLayout /></PrivateRoute>}
        >
          {/* When the user navigates to "/doctor/dashboard", the DashboardOverview component is shown */}
          <Route path="dashboard" element={<DashboardOverview />} /> 
          
          {/* Other pages that will also appear inside the layout */}
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="patients" element={<PatientsPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

