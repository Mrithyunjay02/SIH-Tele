import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  // 1. Check if a token exists at all.
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token, redirect to the login page immediately.
    return <Navigate to="/login" />;
  }

  // 2. Get the full user object from localStorage and parse it.
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // 3. Check if the user's role is included in the list of allowed roles.
  // This is the key fix: It correctly reads `user.role`.
  if (user && allowedRoles && allowedRoles.includes(user.role)) {
    // If the role matches, show the component (e.g., the dashboard).
    return children;
  } else {
    // If the role does not match, redirect to an "unauthorized" page.
    // You can create this page or simply redirect back to login.
    return <Navigate to="/login" />; 
  }
};

export default PrivateRoute;
