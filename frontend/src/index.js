import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Imports the main stylesheet for Tailwind CSS
import App from './App.jsx'; // Imports your main App component with all the routes

// 1. Find the root element in your public/index.html file.
const rootElement = document.getElementById('root');

// 2. Create a React root to manage rendering the app.
const root = ReactDOM.createRoot(rootElement);

// 3. Render your main App component into the root element.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

