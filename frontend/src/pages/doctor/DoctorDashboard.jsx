import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

// --- Sidebar Component ---
const Sidebar = ({ handleLogout }) => {
    const location = useLocation();
    const navItems = [
        { path: '/doctor/dashboard', name: 'Dashboard', icon: <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> },
        { path: '/doctor/appointments', name: 'Appointments', icon: <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> },
        { path: '/doctor/patients', name: 'Patients', icon: <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 012.121.303m-2.121-.303a4 4 0 110-5.292"></path></svg> },
    ];

    return (
        <div className="w-64 bg-gray-800 flex flex-col shrink-0">
            <div className="p-6 text-2xl font-bold border-b border-gray-700 text-white">Sehat Saathi</div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map(item => (
                    <Link key={item.path} to={item.path} className={`flex items-center p-3 rounded-lg transition-colors text-white ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button onClick={handleLogout} className="w-full flex items-center p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold"><svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>Logout</button>
            </div>
        </div>
    );
};

// --- This is the main LAYOUT component ---
const DoctorLayout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar handleLogout={handleLogout} />
            
            {/* Main Content Area - The active page will be rendered here */}
            <main className="flex-1 overflow-auto p-10">
                {/* This Outlet is the "window" where child routes are displayed */}
                <Outlet />
            </main>
        </div>
    );
};

export default DoctorLayout;

