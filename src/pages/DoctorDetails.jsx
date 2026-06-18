import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HospitalContext } from '../context/HospitalContext';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(HospitalContext);
  
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="lx-card text-center mt-4" style={{ padding: '4rem 2rem' }}>
        <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '2rem', color: '#fff', marginBottom: '1.5rem' }}>Specialist Not Found</h2>
        <button className="btn btn-ghost" onClick={() => navigate('/doctors')}>
          Return to Directory
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="lx-label" style={{ marginBottom: '0.5rem' }}>Specialist Profile</div>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '2.5rem', color: '#fff', margin: 0 }}>Dr. {doctor.name}</h2>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/doctors')}>
          Back to Directory
        </button>
      </div>

      <div className="lx-card mb-8" style={{ padding: '3rem' }}>
        <div className="flex gap-8 items-center">
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/* Blue glow behind image */}
            <div style={{ position: 'absolute', inset: -10, background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}></div>
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              style={{ width: '180px', height: '180px', borderRadius: '24px', objectFit: 'cover', position: 'relative', zIndex: 1, border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
            />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '2.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{doctor.name}</h1>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-primary">{doctor.specialization}</span>
            </div>
            <p style={{ maxWidth: '800px', color: '#A1A1AA', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>{doctor.about}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="lx-card" style={{ padding: '2.5rem' }}>
          <h3 className="mb-6" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '1.5rem', color: '#fff' }}>Credentials</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
              <strong style={{ color: '#71717A', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Qualification</strong>
              <span style={{ color: '#60A5FA', fontWeight: 600 }}>{doctor.qualification}</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
              <strong style={{ color: '#71717A', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Experience</strong>
              <span style={{ color: '#f1f5f9', fontWeight: 500 }}>{doctor.experience}</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
              <strong style={{ color: '#71717A', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Consultation Fee</strong>
              <span style={{ color: '#f1f5f9', fontWeight: 500 }}>${doctor.fee}</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
              <strong style={{ color: '#71717A', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Rating</strong>
              <span style={{ color: '#3B82F6', fontWeight: 600 }}>⭐ {doctor.rating} <span style={{ color: '#71717A', fontWeight: 400 }}>({doctor.reviews} Reviews)</span></span>
            </li>
          </ul>
        </div>
        
        <div className="lx-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 className="mb-6" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '1.5rem', color: '#fff' }}>Availability</h3>
          <div className="flex gap-3 mb-8" style={{ flexWrap: 'wrap' }}>
            {doctor.availability.map(day => (
              <span key={day} className="badge badge-muted" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>{day}</span>
            ))}
          </div>
          <div style={{ marginTop: 'auto' }}>
            <Link 
              to="/book-appointment" 
              state={{ doctorId: doctor.id }} 
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', justifyContent: 'center' }}
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
