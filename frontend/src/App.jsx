import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // <-- IMPORT THE PROVIDER

// Import all your pages and components
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
// --- THIS IS THE FIX ---
// The file acting as the layout is named DoctorDashboard.jsx
import DoctorLayout from './pages/doctor/DoctorDashboard.jsx'; 
import DashboardOverview from './pages/doctor/DashboardOverview.jsx';
import AppointmentsPage from './pages/doctor/AppointmentsPage.jsx';
import PatientsPage from './pages/doctor/PatientsPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    // Wrap the entire Router with the ThemeProvider.
    // This makes the theme available to all routes and components.
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
    </ThemeProvider>
  );
}

export default App;

