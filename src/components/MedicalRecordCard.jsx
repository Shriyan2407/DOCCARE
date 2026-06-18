import React from 'react';
import AnimatedCard from './AnimatedCard';
import { FileText, Calendar, User } from 'lucide-react';

const MedicalRecordCard = ({ record, index = 0 }) => {
  return (
    <AnimatedCard index={index} className="lx-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="flex justify-between items-center mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontFamily: "'Clash Display', 'Satoshi', sans-serif", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={20} color="#3B82F6" />
          {record.diagnosis}
        </h3>
        <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={12} />
          {record.date}
        </span>
      </div>
      
      <div className="mb-6">
        <strong style={{ color: '#71717A', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
          <User size={14} /> Doctor
        </strong>
        <p style={{ fontWeight: 500, margin: 0, color: '#f1f5f9' }}>Dr. {record.doctorName}</p>
      </div>

      <div style={{ flex: 1 }}>
        <strong style={{ color: '#71717A', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          Prescription
        </strong>
        <p style={{ 
          background: 'rgba(255,255,255,0.02)', 
          padding: '1.25rem', 
          borderRadius: '12px', 
          fontSize: '0.95rem', 
          color: '#A1A1AA', 
          margin: 0, 
          border: '1px solid rgba(255,255,255,0.05)',
          fontFamily: "'Space Grotesk', sans-serif"
        }}>
          {record.prescription}
        </p>
      </div>
    </AnimatedCard>
  );
};

export default MedicalRecordCard;
