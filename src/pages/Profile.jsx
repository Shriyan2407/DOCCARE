import React, { useContext, useState } from 'react';
import { HospitalContext } from '../context/HospitalContext';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { profile, updateProfile } = useContext(HospitalContext);
  
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <motion.div 
      style={{ maxWidth: '700px', margin: '0 auto' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center flex flex-col items-center mb-8">
        <div className="lx-label">Identity</div>
        <h2 className="page-title">Health <span className="blue-text">Profile</span></h2>
        <p className="page-subtitle">Manage your personal and medical information securely.</p>
      </div>

      <div className="lx-card" style={{ padding: '3.5rem 3rem' }}>
        <div className="flex justify-between items-start mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', fontFamily: "'Clash Display', sans-serif" }}
            >
              {profile.name.charAt(0)}
            </motion.div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#fff', fontFamily: "'Clash Display', sans-serif", letterSpacing: '-0.02em' }}>{profile.name}</h3>
              <p style={{ color: '#A1A1AA', fontSize: '1.1rem', marginTop: '0.2rem', fontFamily: 'Inter, sans-serif' }}>{profile.email}</p>
              <span className="badge badge-primary mt-3">Verified Patient</span>
            </div>
          </div>
          <button 
            className="btn btn-ghost"
            onClick={() => setIsEditing(!isEditing)}
            style={{ borderRadius: '12px' }}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="form-group mb-0">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Phone</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Blood Group</label>
              <select 
                className="form-control"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                disabled={!isEditing}
                style={{ backgroundColor: 'var(--card)' }}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Address</label>
              <textarea 
                className="form-control"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                disabled={!isEditing}
                rows="3"
                style={{ resize: 'none' }}
              ></textarea>
            </div>
          </div>

          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', marginTop: '1rem' }}>
                  Save Changes
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
