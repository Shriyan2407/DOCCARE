import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Share2, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const navColumns = [
    {
      heading: 'Platform',
      links: [
        { label: 'Find Specialists', to: '/doctors' },
        { label: 'Book Appointment', to: '/book-appointment' },
        { label: 'My Appointments', to: '/appointments' },
        { label: 'Health Records', to: '/patient-records' },
      ],
    },
    {
      heading: 'Account',
      links: [
        { label: 'My Profile', to: '/profile' },
        { label: 'About MediCare', to: '/about' },
      ],
    },
  ];

  return (
    <footer className="footer">
      {/* Top gold glow line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.4), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Ambient bottom glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '25%', right: '25%',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="footer-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 34, height: 34,
                background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                borderRadius: 9,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <span style={{
                fontFamily: "'Clash Display', 'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: '1.125rem',
                color: '#fff',
                letterSpacing: '-0.04em',
              }}>
                MediCare
              </span>
            </div>
            <p style={{
              color: 'var(--text-4)', /* Improved contrast from #52525B to #94A3B8 */
              fontSize: '0.875rem',
              lineHeight: 1.75,
              maxWidth: '260px',
              margin: '0 0 1.75rem',
              fontFamily: 'var(--font-body)',
            }}>
              Healthcare Without Compromise. The world's most premium AI-powered healthcare platform.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {[
                { Icon: Globe, label: 'Website' },
                { Icon: Share2, label: 'Social' },
                { Icon: Mail, label: 'Contact' },
              ].map(({ Icon, label }) => (
                <motion.button
                  key={label}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 34, height: 34,
                    borderRadius: 9,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#52525B',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease, background 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-4)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <Icon size={16} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-1)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-heading)',
              }}>
                {col.heading}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {col.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      style={{
                        color: 'var(--text-4)',
                        fontSize: '0.875rem',
                        transition: 'color 0.2s ease',
                        display: 'inline-block',
                        fontFamily: 'var(--font-body)',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--white)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-4)'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p className="footer-copyright" style={{ color: 'var(--text-5)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} DocCare. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-5)', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
            <span>Crafted with</span>
            <Heart size={13} fill="#3B82F6" color="#3B82F6" style={{ animation: 'heartbeat 2s ease-in-out infinite' }} />
            <span>for exceptional care</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy', 'Terms', 'HIPAA'].map((item) => (
              <a key={item} href="#" style={{ color: 'var(--text-5)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-5)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.25); }
          28% { transform: scale(1); }
          42% { transform: scale(1.18); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
