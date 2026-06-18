import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Brain, Activity, Zap, Clock, TrendingUp } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import LuxuryMarquee from '../components/LuxuryMarquee';

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════════
   LUXURY FEATURE DATA
   ════════════════════════════════════════════════ */
const features = [
  {
    num: '01',
    icon: Activity,
    title: 'Elite Specialists',
    subtitle: 'Curated Medical Excellence',
    description: 'Access to 150+ world-class specialists rigorously vetted for clinical brilliance. Each physician represents the pinnacle of their field.',
    stat: '150+',
    statLabel: 'Specialists',
  },
  {
    num: '02',
    icon: Brain,
    title: 'AI Diagnostics',
    subtitle: 'Intelligence at Scale',
    description: 'Our proprietary diagnostic engine analyses over 2,400 health parameters to surface insights invisible to the human eye.',
    stat: '2,400+',
    statLabel: 'Parameters',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'Predictive Healthcare',
    subtitle: 'Foresight, Not Hindsight',
    description: 'Machine learning models trained on 50 million patient outcomes predict risks before they manifest. Stay perpetually ahead.',
    stat: '94%',
    statLabel: 'Accuracy',
  },
  {
    num: '04',
    icon: Shield,
    title: 'Military-Grade Security',
    subtitle: 'Zero Compromise',
    description: 'End-to-end encryption, zero-knowledge architecture, and ISO 27001 compliance. Your data is sovereign territory.',
    stat: '256-bit',
    statLabel: 'Encryption',
  },
  {
    num: '05',
    icon: Clock,
    title: '24/7 Medical Care',
    subtitle: 'Always Available',
    description: 'Round-the-clock access to physicians, emergency triage, and priority escalation. Because health crises observe no schedule.',
    stat: '<2 min',
    statLabel: 'Response',
  },
  {
    num: '06',
    icon: Zap,
    title: 'Health Intelligence',
    subtitle: 'Your Biological Blueprint',
    description: 'Continuous biometric monitoring synthesized into a personal health operating system. Live optimally, indefinitely.',
    stat: '24/7',
    statLabel: 'Monitoring',
  },
];

/* ════════════════════════════════════════════════
   STAT DATA
   ════════════════════════════════════════════════ */
const stats = [
  { value: 150, suffix: '+', label: 'Elite Specialists' },
  { value: 99.9, suffix: '%', label: 'Patient Satisfaction', decimal: true },
  { value: 10000, suffix: '+', label: 'Monthly Appointments', format: true },
  { value: '24/7', label: 'Medical Support', static: true },
];

/* ════════════════════════════════════════════════
   COUNT-UP HOOK — RAF-based, no GSAP object limitation
   ════════════════════════════════════════════════ */
const useCountUp = (ref, end, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;
    const { decimal, format } = options;
    const duration = 2500; // ms
    let startTime = null;
    let rafId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const tick = (now) => {
          if (!startTime) startTime = now;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * end;

          if (ref.current) {
            if (decimal) ref.current.textContent = current.toFixed(1);
            else if (format) ref.current.textContent = Math.round(current).toLocaleString();
            else ref.current.textContent = Math.round(current);
          }

          if (progress < 1) rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    if (ref.current?.parentElement) {
      observer.observe(ref.current.parentElement);
    }

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
};

/* Animated stat number */
const AnimatedStat = ({ stat }) => {
  const numRef = useRef(null);
  if (!stat.static) {
    useCountUp(numRef, stat.value, { decimal: stat.decimal, format: stat.format });
  }

  return (
    <div style={{ textAlign: 'center', padding: '3rem 2rem', position: 'relative' }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(3.5rem, 6vw, 6rem)',
        fontWeight: 700,
        letterSpacing: '-0.05em',
        lineHeight: 1,
        marginBottom: '0.75rem',
        background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #3B82F6 100%)',
        backgroundSize: '200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'blue-shimmer 3s ease infinite alternate',
      }}>
        <span ref={numRef}>{stat.static ? stat.value : '0'}</span>
        {stat.suffix && (
          <span style={{ fontSize: '60%', WebkitTextFillColor: 'rgba(59,130,246,0.7)' }}>{stat.suffix}</span>
        )}
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#71717A',
      }}>
        {stat.label}
      </div>

      {/* Vertical blue divider */}
      <div style={{
        position: 'absolute',
        right: 0, top: '20%', bottom: '20%',
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.2), transparent)',
      }} />
    </div>
  );
};

/* ════════════════════════════════════════════════
   HOME PAGE
   ════════════════════════════════════════════════ */
const Home = () => {
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  /* GSAP ScrollTrigger — Feature cards sequential reveal */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.feature-lx-card');

      /* Camera Zoom effect into features */
      gsap.fromTo(featuresRef.current, 
        { scale: 0.9, opacity: 0.5 },
        { 
          scale: 1, opacity: 1, 
          ease: 'power3.out', 
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 95%',
            end: 'top 30%',
            scrub: 1
          } 
        }
      );

      /* Cards assemble dynamically */
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 120, x: i % 2 === 0 ? -50 : 50, rotateY: i % 2 === 0 ? -15 : 15, filter: 'blur(15px)' },
          {
            opacity: 1, y: 0, x: 0, rotateY: 0, filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* Stats section reveal (parallax) */
      gsap.fromTo(statsRef.current,
        { backgroundPositionY: '100px' },
        {
          backgroundPositionY: '-100px',
          ease: 'none',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      gsap.fromTo('.stat-lx-item',
        { opacity: 0, y: 60, scale: 0.9, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 75%',
          }
        }
      );

      /* CTA section cinematic fade transition */
      gsap.fromTo('.cta-lx-content',
        { opacity: 0, scale: 0.95, filter: 'blur(20px)' },
        {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 60%',
          }
        }
      );

    }, document.body);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ══ HERO (untouched) ══ */}
      <HeroSection />

      {/* ══════════════════════════════════════════
          SECTION 1 — LUXURY FEATURES
          ══════════════════════════════════════════ */}
      <section ref={featuresRef} className="lx-section section-navy">
        <div className="lx-container">
          {/* Header */}
          <div className="lx-section-header">
            <div className="lx-label">Platform Capabilities</div>
            <h2 style={{ marginBottom: '1.25rem', lineHeight: 1.0 }}>
              Designed for those<br />
              <span className="blue-text">who accept no compromise.</span>
            </h2>
            <p style={{
              fontSize: '1.0625rem',
              color: '#71717A',
              maxWidth: '520px',
              margin: '0 auto',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.7,
            }}>
              Every feature is engineered to the same standard as the world's most exclusive private hospitals — but accessible from anywhere.
            </p>
          </div>

          {/* Feature cards — 2 columns, staggered by scroll */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}>
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — PREMIUM STATISTICS
          ══════════════════════════════════════════ */}
      <section ref={statsRef} className="lx-section-sm section-sapphire" style={{
        borderTop: '1px solid rgba(59,130,246,0.1)',
        borderBottom: '1px solid rgba(59,130,246,0.1)',
        overflow: 'hidden',
      }}>
        <div className="lx-container">
          {/* Section label */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="lx-label">By The Numbers</div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            position: 'relative',
          }}>
            {stats.map((stat, i) => (
              <div key={i} className="stat-lx-item" style={{ opacity: 0 }}>
                <AnimatedStat stat={stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — MARQUEE TESTIMONIALS
          ══════════════════════════════════════════ */}
      <section className="lx-section section-midnight" style={{
        borderTop: '1px solid rgba(59,130,246,0.06)',
        borderBottom: '1px solid rgba(59,130,246,0.06)',
        overflow: 'hidden',
        padding: '7rem 0',
      }}>
        <div className="lx-container" style={{ marginBottom: '4rem' }}>
          <div className="lx-section-header" style={{ marginBottom: '0' }}>
            <div className="lx-label">What Our Clients Say</div>
            <h2 style={{ marginBottom: '0', lineHeight: 1.0 }}>
              Trusted by the<br />
              <span className="blue-text">world's elite.</span>
            </h2>
          </div>
        </div>

        {/* Full-width marquee (no container constraint) */}
        <div style={{ width: '100%' }}>
          <LuxuryMarquee />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — CINEMATIC CTA
          ══════════════════════════════════════════ */}
      <section ref={ctaRef} className="lx-section section-glow" style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Animated blue light beams */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          {/* Central radial */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '900px', height: '900px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)',
            borderRadius: '50%',
            animation: 'cta-pulse 6s ease-in-out infinite',
          }} />

          {/* Light beam 1 */}
          <div style={{
            position: 'absolute',
            top: '-20%', left: '30%',
            width: '2px', height: '150%',
            background: 'linear-gradient(to bottom, transparent, rgba(56,189,248,0.2), transparent)',
            transform: 'rotate(-20deg)',
            animation: 'beam-drift 8s ease-in-out infinite alternate',
          }} />

          {/* Light beam 2 */}
          <div style={{
            position: 'absolute',
            top: '-20%', left: '50%',
            width: '1px', height: '150%',
            background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.15), transparent)',
            transform: 'rotate(10deg)',
            animation: 'beam-drift 10s ease-in-out infinite alternate-reverse',
          }} />

          {/* Light beam 3 */}
          <div style={{
            position: 'absolute',
            top: '-20%', left: '65%',
            width: '2px', height: '150%',
            background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.18), transparent)',
            transform: 'rotate(-5deg)',
            animation: 'beam-drift 7s ease-in-out infinite alternate',
          }} />

          {/* Horizontal top glow */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.4), transparent)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.25), transparent)',
          }} />

          {/* Corner blue glows */}
          <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        {/* CTA Content */}
        <div className="cta-lx-content lx-container" style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          opacity: 0,
        }}>
          <div className="lx-label" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            Your Journey Begins
          </div>

          <h2 style={{
            fontFamily: "'Clash Display', 'Satoshi', sans-serif",
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: 0.9,
            marginBottom: '2rem',
            color: '#fff',
          }}>
            Experience<br />
            <span className="blue-text">Healthcare</span><br />
            Without Limits.
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: '#71717A',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            maxWidth: '480px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
          }}>
            Join the world's most discerning individuals who refuse to compromise on their health. Your membership begins with a single appointment.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link
              to="/book-appointment"
              className="btn btn-primary btn-xl"
              id="cta-book-btn"
            >
              Begin Your Journey
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/doctors"
              className="btn btn-ghost btn-xl"
              id="cta-explore-btn"
            >
              Meet Our Specialists
            </Link>
          </div>

          {/* Trust strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            flexWrap: 'wrap',
          }}>
            {[
              'HIPAA Compliant',
              'ISO 27001 Certified',
              'SOC 2 Type II',
              'No Hidden Fees',
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                color: '#52525B',
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}>
                <div style={{
                  width: 16, height: 16,
                  borderRadius: '50%',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes cta-pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
            50%       { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          }
          @keyframes beam-drift {
            0%   { opacity: 0.4; transform: rotate(var(--r, -20deg)) translateX(0); }
            100% { opacity: 1;   transform: rotate(var(--r, -20deg)) translateX(30px); }
          }
        `}</style>
      </section>

    </div>
  );
};

/* ════════════════════════════════════════════════
   FEATURE CARD — Dark glass, blue glow, 3D tilt
   ════════════════════════════════════════════════ */
const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const Icon = feature.icon;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1200px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateZ(10px)`;
    card.style.boxShadow = `
      0 0 80px rgba(59,130,246,0.15),
      ${-x * 20}px ${-y * 15}px 40px rgba(0,0,0,0.6)
    `;
    card.style.borderColor = 'rgba(59,130,246,0.4)';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = 'var(--card-shadow)';
    card.style.borderColor = 'rgba(255,255,255,0.08)';
    card.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s ease, border-color 0.5s ease';
  };

  return (
    <div
      ref={cardRef}
      className="feature-lx-card"
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 0 50px rgba(59,130,246,0.08)',
        borderRadius: '32px',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        opacity: 0, // GSAP will animate this
        willChange: 'transform',
        cursor: 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blue shimmer top */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%', right: '10%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.5), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Inner corner glow */}
      <div style={{
        position: 'absolute',
        top: -40, right: -40,
        width: 120, height: 120,
        borderRadius: '50%',
        background: 'rgba(59,130,246,0.1)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      {/* Number */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        color: 'rgba(59,130,246,0.6)',
        marginBottom: '2rem',
        textTransform: 'uppercase',
      }}>
        {feature.num}
      </div>

      {/* Icon + stat row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', gap: '1rem' }}>
        <div style={{
          width: 52, height: 52,
          borderRadius: 16,
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#60A5FA',
          flexShrink: 0,
          boxShadow: '0 4px 20px rgba(59,130,246,0.15)',
        }}>
          <Icon size={24} />
        </div>

        {/* Stat badge */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#60A5FA',
            lineHeight: 1,
          }}>
            {feature.stat}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            color: '#52525B',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}>
            {feature.statLabel}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Clash Display', 'Satoshi', sans-serif",
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        color: '#fff',
        marginBottom: '0.35rem',
        lineHeight: 1.1,
      }}>
        {feature.title}
      </h3>

      {/* Subtitle */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(96,165,250,0.8)',
        marginBottom: '1rem',
      }}>
        {feature.subtitle}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        color: '#71717A',
        fontSize: '0.9rem',
        lineHeight: 1.75,
        margin: 0,
      }}>
        {feature.description}
      </p>

      {/* Bottom blue accent line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '2.5rem', right: '2.5rem',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default Home;
