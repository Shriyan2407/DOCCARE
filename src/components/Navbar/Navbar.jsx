import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import './Navbar.css';

/* ========================================================
   MAGNETIC WRAPPER
   ======================================================== */
const MagneticWrapper = ({ children, intensity = 0.15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      style={{ display: "inline-flex" }}
    >
      {children}
    </motion.div>
  );
};

/* ========================================================
   NAV LINKS WITH ACTIVE PILL
   ======================================================== */
const navTabs = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '/#services' },
  { title: 'Assistant', href: '/health-assistant' },
  { title: 'Specialists', href: '/specialists' },
  { title: 'Insights', href: '/#insights' },
];

/* ========================================================
   MAIN COMPONENT
   ======================================================== */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { scrollY } = useScroll();
  
  // Smooth scroll transformations for dynamic sizing and blur
  const smoothY = useSpring(scrollY, { stiffness: 400, damping: 40 });
  const navWidth = useTransform(smoothY, [0, 100], ["1400px", "1200px"]);
  const navHeight = useTransform(smoothY, [0, 100], ["80px", "64px"]);
  const blurValue = useTransform(smoothY, [0, 100], ["blur(20px)", "blur(40px)"]);
  const shadowValue = useTransform(smoothY, [0, 100], 
    ["0 20px 60px rgba(0,0,0,0.6)", "0 30px 80px rgba(0,0,0,0.85)"]
  );

  const getActiveTab = () => {
    if (location.pathname === '/' && !location.hash) return 'Home';
    const match = navTabs.find(tab => 
      tab.href === location.pathname || 
      (tab.href.startsWith('/#') && tab.href.replace('/', '') === location.hash)
    );
    return match ? match.title : null;
  };

  const activeTab = getActiveTab();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav 
        className="navbar-3d"
        style={{
          width: navWidth,
          height: navHeight,
          backdropFilter: blurValue,
          boxShadow: shadowValue
        }}
      >
        {/* Layered Glass Effects */}
        <div className="navbar-glass-layer" />
        <div className="navbar-ambient-glow" />

        <div className="navbar-content">
          {/* LOGO */}
          <MagneticWrapper intensity={0.05}>
            <Link to="/" className="navbar-logo">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="url(#logoGold)" strokeWidth="2" />
                <path d="M14 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="url(#logoGold)" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 29c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="url(#logoGold)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="24" cy="34" r="2" fill="url(#logoGold)" />
                <defs>
                  <linearGradient id="logoGold" x1="0" y1="0" x2="48" y2="48">
                    <stop stopColor="#D4AF37" />
                    <stop offset="1" stopColor="#E6C56A" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="navbar-wordmark">DOC<span className="text-gold">CARE</span></span>
            </Link>
          </MagneticWrapper>

          {/* DESKTOP LINKS */}
          <div className="navbar-links" onMouseLeave={() => setHoveredTab(null)}>
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.title;
              const isHovered = hoveredTab === tab.title;

              return (
                <a
                  key={tab.title}
                  href={tab.href}
                  onClick={(e) => handleLinkClick(e, tab.href)}
                  onMouseEnter={() => setHoveredTab(tab.title)}
                  className="nav-link-3d"
                >
                  <span className="relative z-10">{tab.title}</span>

                  {/* Hover Glow */}
                  {isHovered && (
                    <motion.div
                      layoutId="nav-hover"
                      className="nav-hover-glow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  {/* Active Pill (Apple Style) */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="nav-active-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <div className="nav-active-pill-glow" />
                    </motion.div>
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA BUTTON */}
          <div className="navbar-ctas">
            <MagneticWrapper intensity={0.2}>
              <motion.a
                href="/book"
                onClick={(e) => handleLinkClick(e, '/book')}
                className="liquid-gold-btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 1 }}
              >
                <div className="liquid-gold-btn-bg" />
                <div className="liquid-gold-btn-shine" />
                <div className="liquid-gold-btn-glass" />
                <span className="relative z-10">Book Appointment</span>
              </motion.a>
            </MagneticWrapper>
          </div>

          {/* MOBILE BURGER */}
          <button
            className={`navbar-burger ${mobileOpen ? 'navbar-burger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU (kept simple) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            className="navbar-mobile-3d"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {navTabs.map(tab => (
              <a key={tab.title} href={tab.href} className="navbar-mobile-link" onClick={(e) => handleLinkClick(e, tab.href)}>
                {tab.title}
              </a>
            ))}
            <div className="navbar-mobile-divider" />
            <a href="/book" className="liquid-gold-btn mt-4 w-full justify-center" onClick={(e) => handleLinkClick(e, '/book')}>
              <span className="relative z-10">Book Appointment</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
