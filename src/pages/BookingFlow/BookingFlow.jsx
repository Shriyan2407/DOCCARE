import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctors } from '../../data/doctors';
import BookingConfigurator3D from '../../components/BookingConfigurator3D/BookingConfigurator3D';
import './BookingFlow.css';

const STEPS = [
  "Patient Details",
  "Specialty",
  "Select Doctor",
  "Date & Time",
  "Confirm",
  "Done"
];

const BookingFlow = () => {
  const { doctorId } = useParams();
  const initialDoc = doctorId ? doctors.find(d => d.id === doctorId) : null;
  
  const [currentStep, setCurrentStep] = useState(initialDoc ? 3 : 0);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: initialDoc ? initialDoc.specialization : '',
    doctorId: initialDoc ? initialDoc.id : '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 200);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const selectedDoc = doctors.find(d => d.id === formData.doctorId);

  return (
    <div className="booking-page" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* ── 3D Background Configurator ── */}
      <BookingConfigurator3D currentStep={currentStep} />

      <div className="booking-container" style={{ position: 'relative', zIndex: 10 }}>
        {currentStep < 5 && (
          <div className="booking-sidebar">
            <Link to="/" className="back-link mb-xl">← Return to Home</Link>
            <h1 className="text-display-sm gradient-text-gold mb-md">Book Appointment</h1>
            <p className="text-subheading mb-xl">Schedule a private consultation with our specialists.</p>
            
            <div className="booking-stepper">
              {STEPS.map((step, idx) => {
                if (idx === 5) return null; // Don't show "Done" in sidebar
                return (
                  <div key={idx} className={`step-item ${idx === currentStep ? 'active' : idx < currentStep ? 'completed' : ''}`}>
                    <div className="step-circle">{idx < currentStep ? '✓' : idx + 1}</div>
                    <div className="step-label">{step}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={`booking-content ${currentStep === 5 ? 'success-mode' : ''}`}>
          <div className="booking-content-inner glass">
            
            {/* STEP 1: Patient Details */}
            {currentStep === 0 && (
              <div className="step-panel animate-fade-in-up">
                <h2 className="text-heading mb-xl">Patient Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" className="input" value={formData.firstName} onChange={handleChange} placeholder="e.g. John" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" className="input" value={formData.lastName} onChange={handleChange} placeholder="e.g. Doe" />
                  </div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}>
                    <label>Email Address</label>
                    <input type="email" name="email" className="input" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                  </div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}>
                    <label>Phone Number</label>
                    <input type="tel" name="phone" className="input" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="form-actions mt-2xl">
                  <button className="btn btn-gold btn-lg w-full" onClick={nextStep} disabled={!formData.firstName || !formData.lastName}>
                    Continue to Specialty
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Specialty */}
            {currentStep === 1 && (
              <div className="step-panel animate-fade-in-up">
                <h2 className="text-heading mb-xl">Select Specialty</h2>
                <div className="specialty-grid">
                  {['Cardiology Specialist', 'Neurology', 'Oncology', 'Orthopedics', 'Endocrinology', 'Psychiatry', 'Dermatology', 'Pediatrics'].map(spec => (
                    <button 
                      key={spec} 
                      className={`spec-btn ${formData.specialty === spec ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, specialty: spec, doctorId: '' })}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
                <div className="form-actions mt-2xl" style={{display: 'flex', gap: 16}}>
                  <button className="btn btn-outline btn-lg" style={{flex: 1}} onClick={prevStep}>Back</button>
                  <button className="btn btn-gold btn-lg" style={{flex: 2}} onClick={nextStep} disabled={!formData.specialty}>
                    Find Doctors
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Select Doctor */}
            {currentStep === 2 && (
              <div className="step-panel animate-fade-in-up">
                <h2 className="text-heading mb-md">Select Doctor</h2>
                <p className="text-body mb-xl">Showing specialists for: <span className="text-gold">{formData.specialty}</span></p>
                <div className="doc-select-list">
                  {doctors.filter(d => d.specialization === formData.specialty).map(doc => (
                    <div 
                      key={doc.id} 
                      className={`doc-select-card ${formData.doctorId === doc.id ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, doctorId: doc.id })}
                    >
                      <img src={doc.avatar} alt={doc.name} className="doc-select-avatar" />
                      <div className="doc-select-info">
                        <h3>{doc.name}</h3>
                        <p>{doc.experience} • {doc.fee}</p>
                      </div>
                      <div className="doc-select-radio"></div>
                    </div>
                  ))}
                </div>
                <div className="form-actions mt-2xl" style={{display: 'flex', gap: 16}}>
                  <button className="btn btn-outline btn-lg" style={{flex: 1}} onClick={prevStep}>Back</button>
                  <button className="btn btn-gold btn-lg" style={{flex: 2}} onClick={nextStep} disabled={!formData.doctorId}>
                    Continue to Schedule
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Date & Time */}
            {currentStep === 3 && (
              <div className="step-panel animate-fade-in-up">
                <h2 className="text-heading mb-xl">Select Date & Time</h2>
                {selectedDoc && (
                  <div className="selected-doc-badge mb-xl">
                    <img src={selectedDoc.avatar} alt="" />
                    <span>Booking with <strong>{selectedDoc.name}</strong></span>
                  </div>
                )}
                <div className="form-grid">
                  <div className="form-group" style={{gridColumn: '1 / -1'}}>
                    <label>Preferred Date</label>
                    <input type="date" name="date" className="input" value={formData.date} onChange={handleChange} />
                  </div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}>
                    <label>Preferred Time</label>
                    <div className="time-grid mt-md">
                      {['09:00 AM', '10:30 AM', '01:15 PM', '03:00 PM', '04:30 PM'].map(time => (
                        <button 
                          key={time} 
                          className={`time-btn ${formData.time === time ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, time })}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-actions mt-2xl" style={{display: 'flex', gap: 16}}>
                  <button className="btn btn-outline btn-lg" style={{flex: 1}} onClick={prevStep}>Back</button>
                  <button className="btn btn-gold btn-lg" style={{flex: 2}} onClick={nextStep} disabled={!formData.date || !formData.time}>
                    Review Details
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Confirm */}
            {currentStep === 4 && (
              <div className="step-panel animate-fade-in-up">
                <h2 className="text-heading mb-xl">Confirm Appointment</h2>
                
                <div className="confirm-summary">
                  <div className="summary-row">
                    <span className="s-lbl">Patient</span>
                    <span className="s-val">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="summary-row">
                    <span className="s-lbl">Doctor</span>
                    <span className="s-val text-gold">{selectedDoc?.name}</span>
                  </div>
                  <div className="summary-row">
                    <span className="s-lbl">Hospital</span>
                    <span className="s-val">{selectedDoc?.hospital}</span>
                  </div>
                  <div className="summary-row">
                    <span className="s-lbl">Date & Time</span>
                    <span className="s-val">{formData.date} at {formData.time}</span>
                  </div>
                  <div className="summary-row">
                    <span className="s-lbl">Consultation Fee</span>
                    <span className="s-val">{selectedDoc?.fee}</span>
                  </div>
                </div>

                <div className="form-actions mt-2xl" style={{display: 'flex', gap: 16}}>
                  <button className="btn btn-outline btn-lg" style={{flex: 1}} onClick={prevStep}>Edit Details</button>
                  <button className="btn btn-gold btn-lg" style={{flex: 2}} onClick={nextStep}>
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Success */}
            {currentStep === 5 && (
              <div className="step-panel success-panel animate-fade-in-up">
                <div className="success-icon mb-xl">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="#D4AF37" strokeWidth="2" />
                    <path d="M14 24L21 31L34 16" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-display-sm gradient-text-gold mb-md">Booking Confirmed</h2>
                <p className="text-body mb-2xl text-center">Your appointment with {selectedDoc?.name} has been successfully scheduled. A confirmation has been sent to your email.</p>
                
                <div className="reference-card mb-2xl">
                  <p>Reference Number</p>
                  <h3>REF-8849-DX</h3>
                </div>

                <div className="success-actions" style={{display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400}}>
                  <Link to="/dashboard" className="btn btn-gold btn-lg w-full">Go to Dashboard</Link>
                  <button className="btn btn-outline btn-lg w-full" onClick={() => window.print()}>Download Receipt</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
