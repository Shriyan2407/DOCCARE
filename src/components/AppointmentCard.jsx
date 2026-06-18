import React, { useContext } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import AnimatedCard from './AnimatedCard';
import { Calendar, Clock } from 'lucide-react';

const AppointmentCard = ({ appointment, index = 0 }) => {
  const { cancelAppointment } = useContext(HospitalContext);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Upcoming': return 'badge badge-primary';
      case 'Completed': return 'badge badge-muted';
      case 'Cancelled': return 'badge badge-muted';
      default: return 'badge';
    }
  };

  return (
    <AnimatedCard index={index} className="lx-card flex flex-col h-full" style={{ padding: '2rem' }}>
      <div className="flex justify-between items-center mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontFamily: "'Clash Display', 'Satoshi', sans-serif" }}>Dr. {appointment.doctorName}</h3>
        <span className={getStatusBadge(appointment.status)}>{appointment.status}</span>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8 flex-1">
        <div>
          <strong style={{ color: '#71717A', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
            <Calendar size={14} /> Date
          </strong>
          <p style={{ fontWeight: 500, margin: 0, color: '#f1f5f9' }}>{appointment.date}</p>
        </div>
        <div>
          <strong style={{ color: '#71717A', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
            <Clock size={14} /> Time
          </strong>
          <p style={{ fontWeight: 500, margin: 0, color: '#f1f5f9' }}>{appointment.timeSlot}</p>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <strong style={{ color: '#71717A', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Symptoms/Reason</strong>
          <p style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', fontSize: '0.95rem', color: '#A1A1AA', margin: 0, border: '1px solid rgba(255,255,255,0.05)' }}>{appointment.symptoms}</p>
        </div>
      </div>
      
      {appointment.status === 'Upcoming' && (
        <button 
          className="btn btn-ghost" 
          style={{ width: '100%', marginTop: 'auto', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          onClick={() => {
            if(window.confirm('Are you sure you want to cancel this appointment?')) {
              cancelAppointment(appointment.id);
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
          }}
        >
          Cancel Appointment
        </button>
      )}
    </AnimatedCard>
  );
};

export default AppointmentCard;
