import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: API_URL,
});

export const loginUser = (credentials) => apiClient.post('/login', credentials);

// --- MODIFIED FUNCTION ---
// This function now manually gets the token and adds it to the request header.
export const getDoctorData = () => {
  const token = localStorage.getItem('token');
  
  return apiClient.get('/doctor/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};