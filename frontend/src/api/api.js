import axios from 'axios';

// IMPORTANT: This should be your running Python backend's address
const API_URL = 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: API_URL,
});

// This is an "interceptor". It runs before every single API request.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // DEBUG: Let's see if we are finding the token
    console.log("Interceptor found token:", token); 
    
    if (token) {
      // This line ensures the header is correctly formatted as "Bearer [token]"
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = (credentials) => apiClient.post('/login', credentials);

export const getDoctorData = () => apiClient.get('/doctor/dashboard');
