import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { HospitalContext } from '../context/HospitalContext';
import DoctorCard from '../components/DoctorCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const Doctors = () => {
  const { doctors } = useContext(HospitalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  const specialties = [...new Set(doctors.map((d) => d.specialization))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter ? doctor.specialization === specialtyFilter : true;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="page-content">
      {/* Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>Our Specialists</div>
        <h1 className="page-title">Find Your <span className="gradient-text">Doctor</span></h1>
        <p className="page-subtitle">150+ elite specialists across all major medical fields, vetted for clinical excellence.</p>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        className="lx-card"
        style={{ padding: '1.25rem 1.5rem', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-2" style={{ gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search by doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="doctor-search"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <SlidersHorizontal
              size={17}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <select
              className="form-control"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              id="specialty-filter"
              style={{ paddingLeft: '2.75rem' }}
            >
              <option value="">All Specialties</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results count */}
      <motion.div
        style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.875rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Showing <span style={{ color: '#60a5fa', fontWeight: 600 }}>{filteredDoctors.length}</span> doctor{filteredDoctors.length !== 1 ? 's' : ''}
        {specialtyFilter && <span> in <strong style={{ color: '#f1f5f9' }}>{specialtyFilter}</strong></span>}
      </motion.div>

      {/* Doctor Grid */}
      {filteredDoctors.length === 0 ? (
        <motion.div
          className="glass-card text-center"
          style={{ padding: '4rem 2rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ marginBottom: '0.5rem' }}>No doctors found</h3>
          <p style={{ color: '#64748b' }}>Try adjusting your search or filter criteria.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
          {filteredDoctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <DoctorCard doctor={doctor} index={i} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
