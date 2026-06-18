import { Link } from 'react-router-dom';
import { appointments, metrics } from '../../data/mockData';
import { doctors } from '../../data/doctors';
import './Dashboard.css';

const Dashboard = () => {
  const upcomingApt = appointments.find(a => a.status === 'Upcoming');
  // Just grab some mock saved doctors
  const savedDocs = [doctors[0], doctors[2]];

  return (
    <div className="dashboard-page">
      <div className="container dashboard-grid">
        
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
            <Link to="/dashboard" className="d-nav-link active">Overview</Link>
            <Link to="/records" className="d-nav-link">Health Records</Link>
            <Link to="/specialists" className="d-nav-link">Find Doctors</Link>
            <Link to="/book" className="d-nav-link">Book Appointment</Link>
            <a href="#" className="d-nav-link">Prescriptions</a>
            <a href="#" className="d-nav-link">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <header className="dashboard-header mb-2xl">
            <h1 className="text-display-sm gradient-text-gold">Good Morning, John</h1>
            <p className="text-subheading">Here is your daily health overview.</p>
          </header>

          <div className="dashboard-content-grid">
            
            {/* Top Row: Next Apt & Metrics */}
            <div className="dash-row top-row">
              <div className="dash-card glass upcoming-apt-card">
                <h3 className="dash-card-title">Next Appointment</h3>
                {upcomingApt ? (
                  <div className="apt-details">
                    <div className="apt-time">
                      <span className="text-display-md text-gold">{upcomingApt.date.split('-')[2]}</span>
                      <span className="text-muted text-uppercase">{new Date(upcomingApt.date).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="apt-info">
                      <h4>{upcomingApt.doctorName}</h4>
                      <p>{upcomingApt.specialty}</p>
                      <p className="mt-sm text-gold">{upcomingApt.time} • {upcomingApt.type}</p>
                    </div>
                    <Link to={`/specialists/${upcomingApt.doctorId}`} className="btn btn-outline btn-sm">Details</Link>
                  </div>
                ) : (
                  <p>No upcoming appointments.</p>
                )}
              </div>

              <div className="dash-card glass ai-insights-card">
                <h3 className="dash-card-title">AI Health Insights</h3>
                <div className="insight-pulse">
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring delay"></div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="mt-md">Your resting heart rate is 5% lower than last week. Excellent progress!</p>
              </div>
            </div>

            {/* Middle Row: Vitals */}
            <h3 className="dash-section-title mt-2xl mb-md">Current Vitals</h3>
            <div className="dash-row vitals-row">
              <div className="vital-card glass">
                <span className="v-lbl">Blood Pressure</span>
                <span className="v-val text-gold">{metrics.bloodPressure}</span>
                <span className="v-unit">mmHg</span>
              </div>
              <div className="vital-card glass">
                <span className="v-lbl">Heart Rate</span>
                <span className="v-val text-gold">{metrics.heartRate}</span>
                <span className="v-unit">bpm</span>
              </div>
              <div className="vital-card glass">
                <span className="v-lbl">Weight</span>
                <span className="v-val">{metrics.weight}</span>
              </div>
              <div className="vital-card glass">
                <span className="v-lbl">BMI</span>
                <span className="v-val">{metrics.bmi}</span>
              </div>
            </div>

            {/* Bottom Row: Saved Doctors & Recent Records */}
            <div className="dash-row bottom-row mt-2xl">
              <div className="dash-card glass">
                <div className="card-header-flex">
                  <h3 className="dash-card-title">Saved Doctors</h3>
                  <Link to="/specialists" className="text-gold text-small">View All</Link>
                </div>
                <div className="saved-docs-list">
                  {savedDocs.map(doc => (
                    <div className="saved-doc-item" key={doc.id}>
                      <img src={doc.avatar} alt={doc.name} />
                      <div className="s-doc-info">
                        <h4>{doc.name}</h4>
                        <p>{doc.specialization}</p>
                      </div>
                      <Link to={`/book/${doc.id}`} className="btn btn-outline btn-sm">Book</Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dash-card glass">
                <div className="card-header-flex">
                  <h3 className="dash-card-title">Recent Records</h3>
                  <Link to="/records" className="text-gold text-small">View All</Link>
                </div>
                <div className="recent-records-list">
                  <div className="r-record-item">
                    <div className="r-icon">📋</div>
                    <div className="r-info">
                      <h4>Neurological Assessment</h4>
                      <p>May 12, 2026</p>
                    </div>
                    <a href="#" className="r-dl">↓</a>
                  </div>
                  <div className="r-record-item">
                    <div className="r-icon">🩸</div>
                    <div className="r-info">
                      <h4>Complete Blood Count</h4>
                      <p>Mar 22, 2026</p>
                    </div>
                    <a href="#" className="r-dl">↓</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
