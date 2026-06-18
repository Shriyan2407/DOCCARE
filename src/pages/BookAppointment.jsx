import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HospitalContext } from '../context/HospitalContext';
import { motion, AnimatePresence } from 'framer-motion';

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctors, addAppointment, profile } = useContext(HospitalContext);
  
  const initialDoctorId = location.state?.doctorId || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: profile.name || '',
    age: '',
    gender: '',
    doctorId: initialDoctorId,
    date: '',
    timeSlot: '',
    symptoms: ''
  });

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    let tempErrors = {};
    if (!formData.patientName) tempErrors.patientName = "Name is required";
    if (!formData.age || formData.age <= 0) tempErrors.age = "Valid age is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.doctorId) tempErrors.doctorId = "Please select a doctor";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep2 = () => {
    let tempErrors = {};
    if (!formData.date) tempErrors.date = "Date is required";
    if (!formData.timeSlot) tempErrors.timeSlot = "Time slot is required";
    if (!formData.symptoms) tempErrors.symptoms = "Please describe your symptoms";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep1()) setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));
      addAppointment({
        ...formData,
        doctorName: selectedDoctor.name,
      });
      alert('Appointment booked successfully!');
      navigate('/appointments');
    }
  };

  return (
    <motion.div 
      style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient Breathing Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1,
        animation: 'breathingGlow 8s ease-in-out infinite alternate',
      }}></div>

      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1,
        animation: 'breathingGlow 8s ease-in-out infinite alternate-reverse',
      }}></div>

      <style>{`
        @keyframes breathingGlow {
          0% { opacity: 0.5; transform: translateX(-50%) scale(0.9); }
          100% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }
      `}</style>
      <div className="text-center flex flex-col items-center mb-8">
        <div className="lx-label">Reservations</div>
        <h2 className="page-title">Book <span className="blue-text">Appointment</span></h2>
        <p className="page-subtitle">Schedule a consultation with our elite specialists.</p>
      </div>

      <div className="lx-card" style={{ padding: '3.5rem 3rem' }}>
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 relative" style={{ width: '60%', margin: '0 auto 3rem auto' }}>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 0, borderRadius: '4px' }}></div>
          <div style={{ width: step === 2 ? '100%' : '0%', height: '4px', background: '#3B82F6', position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 1, transition: 'width 0.4s ease', borderRadius: '4px' }}></div>
          
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(96,165,250,0.1)', border: '1px solid #60A5FA', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, fontWeight: 'bold', boxShadow: '0 0 20px rgba(96,165,250,0.5)', backdropFilter: 'blur(10px)' }}>1</div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: step === 2 ? 'rgba(96,165,250,0.1)' : 'rgba(255,255,255,0.02)', border: step === 2 ? '1px solid #60A5FA' : '1px solid rgba(255,255,255,0.1)', color: step === 2 ? '#60A5FA' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, fontWeight: 'bold', transition: 'all 0.4s ease', boxShadow: step === 2 ? '0 0 20px rgba(96,165,250,0.5)' : 'none', backdropFilter: 'blur(10px)' }}>2</div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Patient Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={formData.patientName}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      placeholder="Enter full name"
                    />
                    {errors.patientName && <small className="badge badge-danger mt-1">{errors.patientName}</small>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input 
                      type="number" 
                      className="form-control"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="Years"
                    />
                    {errors.age && <small className="badge badge-danger mt-1">{errors.age}</small>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select 
                      className="form-control"
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      style={{ backgroundColor: 'var(--card)' }}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <small className="badge badge-danger mt-1">{errors.gender}</small>}
                  </div>

                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Select Specialist</label>
                    <select 
                      className="form-control"
                      value={formData.doctorId}
                      onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                      style={{ backgroundColor: 'var(--card)' }}
                    >
                      <option value="">Choose a Specialist</option>
                      {doctors.map(doc => (
                        <option key={doc.id} value={doc.id}>
                          Dr. {doc.name} ({doc.specialization}) - ⭐{doc.rating}
                        </option>
                      ))}
                    </select>
                    {errors.doctorId && <small className="badge badge-danger mt-1">{errors.doctorId}</small>}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    Next Step ➔
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Appointment Date</label>
                    <input 
                      type="date" 
                      className="form-control"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.date && <small className="badge badge-danger mt-1">{errors.date}</small>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Time Slot</label>
                    <select 
                      className="form-control"
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                      style={{ backgroundColor: 'var(--card)' }}
                    >
                      <option value="">Select Time</option>
                      <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="10:30 AM - 11:30 AM">10:30 AM - 11:30 AM</option>
                      <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                      <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM</option>
                      <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    </select>
                    {errors.timeSlot && <small className="badge badge-danger mt-1">{errors.timeSlot}</small>}
                  </div>

                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Symptoms & Reason for Visit</label>
                    <textarea 
                      className="form-control"
                      rows="4"
                      value={formData.symptoms}
                      onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                      placeholder="Please describe your symptoms or reason for consultation in detail..."
                      style={{ resize: 'none' }}
                    ></textarea>
                    {errors.symptoms && <small className="badge badge-danger mt-1">{errors.symptoms}</small>}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button type="button" className="btn btn-ghost" onClick={prevStep}>
                    ⬅ Back
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                    Confirm Booking ✓
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
};

export default BookAppointment;
