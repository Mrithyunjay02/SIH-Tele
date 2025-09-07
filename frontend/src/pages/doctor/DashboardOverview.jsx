import React, { useState, useEffect } from 'react';
import { getDoctorData } from '../../api';

// --- Reusable UI Components ---
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 012.121.303m-2.121-.303a4 4 0 110-5.292" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

const Card = ({ title, value, icon, delay }) => (
    <div className="dashboard-card animate-fade-in-up" style={{ animationDelay: `${delay * 100}ms` }}>
        <div>
            <p className="card-title">{title}</p>
            <p className="card-value">{value}</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-full">{icon}</div>
    </div>
);

// --- Main Dashboard Component ---
const DashboardOverview = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await getDoctorData();
                setDashboardData(response.data);
                setError('');
            } catch (err) {
                setError('Could not fetch appointment data. Please try again later.');
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <>
            <header className="mb-10 animate-fade-in-up">
                <h1 className="text-4xl font-bold">Welcome, Dr. {user?.name || 'User'}</h1>
                <p className="text-gray-400 mt-2">Here's a summary of your activities today.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <Card title="Today's Appointments" value={dashboardData?.stats?.todays_appointments ?? '...'} icon={<CalendarIcon />} delay={1} />
                <Card title="Total Patients" value={dashboardData?.stats?.total_patients ?? '...'} icon={<UsersIcon />} delay={2} />
                <Card title="Pending Reports" value={dashboardData?.stats?.pending_reports ?? '...'} icon={<DocumentIcon />} delay={3} />
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <h2 className="text-2xl font-semibold mb-6">Upcoming Appointments</h2>
                {error && <div className="text-center text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
                <div className="space-y-4">
                    {dashboardData && dashboardData.appointments.length > 0 ? (
                        dashboardData.appointments.map(app => (
                            <div key={app.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                                <div>
                                    <p className="font-bold text-lg">{app.patient_name}</p>
                                    <p className="text-sm text-gray-400">{new Date(app.time).toLocaleString()}</p>
                                </div>
                                <div><p className="text-sm text-gray-300">Reason: {app.reason}</p></div>
                                <button className="btn-primary">View Details</button>
                            </div>
                        ))
                    ) : (
                        !error && <p className="text-center text-gray-400">{dashboardData ? "No upcoming appointments." : "Loading..."}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardOverview;

