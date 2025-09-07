<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

// Re-using the professional UI from before
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

const LoginPage = () => {
  const [email, setEmail] = useState('test@test.com'); // Pre-filled for convenience
  const [password, setPassword] = useState('password'); // Pre-filled for convenience
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data;

      // THIS IS THE CRUCIAL PART
      console.log("Login successful, saving token:", token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        setError('Login successful, but role is not doctor.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
=======
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/login", {
        email,
        password,
      });
      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "patient") {
        navigate("/patient");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const backendError = error.response.data.error;
        if (backendError === "Email does not exist") {
          setError("The email you entered does not exist.");
        } else if (backendError === "Incorrect password") {
          setError("The password you entered is incorrect.");
        } else {
          setError("Invalid email or password. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotPasswordMessage("");
    setIsLoading(true);
    try {
      await axios.post("http://127.0.0.1:5000/api/auth/forgot-password", {
        email: forgotPasswordEmail,
      });
      setForgotPasswordMessage("A password reset link has been sent to your email.");
    } catch (error) {
      console.error("Forgot password failed:", error.response?.data || error.message);
      setForgotPasswordMessage("Failed to send reset link. Please check the email and try again.");
>>>>>>> a897f2986e788b9057e6e7cd7c12591748942da2
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden"><div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-teal-500 text-white p-12 flex flex-col justify-between"><div><h1 className="text-4xl font-bold mb-4">Sehat Saathi</h1><p className="text-lg leading-relaxed">Your Health Companion. Bridging the gap in rural healthcare through technology, providing accessible consultations and secure health records for everyone.</p></div><div className="mt-8"><p className="text-sm font-light">© 2025 Smart India Hackathon</p></div></div><div className="md:w-1/2 bg-white p-12"><h2 className="text-3xl font-bold text-gray-800 mb-2">Secure Login</h2><p className="text-gray-500 mb-8">Welcome back, please enter your details.</p><form onSubmit={handleLogin} className="space-y-6"><div><label className="block text-sm font-medium text-gray-700">Email Address</label><div className="mt-1 relative rounded-md shadow-sm"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div></div><div><label className="block text-sm font-medium text-gray-700">Password</label><div className="mt-1 relative rounded-md shadow-sm"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div></div>{error && <p className="text-sm text-red-600 text-center">{error}</p>}<div><button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed">{isLoading ? 'Signing In...' : 'Sign In'}</button></div></form></div></div></div>
  );
};

export default LoginPage;

=======
    <div className="flex min-h-screen bg-white">
      {/* Left side: Graphics & Branding (Hidden on smaller screens) */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Branding Content */}
        <div className="text-center text-white relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" />
          </svg>
          <h1 className="text-6xl font-extrabold mb-4">HealthLink</h1>
          <p className="text-xl max-w-md mx-auto">
            Your secure and seamless connection to healthcare services.
          </p>
        </div>
      </div>
      
      {/* Right side: Login/Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {!isForgotPassword ? (
            // Login Form
            <>
              <h2 className="text-5xl font-extrabold mb-8 text-center text-gray-900 tracking-tight lg:text-left">
                Welcome Back!
              </h2>
              <p className="text-center text-gray-600 mb-10 text-lg lg:text-left">
                Log in to manage your healthcare journey.
              </p>
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold text-lg mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-semibold text-lg mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center font-medium animate-shake">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 text-xl font-bold flex items-center justify-center ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex justify-between items-center text-sm font-medium text-gray-600 mt-4">
                  <span className="cursor-pointer text-blue-600 hover:underline" onClick={() => setIsForgotPassword(true)}>
                    Forgot password?
                  </span>
                </div>
              </form>
            </>
          ) : (
            // Forgot Password Form
            <>
              <h2 className="text-5xl font-extrabold mb-8 text-center text-gray-900 tracking-tight lg:text-left">
                Forgot Password
              </h2>
              <p className="text-center text-gray-600 mb-10 text-lg lg:text-left">
                Enter your email to receive a password reset link.
              </p>
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                <div>
                  <label htmlFor="forgot-email" className="block text-gray-700 font-semibold text-lg mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="your.email@example.com"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                  />
                </div>
                {forgotPasswordMessage && (
                  <div className={`px-4 py-3 rounded-lg text-center font-medium ${
                      forgotPasswordMessage.includes("sent") ? "bg-green-100 text-green-700 border border-green-400" : "bg-red-100 text-red-700 border border-red-400"
                    }`}>
                    {forgotPasswordMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 text-xl font-bold flex items-center justify-center ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="w-full text-blue-600 font-semibold mt-4 hover:underline transition-colors duration-200"
                >
                  &larr; Back to Login
                </button>
              </form>
            </>
          )}
          <p className="text-center mt-8 text-gray-600 text-lg lg:text-left">
            {!isForgotPassword ? (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline font-semibold hover:text-indigo-700 transition-colors duration-200">
                  Register here
                </Link>
              </>
            ) : (
              null
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
>>>>>>> a897f2986e788b9057e6e7cd7c12591748942da2
