import { useState } from 'react';
import { Link } from 'react-router-dom';
import { doctors } from '../../data/doctors';
import './SpecialistsPage.css';

const SpecialistsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || doc.specialization === filter || (filter === 'Available Today' && doc.availability === 'Available Today');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="specialists-page">
      <div className="specialists-header">
        <div className="container">
          <div className="badge badge-gold animate-fade-in-up stagger-1">Medical Experts</div>
          <h1 className="text-display-md gradient-text-gold animate-fade-in-up stagger-2">
            World-Class Specialists
          </h1>
          <p className="text-subheading animate-fade-in-up stagger-3" style={{ maxWidth: 600, marginTop: 16 }}>
            Connect with globally recognized experts across every major medical discipline.
          </p>

          <div className="specialists-search-bar animate-fade-in-up stagger-4">
            <div className="search-input-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#808080" strokeWidth="1.5" />
                <path d="M16.5 16.5L22 22" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input 
                type="text" 
                placeholder="Search doctors, specialties, or conditions..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="search-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All Specialties</option>
              <option value="Cardiology Specialist">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Oncology">Oncology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Available Today">Available Today</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container specialists-grid">
        {filteredDoctors.map((doc, idx) => (
          <div className="specialist-card-rich glass" key={doc.id} style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="card-header">
              <div className="doc-avatar-wrap">
                <img src={doc.avatar} alt={doc.name} className="doc-avatar-img" />
                {doc.verified && (
                  <div className="doc-verified-badge" title="Verified Professional">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                      <path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="doc-meta-top">
                <div className="doc-rating">
                  <span className="star">★</span> {doc.rating} <span>({doc.reviews})</span>
                </div>
                <div className={`doc-status ${doc.availability.includes('Today') ? 'status-green' : 'status-amber'}`}>
                  {doc.availability}
                </div>
              </div>
            </div>

            <div className="card-body">
              <h3 className="doc-name">{doc.name}</h3>
              <p className="doc-spec text-gold">{doc.specialization}</p>
              <p className="doc-hospital">{doc.hospital}</p>
              
              <div className="doc-stats">
                <div className="doc-stat">
                  <span className="stat-lbl">Experience</span>
                  <span className="stat-val">{doc.experience}</span>
                </div>
                <div className="doc-stat">
                  <span className="stat-lbl">Consult Fee</span>
                  <span className="stat-val">{doc.fee}</span>
                </div>
              </div>

              <div className="doc-languages">
                <span className="stat-lbl">Languages: </span>
                {doc.languages.join(', ')}
              </div>

              <p className="doc-bio-short">{doc.biography.substring(0, 100)}...</p>
            </div>

            <div className="card-footer">
              <Link to={`/specialists/${doc.id}`} className="btn btn-outline btn-sm" style={{flex: 1}}>
                View Profile
              </Link>
              <Link to={`/book/${doc.id}`} className="btn btn-gold btn-sm" style={{flex: 1}}>
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialistsPage;
