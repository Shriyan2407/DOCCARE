import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Calendar, UserCheck, Star, Activity, Heart,
  Shield, Zap, TrendingUp, Clock, ChevronRight
} from 'lucide-react';
import { gsap } from 'gsap';
import './HeroSection.css';

/* ── Floating 3D Card component ── */
const FloatingCard = ({ children, className, delay = 0, depth = 40, floatDistance = 12 }) => {
  return (
    <motion.div
      className={`hero-float-card ${className}`}
      style={{ '--depth': `${depth}px` }}
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -floatDistance, 0] }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'loop',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/* ── Stat counter ── */
const StatBadge = ({ icon: Icon, value, label, color }) => (
  <div className="hero-stat-badge" style={{ '--badge-color': color }}>
    <div className="hero-stat-icon">
      <Icon size={16} />
    </div>
    <div className="hero-stat-text">
      <span className="hero-stat-value">{value}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  </div>
);

const HeroSection = () => {
  const containerRef = useRef(null);
  const dashboardRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const badgeRef = useRef(null);
  const tiltActive = useRef(false);

  // ── GSAP cinematic text reveal on mount ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial state
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        opacity: 0,
        y: 80,
        filter: 'blur(16px)',
      });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30, filter: 'blur(8px)' });
      gsap.set(actionsRef.current, { opacity: 0, y: 20 });
      gsap.set(badgeRef.current, { opacity: 0, y: -12, filter: 'blur(4px)' });

      // Reveal sequence
      tl.to(badgeRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, 0.3)
        .to(line1Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }, 0.5)
        .to(line2Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }, 0.7)
        .to(line3Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }, 0.9)
        .to(subtitleRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 }, 1.1)
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.4);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── 3D dashboard tilt on mouse move ──
  useEffect(() => {
    const container = containerRef.current;
    const dashboard = dashboardRef.current;
    if (!dashboard) return;

    let rafId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      dashboard.style.transform = `
        perspective(2000px)
        rotateX(${currentY}deg)
        rotateY(${currentX}deg)
        translateZ(0px)
      `;
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);
      targetX = dx * 12;
      targetY = -dy * 8;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    rafId = requestAnimationFrame(tick);
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // ── Ambient pulse for breathing light ──
  const [pulsePhase, setPulsePhase] = useState(0);
  useEffect(() => {
    let frame;
    let start = performance.now();
    const tick = (now) => {
      setPulsePhase(((now - start) / 8000) * Math.PI * 2);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const ambientOpacity = 0.08 + 0.04 * Math.sin(pulsePhase);

  return (
    <section className="hero-section" ref={containerRef}>

      {/* ── Ambient breathing light ── */}
      <div
        className="hero-ambient-light"
        style={{ opacity: ambientOpacity }}
        aria-hidden="true"
      />

      {/* ── Noise texture ── */}
      <div className="hero-noise" aria-hidden="true" />

      {/* ── Main layout ── */}
      <div className="hero-container">

        {/* LEFT: Content */}
        <div className="hero-content">

          {/* Eyebrow badge */}
          <div ref={badgeRef} className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            <span>AI Healthcare OS · Est. 1995</span>
          </div>

          {/* Cinematic headline */}
          <h1 className="hero-title">
            <span ref={line1Ref} className="hero-title-line">The Future of</span>
            <span ref={line2Ref} className="hero-title-line hero-title-gradient">
              Healthcare
            </span>
            <span ref={line3Ref} className="hero-title-line">Is Here.</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="hero-subtitle">
            Experience a premium AI-powered healthcare operating system. Connect with elite specialists, manage your health records, and get intelligent insights — all in one cinematic platform.
          </p>

          {/* CTAs */}
          <div ref={actionsRef} className="hero-actions">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/book-appointment" className="hero-btn hero-btn-primary" id="hero-book-btn">
                Book Appointment
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/doctors" className="hero-btn hero-btn-secondary" id="hero-explore-btn">
                Explore Doctors
                <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Trust indicators */}
          <div className="hero-trust">
            <div className="hero-avatars">
              {['👩‍⚕️', '👨‍⚕️', '🧑‍⚕️', '👩‍⚕️'].map((emoji, i) => (
                <div key={i} className="hero-avatar" style={{ zIndex: 4 - i, marginLeft: i === 0 ? 0 : '-10px' }}>
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <div className="hero-trust-stars">{'★★★★★'}</div>
              <p className="hero-trust-text">Trusted by 50,000+ patients</p>
            </div>
          </div>
        </div>

        {/* RIGHT: 3D Dashboard */}
        <div className="hero-visual">
          <div ref={dashboardRef} className="hero-dashboard-scene" style={{ transformStyle: 'preserve-3d' }}>

            {/* Main Dashboard Panel */}
            <motion.div
              className="dashboard-panel"
              initial={{ opacity: 0, scale: 0.85, rotateY: -20, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Dashboard header */}
              <div className="dp-header">
                <div className="dp-dots">
                  <span className="dp-dot" style={{ background: '#ff5f57' }} />
                  <span className="dp-dot" style={{ background: '#febc2e' }} />
                  <span className="dp-dot" style={{ background: '#28c840' }} />
                </div>
                <div className="dp-title">
                  <Activity size={12} />
                  <span>Health Dashboard</span>
                </div>
                <div className="dp-live">
                  <span className="dp-live-dot" />
                  Live
                </div>
              </div>

              {/* Dashboard body */}
              <div className="dp-body">
                {/* Stats row */}
                <div className="dp-stats-row">
                  {[
                    { label: 'Heart Rate', value: '72', unit: 'bpm', color: '#f43f5e', icon: '❤️' },
                    { label: 'Blood O₂', value: '98', unit: '%', color: '#3b82f6', icon: '🫁' },
                    { label: 'Steps', value: '8.4k', unit: '/day', color: '#10b981', icon: '👣' },
                  ].map((stat, i) => (
                    <div key={i} className="dp-stat-card" style={{ '--sc': stat.color }}>
                      <div className="dp-stat-icon">{stat.icon}</div>
                      <div className="dp-stat-val">{stat.value}<span>{stat.unit}</span></div>
                      <div className="dp-stat-label">{stat.label}</div>
                      <div className="dp-stat-bar">
                        <motion.div
                          className="dp-stat-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: ['40%', '70%', '55%', '80%', '65%'][i % 5] }}
                          transition={{ duration: 2, delay: 1 + i * 0.3, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="dp-chart">
                  <div className="dp-chart-header">
                    <span className="dp-chart-title">Health Trend — 7 days</span>
                    <span className="dp-chart-badge">+12.4%</span>
                  </div>
                  <div className="dp-chart-bars">
                    {[65, 72, 58, 80, 70, 88, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        className="dp-bar"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 + i * 0.08, ease: 'backOut' }}
                        style={{
                          height: `${h}%`,
                          background: i === 5
                            ? 'linear-gradient(to top, #3b82f6, #818cf8)'
                            : 'rgba(59,130,246,0.25)',
                          transformOrigin: 'bottom',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Upcoming appointment */}
                <div className="dp-appointment">
                  <div className="dp-appt-avatar">👨‍⚕️</div>
                  <div className="dp-appt-info">
                    <div className="dp-appt-name">Dr. Sarah Chen</div>
                    <div className="dp-appt-specialty">Cardiologist · Today 2:30 PM</div>
                  </div>
                  <div className="dp-appt-status">Confirmed</div>
                </div>
              </div>
            </motion.div>

            {/* Floating satellite cards */}
            <FloatingCard className="hfc-doctors" delay={0.9} depth={70} floatDistance={10}>
              <StatBadge icon={UserCheck} value="150+" label="Elite Specialists" color="#3b82f6" />
            </FloatingCard>

            <FloatingCard className="hfc-appt" delay={1.1} depth={90} floatDistance={14}>
              <StatBadge icon={Calendar} value="10k+" label="Monthly Appts" color="#818cf8" />
            </FloatingCard>

            <FloatingCard className="hfc-rating" delay={1.3} depth={60} floatDistance={8}>
              <StatBadge icon={Star} value="4.98" label="Patient Rating" color="#fbbf24" />
            </FloatingCard>

            <FloatingCard className="hfc-response" delay={1.0} depth={80} floatDistance={12}>
              <StatBadge icon={Zap} value="< 2 min" label="Avg Response" color="#10b981" />
            </FloatingCard>

            {/* AI Insight card */}
            <FloatingCard className="hfc-ai" delay={1.5} depth={50} floatDistance={9}>
              <div className="hero-ai-card">
                <div className="hero-ai-icon">
                  <TrendingUp size={14} />
                </div>
                <div className="hero-ai-text">
                  <div className="hero-ai-title">AI Insight</div>
                  <div className="hero-ai-body">Your health score improved 12% this week</div>
                </div>
              </div>
            </FloatingCard>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="hero-scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="hero-scroll-line" />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
