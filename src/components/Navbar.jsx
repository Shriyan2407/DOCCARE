import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinksRef = useRef([]);

  const isActive = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  // Magnetic hover on nav links
  const handleMagneticMove = (e, el) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMagneticLeave = (el) => {
    if (!el) return;
    el.style.transform = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Specialists' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/patient-records', label: 'Records' },
    { path: '/profile', label: 'Profile' },
    { path: '/about', label: 'About' },
  ];

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <div className="nav-brand-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          DocCare
        </Link>

        {/* Desktop nav */}
        <div className="nav-links">
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              className={isActive(item.path)}
              ref={(el) => (navLinksRef.current[i] = el)}
              onMouseMove={(e) => handleMagneticMove(e, navLinksRef.current[i])}
              onMouseLeave={() => handleMagneticLeave(navLinksRef.current[i])}
              style={{ transition: 'transform 0.15s ease, color 0.3s ease, background 0.3s ease' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="nav-cta">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link to="/book-appointment" className="btn btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.85rem', borderRadius: '9999px' }}>
              Book Now
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-links open"
            style={{ position: 'absolute', top: '100%', left: '1rem', right: '1rem', marginTop: '0.5rem' }}
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={isActive(item.path)}>
                {item.label}
              </Link>
            ))}
            <div style={{ padding: '0.5rem 0 0' }}>
              <Link to="/book-appointment" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Book Appointment
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
