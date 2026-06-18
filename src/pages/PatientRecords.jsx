import React, { useContext } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import MedicalRecordCard from '../components/MedicalRecordCard';

const PatientRecords = () => {
  const { medicalRecords } = useContext(HospitalContext);

  return (
    <div>
      <div className="text-center flex flex-col items-center mb-8">
        <div className="lx-label">Your Health</div>
        <h2 className="page-title">Medical <span className="blue-text">Records</span></h2>
        <p className="page-subtitle">Access your complete medical history and prescriptions</p>
      </div>

      <div className="lx-card" style={{ padding: '3rem' }}>
        {medicalRecords.length === 0 ? (
          <div className="text-center" style={{ padding: '4rem 2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59,130,246,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <p style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', fontFamily: "'Clash Display', sans-serif" }}>No medical records found.</p>
            <p style={{ color: '#71717A', fontSize: '0.95rem' }}>Records will appear here after a completed consultation.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {medicalRecords.map(record => (
              <MedicalRecordCard key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
