import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doctors } from '../../data/doctors';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === id);
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!doctor) {
      navigate('/specialists'); // Redirect if not found
    }
  }, [doctor, navigate]);

  if (!doctor) return null;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(!saved);
    }, 600);
  };

  return (
    <div className="doctor-profile-page">
      {/* Profile Header */}
      <div className="profile-hero">
        <div className="container">
          <Link to="/specialists" className="back-link">
            ← Back to Specialists
          </Link>
          
          <div className="profile-header-grid">
            <div className="profile-avatar-large">
              <img src={doctor.avatar} alt={doctor.name} />
              {doctor.verified && (
                <div className="profile-verified-badge" title="Verified Professional">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4AF37">
                    <path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="profile-info-main">
              <div className="profile-meta-top">
                <div className="badge badge-gold">{doctor.specialization}</div>
                <div className={`doc-status ${doctor.availability.includes('Today') ? 'status-green' : 'status-amber'}`}>
                  {doctor.availability}
                </div>
              </div>
              
              <h1 className="text-display-sm gradient-text-gold">{doctor.name}</h1>
              <p className="profile-hospital">{doctor.hospital}</p>
              
              <div className="profile-stats-row">
                <div className="p-stat">
                  <span className="p-stat-val">{doctor.experience}</span>
                  <span className="p-stat-lbl">Experience</span>
                </div>
                <div className="p-stat-divider" />
                <div className="p-stat">
                  <span className="p-stat-val">
                    <span className="star" style={{color: 'var(--gold)'}}>★</span> {doctor.rating}
                  </span>
                  <span className="p-stat-lbl">{doctor.reviews} Reviews</span>
                </div>
                <div className="p-stat-divider" />
                <div className="p-stat">
                  <span className="p-stat-val">{doctor.fee}</span>
                  <span className="p-stat-lbl">Per Consult</span>
                </div>
              </div>

              <div className="profile-actions">
                <Link to={`/book/${doctor.id}`} className="btn btn-gold btn-lg" style={{minWidth: 200}}>
                  Book Appointment
                </Link>
                <button 
                  className={`btn btn-outline btn-lg btn-save ${saved ? 'saved' : ''} ${saving ? 'saving' : ''}`}
                  onClick={handleSave}
                >
                  {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Doctor'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container profile-content-grid">
        {/* Left Column */}
        <div className="profile-main-col">
          <section className="profile-section">
            <h2 className="text-heading">About</h2>
            <p className="text-body">{doctor.biography}</p>
          </section>

          <section className="profile-section">
            <h2 className="text-heading">Education & Certifications</h2>
            <ul className="profile-list">
              {doctor.education.split(';').map((edu, i) => (
                <li key={i}>{edu.trim()}</li>
              ))}
            </ul>
          </section>

          <section className="profile-section">
            <h2 className="text-heading">Treatment Areas</h2>
            <div className="tags-container">
              {doctor.treatmentAreas.map((area, i) => (
                <span key={i} className="badge badge-white">{area}</span>
              ))}
            </div>
          </section>

          <section className="profile-section">
            <h2 className="text-heading">Achievements</h2>
            <ul className="profile-list">
              {doctor.achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="profile-sidebar">
          <div className="sidebar-card glass">
            <h3 className="sidebar-heading">Consultation Details</h3>
            
            <div className="sidebar-item">
              <span className="sidebar-lbl">Next Available</span>
              <span className="sidebar-val text-gold">{doctor.nextAvailable}</span>
            </div>
            
            <div className="sidebar-item">
              <span className="sidebar-lbl">Consultation Fee</span>
              <span className="sidebar-val">{doctor.fee}</span>
            </div>

            <div className="sidebar-item">
              <span className="sidebar-lbl">Languages Spoken</span>
              <span className="sidebar-val">{doctor.languages.join(', ')}</span>
            </div>

            <div className="sidebar-item">
              <span className="sidebar-lbl">Hospital Affiliation</span>
              <span className="sidebar-val">{doctor.hospital}</span>
            </div>

            <Link to={`/book/${doctor.id}`} className="btn btn-gold w-full mt-lg">
              Check Full Calendar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
