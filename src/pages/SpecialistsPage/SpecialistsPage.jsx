import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { doctors } from '../../data/doctors';
import './SpecialistsPage.css';

const DoctorAvatar = ({ src, name }) => {
  const [status, setStatus] = useState('loading');

  const getInitials = (nameStr) => {
    return nameStr
      .replace('Dr. ', '')
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="doc-avatar-wrap">
      {status === 'loading' && <div className="avatar-skeleton"></div>}
      {status === 'error' ? (
        <div className="avatar-fallback">
          <span className="avatar-initials">{getInitials(name)}</span>
          <div className="avatar-icon-overlay">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" />
            </svg>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={name}
          className={`doc-avatar-img ${status === 'loaded' ? 'loaded' : 'hidden'}`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  );
};

const SpecialistsPage = () => {
  const [searchParams] = useSearchParams();
  const specMap = {
    'pediatrics': 'Pediatrics',
    'mental-wellness': 'Psychiatry',
    'telemedicine': 'All', 
    'cardiology': 'Cardiology Specialist',
    'neurology': 'Neurology'
  };
  const initSpec = searchParams.get('specialty');
  const mappedSpec = initSpec ? (specMap[initSpec.toLowerCase()] || initSpec) : 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState(mappedSpec);
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesSpecialty = specialtyFilter === 'All' || doc.specialization === specialtyFilter;
    
    let matchesExp = true;
    if (experienceFilter === '10+ Years') matchesExp = parseInt(doc.experience) >= 10;
    if (experienceFilter === '15+ Years') matchesExp = parseInt(doc.experience) >= 15;

    const matchesAvail = availabilityFilter === 'All' || doc.availability.includes(availabilityFilter);
    const matchesLang = languageFilter === 'All' || doc.languages.includes(languageFilter);
    
    // For demo purposes, we assume doctors are available both modes, except if specifically tagged Telemedicine
    const matchesMode = modeFilter === 'All' ? true : modeFilter === 'Online' ? true : true; 

    return matchesSearch && matchesSpecialty && matchesExp && matchesAvail && matchesLang && matchesMode;
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
            <div className="advanced-filters-grid">
              <select className="search-select" value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)}>
                <option value="All">All Specialties</option>
                <option value="Cardiology Specialist">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
              
              <select className="search-select" value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}>
                <option value="All">Any Experience</option>
                <option value="10+ Years">10+ Years</option>
                <option value="15+ Years">15+ Years</option>
              </select>

              <select className="search-select" value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)}>
                <option value="All">Any Availability</option>
                <option value="Today">Available Today</option>
                <option value="Tomorrow">Available Tomorrow</option>
                <option value="Next Week">Next Week</option>
              </select>

              <select className="search-select" value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
                <option value="All">All Languages</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Russian">Russian</option>
              </select>

              <select className="search-select" value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
                <option value="All">Online & Offline</option>
                <option value="Online">Online / Telemedicine</option>
                <option value="Offline">Offline / Clinic</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <motion.div layout className="container specialists-grid">
        <AnimatePresence>
          {filteredDoctors.map((doc, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="specialist-card-rich glass" 
              key={doc.id}
            >
              <div className="card-header">
                <div className="doc-avatar-container">
                  <DoctorAvatar src={doc.avatar} name={doc.name} />
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
                <Link to={`/specialists/${doc.id}`} className="btn btn-outline btn-sm" style={{flex: 1, textAlign: 'center'}}>
                  View Profile
                </Link>
                <Link to={`/book/${doc.id}`} className="btn btn-gold btn-sm" style={{flex: 1, textAlign: 'center'}}>
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SpecialistsPage;
