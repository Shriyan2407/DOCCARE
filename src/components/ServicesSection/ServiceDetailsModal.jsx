import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ServiceDetailsModal = ({ isOpen, onClose, service }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000
            }}
          />
          <motion.div
            className="slide-over-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '500px',
              background: 'var(--bg-primary)',
              borderLeft: '1px solid var(--gold-border)',
              zIndex: 1001,
              padding: '40px',
              overflowY: 'auto',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.5)'
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div style={{ marginBottom: '32px', marginTop: '20px' }}>
              <div style={{ color: 'var(--gold)', marginBottom: '16px' }}>{service.icon}</div>
              <h2 className="text-display-sm gradient-text-gold">{service.title}</h2>
            </div>

            <div className="panel-section" style={{ marginBottom: '32px' }}>
              <h3 className="text-heading" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Department Overview</h3>
              <p className="text-body" style={{ lineHeight: 1.6 }}>{service.description}</p>
            </div>

            <div className="panel-section" style={{ marginBottom: '32px' }}>
              <h3 className="text-heading" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Metrics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Specialists</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{service.specialistsCount}</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wait Time</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{service.waitTime}</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Satisfaction</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>{service.successRate}</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Operating Hours</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>24/7</div>
                </div>
              </div>
            </div>

            <div className="panel-section" style={{ marginBottom: '40px' }}>
              <h3 className="text-heading" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Consultation Types</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {service.tags.map(tag => (
                  <span key={tag} className="badge badge-outline" style={{ background: 'rgba(255,255,255,0.02)' }}>{tag}</span>
                ))}
              </div>
            </div>

            <Link 
              to={`/book?specialty=${service.id}`} 
              className="btn btn-gold btn-lg w-full"
              style={{ display: 'block', textAlign: 'center' }}
            >
              Book Appointment Now
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
