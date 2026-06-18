import { useState } from 'react';
import { Link } from 'react-router-dom';
import { healthRecords } from '../../data/mockData';
import './HealthRecords.css';

const HealthRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredRecords = healthRecords.filter(rec => {
    const matchesSearch = rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rec.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || rec.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="records-page">
      <div className="container records-grid">
        
        {/* Left Sidebar Menu */}
        <aside className="dashboard-sidebar glass">
          <div className="patient-profile">
            <div className="patient-avatar">JD</div>
            <div className="patient-info">
              <h3>John Doe</h3>
              <p>Premium Member</p>
            </div>
          </div>
          
          <nav className="dashboard-nav">
            <Link to="/dashboard" className="d-nav-link">Overview</Link>
            <Link to="/records" className="d-nav-link active">Health Records</Link>
            <Link to="/specialists" className="d-nav-link">Find Doctors</Link>
            <Link to="/book" className="d-nav-link">Book Appointment</Link>
            <a href="#" className="d-nav-link">Prescriptions</a>
            <a href="#" className="d-nav-link">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <header className="records-header mb-2xl">
            <h1 className="text-display-sm gradient-text-gold">Health Records</h1>
            <p className="text-subheading">Your complete medical history and timeline.</p>
          </header>

          <div className="records-controls mb-xl">
            <div className="search-input-wrap" style={{ maxWidth: 400 }}>
              <input 
                type="text" 
                placeholder="Search records..." 
                className="search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="search-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Diagnosis">Diagnosis</option>
              <option value="Lab Test">Lab Test</option>
              <option value="Vaccination">Vaccination</option>
            </select>
          </div>

          <div className="records-timeline">
            {filteredRecords.map((rec, idx) => (
              <div className="timeline-item animate-fade-in-up" key={rec.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="timeline-date">
                  <span className="t-day">{rec.date.split('-')[2]}</span>
                  <span className="t-month">{new Date(rec.date).toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                </div>
                
                <div className="timeline-dot"></div>
                
                <div className="timeline-content glass">
                  <div className="t-header">
                    <span className="badge badge-gold">{rec.type}</span>
                    <span className="t-doc">{rec.doctor}</span>
                  </div>
                  <h3 className="t-title">{rec.title}</h3>
                  <p className="t-desc">{rec.description}</p>
                  
                  {rec.files && rec.files.length > 0 && (
                    <div className="t-files mt-md">
                      {rec.files.map((file, i) => (
                        <button key={i} className="btn btn-outline btn-sm file-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight: 8}}>
                            <path d="M12 15V3M12 15L8 11M12 15L16 11M2 17L2.8 20.2C2.9 20.6 3.3 21 3.8 21H20.2C20.7 21 21.1 20.6 21.2 20.2L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {file}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filteredRecords.length === 0 && (
              <div className="empty-state text-center text-muted">
                No records found matching your criteria.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthRecords;
