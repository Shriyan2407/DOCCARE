import React, { useContext } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import AppointmentCard from '../components/AppointmentCard';
import DashboardStats from '../components/DashboardStats';

const Appointments = () => {
  const { appointments } = useContext(HospitalContext);

  const stats = {
    total: appointments.length,
    completed: appointments.filter(a => a.status === 'Completed').length,
    cancelled: appointments.filter(a => a.status === 'Cancelled').length,
    upcoming: appointments.filter(a => a.status === 'Upcoming').length,
  };

  // Sort by date newest first
  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div className="text-center flex flex-col items-center mb-8">
        <div className="lx-label">Overview</div>
        <h2 className="page-title">Appointments <span className="blue-text">Dashboard</span></h2>
        <p className="page-subtitle">Manage your upcoming and past consultations</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="lx-card" style={{ padding: '3rem' }}>
        <h3 className="mb-6" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '1.5rem', color: '#fff' }}>Appointment History</h3>
        {sortedAppointments.length === 0 ? (
          <p className="text-center" style={{ color: 'var(--text-light)' }}>No appointments found.</p>
        ) : (
          <div className="grid grid-cols-2">
            {sortedAppointments.map(app => (
              <AppointmentCard key={app.id} appointment={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
