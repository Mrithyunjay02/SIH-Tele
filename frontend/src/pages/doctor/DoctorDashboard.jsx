import React, { useContext } from 'react'; // Import useContext
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext'; // Import the ThemeContext

// --- Helper Icon Components for the toggle button ---
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;

// --- Sidebar Component ---
// Updated with dark mode classes for colors and hovers
const Sidebar = ({ handleLogout }) => {
    const location = useLocation();
    const navItems = [
        { path: '/doctor/dashboard', name: 'Dashboard', icon: <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> },
        { path: '/doctor/appointments', name: 'Appointments', icon: <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> },
        { path: '/doctor/patients', name: 'Patients', icon: <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 012.121.303m-2.121-.303a4 4 0 110-5.292"></path></svg> },
    ];

    return (
        <div className="w-64 bg-white dark:bg-gray-800 flex flex-col shrink-0 border-r border-gray-200 dark:border-gray-700">
            <div className="p-6 text-2xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700">Sehat Saathi</div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map(item => (
                    <Link key={item.path} to={item.path} className={`flex items-center p-3 rounded-lg transition-colors text-gray-600 dark:text-gray-300 ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button onClick={handleLogout} className="w-full flex items-center justify-center p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"><svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>Logout</button>
            </div>
        </div>
    );
};


// --- The main LAYOUT component ---
const DoctorLayout = () => {
  // Use the context to get the current theme and the function to toggle it
  const { theme, toggleTheme } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    // The background color of the whole screen will now change with the theme
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar handleLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top Header Bar with the Theme Toggle Button */}
        <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
            <h1 className="text-xl font-semibold">Dr. {user?.name || 'User'}'s Portal</h1>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
        </header>

        {/* Main Content Area where child pages will be rendered */}
        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;

