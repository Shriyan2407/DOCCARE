import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AISection.css';

const operations = [
  {
    id: 'specialists',
    label: 'Specialists',
    title: 'World-Class Medical Specialists',
    description: 'Connect with board-certified physicians across 40+ specialties. View detailed profiles, verified patient reviews, and real-time availability before booking.',
    buttonText: 'Find a Doctor',
    visual: (
      <div className="ops-visual-card">
        <div className="ops-card-header">
          <div className="ops-avatar">SJ</div>
          <div className="ops-info">
            <div className="ops-name">Dr. Sarah Jenkins</div>
            <div className="ops-spec text-gold">Cardiology</div>
          </div>
        </div>
        <div className="ops-slots">
          <div className="ops-slot">Today, 2:30 PM</div>
          <div className="ops-slot">Tomorrow, 10:00 AM</div>
          <div className="ops-slot">Thu, 1:15 PM</div>
        </div>
        <div className="ops-ai-assist">
          <span className="ai-badge">AI Assistant</span>
          <p>Matched based on your recent ECG records and preferred schedule.</p>
        </div>
      </div>
    )
  },
  {
    id: 'appointments',
    label: 'Appointments',
    title: 'Seamless Appointment Management',
    description: 'Book, reschedule, or cancel consultations instantly. Receive automated reminders and manage your entire healthcare schedule from one unified dashboard.',
    buttonText: 'Manage Appointments',
    visual: (
      <div className="ops-visual-card">
        <div className="ops-calendar-header">Upcoming Consultations</div>
        <div className="ops-apt-item">
          <div className="ops-apt-date">
            <span className="ops-day text-gold">12</span>
            <span className="ops-month">Oct</span>
          </div>
          <div className="ops-apt-details">
            <div className="ops-apt-type">Annual Checkup</div>
            <div className="ops-apt-doc">Dr. Michael Chen</div>
          </div>
        </div>
        <div className="ops-apt-item">
          <div className="ops-apt-date">
            <span className="ops-day text-gold">24</span>
            <span className="ops-month">Oct</span>
          </div>
          <div className="ops-apt-details">
            <div className="ops-apt-type">Neurology Follow-up</div>
            <div className="ops-apt-doc">Dr. Emily Thorne</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'records',
    label: 'Health Records',
    title: 'Unified Medical History',
    description: 'Securely access your lab results, prescriptions, imaging, and consultation notes. Maintain a comprehensive health timeline accessible anywhere.',
    buttonText: 'Access Records',
    visual: (
      <div className="ops-visual-card">
        <div className="ops-records-list">
          <div className="ops-record-item">
            <div className="ops-record-icon">📄</div>
            <div className="ops-record-info">
              <div className="ops-record-title">Comprehensive Metabolic Panel</div>
              <div className="ops-record-date">Added 2 days ago</div>
            </div>
            <div className="ops-record-status text-gold">Available</div>
          </div>
          <div className="ops-record-item">
            <div className="ops-record-icon">💊</div>
            <div className="ops-record-info">
              <div className="ops-record-title">Lisinopril 10mg Prescription</div>
              <div className="ops-record-date">Active</div>
            </div>
            <div className="ops-record-status">1 Refill</div>
          </div>
        </div>
      </div>
    )
  }
];

const OperationsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = operations[activeTab];

  return (
    <section className="ops-section section" id="operations">
      <div className="container">
        <div className="ops-header-center">
          <h2 className="text-display-md gradient-text-gold">Healthcare Engineered For Modern Life.</h2>
          <p className="text-body text-center" style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
            Access specialists, appointments, medical records, and healthcare services through one unified platform.
          </p>
        </div>

        <div className="ops-layout mt-2xl">
          {/* Left — Tabs & Content */}
          <div className="ops-content">
            <div className="ops-tabs" role="tablist">
              {operations.map((op, i) => (
                <button
                  key={op.id}
                  className={`ops-tab ${activeTab === i ? 'ops-tab--active' : ''}`}
                  onClick={() => setActiveTab(i)}
                  role="tab"
                  aria-selected={activeTab === i}
                >
                  {op.label}
                </button>
              ))}
            </div>

            <div className="ops-tab-content-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="ops-tab-content"
                >
                  <h3 className="ops-insight-title text-heading">{active.title}</h3>
                  <p className="ops-insight-desc text-body">{active.description}</p>
                  <button className="btn btn-gold mt-lg">
                    {active.buttonText}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right — Visual panel */}
          <div className="ops-visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
                className="ops-visual-container"
              >
                {active.visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationsSection;
