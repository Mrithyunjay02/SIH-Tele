<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all necessary pages and components
import LoginPage from './pages/Login.jsx';
import DoctorLayout from './pages/doctor/DoctorDashboard.jsx'; // This is the main layout with the sidebar
import DashboardOverview from './pages/doctor/DashboardOverview.jsx'; // This is the main dashboard content
import AppointmentsPage from './pages/doctor/AppointmentsPage.jsx';
import PatientsPage from './pages/doctor/PatientsPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from './pages/ResetPassword';
>>>>>>> a897f2986e788b9057e6e7cd7c12591748942da2

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
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

=======
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Role-Based Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        {/* Unauthorized Route */}
        <Route
          path="/unauthorized"
          element={
            <div className="flex items-center justify-center min-h-screen bg-red-100">
              <h1 className="text-4xl font-bold text-red-600">
                Unauthorized Access
              </h1>
            </div>
          }
        />
>>>>>>> a897f2986e788b9057e6e7cd7c12591748942da2
      </Routes>
    </Router>
  );
}

export default App;
<<<<<<< HEAD

=======
>>>>>>> a897f2986e788b9057e6e7cd7c12591748942da2
