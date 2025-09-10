import React, { useState, useContext } from 'react'; // Import useContext
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { ThemeContext } from '../context/ThemeContext'; // Import the ThemeContext

// --- Helper Icon Components ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;

const translations = {
  en: {
    title: "Secure Login",
    subtitle: "Welcome back, please enter your details.",
    email: "Email Address",
    password: "Password",
    signIn: "Sign In",
    noAccount: "Don't have an account?",
    register: "Register here",
  },
  hi: {
    title: "सुरक्षित लॉगिन",
    subtitle: "वापस स्वागत है, कृपया अपना विवरण दर्ज करें।",
    email: "ईमेल पता",
    password: "पासवर्ड",
    signIn: "साइन इन करें",
    noAccount: "क्या आपका खाता नहीं है?",
    register: "यहां पंजीकरण करें",
  },
  pa: {
    title: "ਸੁਰੱਖਿਅਤ ਲਾਗਇਨ",
    subtitle: "ਜੀ ਆਇਆਂ ਨੂੰ, ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਵੇਰਵੇ ਦਰਜ ਕਰੋ।",
    email: "ਈਮੇਲ ਪਤਾ",
    password: "ਪਾਸਵਰਡ",
    signIn: "ਸਾਈਨ ਇਨ ਕਰੋ",
    noAccount: "ਕੀ ਤੁਹਾਡਾ ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    register: "ਇੱਥੇ ਰਜਿਸਟਰ ਕਰੋ",
  }
};

const LoginPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'doctor') {
        navigate('/doctor/dashboard');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-1">
                <button onClick={() => setLang('en')} className={`px-3 py-1 text-sm rounded ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}>EN</button>
                <button onClick={() => setLang('hi')} className={`px-3 py-1 text-sm rounded ${lang === 'hi' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}>HI</button>
                <button onClick={() => setLang('pa')} className={`px-3 py-1 text-sm rounded ${lang === 'pa' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}>PA</button>
            </div>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
        </div>


      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-teal-500 text-white p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Sehat Saathi</h1>
            <p className="text-lg leading-relaxed">Your Health Companion. Bridging the gap in rural healthcare through technology, providing accessible consultations and secure health records for everyone.</p>
          </div>
          <div className="mt-8">
            <p className="text-sm font-light">© 2025 Smart India Hackathon</p>
          </div>
        </div>
        <div className="md:w-1/2 bg-white dark:bg-gray-800 p-12 transition-colors">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{t.subtitle}</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.email}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.password}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"/>
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md">{t.signIn}</button>
            </div>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {t.noAccount} <Link to="/register" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">{t.register}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

