import React from 'react';
import AnimatedCard from './AnimatedCard';
import { CalendarDays, CheckCircle, XCircle, Clock } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 mb-4">
      <AnimatedCard index={0} className="lx-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', width: '3.5rem', height: '3.5rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)', flexShrink: 0 }}>
          <CalendarDays size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', margin: 0, fontFamily: "'Space Grotesk', sans-serif", color: '#fff', lineHeight: 1 }}>{stats.total}</h3>
          <p style={{ color: '#71717A', margin: 0, fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.25rem' }}>Total</p>
        </div>
      </AnimatedCard>

      <AnimatedCard index={1} className="lx-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', width: '3.5rem', height: '3.5rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)', flexShrink: 0 }}>
          <CheckCircle size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', margin: 0, fontFamily: "'Space Grotesk', sans-serif", color: '#fff', lineHeight: 1 }}>{stats.completed}</h3>
          <p style={{ color: '#71717A', margin: 0, fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.25rem' }}>Completed</p>
        </div>
      </AnimatedCard>

      <AnimatedCard index={2} className="lx-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', width: '3.5rem', height: '3.5rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)', flexShrink: 0 }}>
          <XCircle size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', margin: 0, fontFamily: "'Space Grotesk', sans-serif", color: '#fff', lineHeight: 1 }}>{stats.cancelled}</h3>
          <p style={{ color: '#71717A', margin: 0, fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.25rem' }}>Cancelled</p>
        </div>
      </AnimatedCard>

      <AnimatedCard index={3} className="lx-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', width: '3.5rem', height: '3.5rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)', flexShrink: 0 }}>
          <Clock size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', margin: 0, fontFamily: "'Space Grotesk', sans-serif", color: '#fff', lineHeight: 1 }}>{stats.upcoming}</h3>
          <p style={{ color: '#71717A', margin: 0, fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.25rem' }}>Upcoming</p>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default DashboardStats;
