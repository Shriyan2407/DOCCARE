import { Link } from 'react-router-dom';
import { GLSLHills } from '@/components/ui/glsl-hills';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section" id="overview">

      {/* ── GLSL Hills — fullscreen cinematic background ── */}
      <div className="hero-hills-canvas" aria-hidden="true" style={{ opacity: 0.8, zIndex: 0 }}>
        <GLSLHills
          width="100%"
          height="100%"
          cameraZ={125}
          planeSize={256}
          speed={0.45}
        />
      </div>

      {/* ── Depth layers ── */}
      <div className="hero-vignette" />
      <div className="hero-gradient-floor" />
      <div className="hero-gradient-top" />

      {/* ── Center brand lockup ── */}
      <div className="hero-brand-lockup">

        {/* Eyebrow badge */}
        <div className="hero-badge animate-fade-in-up stagger-1">
          <span className="status-dot online" />
          <span>AI-Powered Healthcare OS</span>
          <span className="hero-badge-sep">·</span>
          <span className="text-gold">Est. 2026</span>
        </div>

        {/* Wordmark */}
        <div className="hero-wordmark animate-fade-in-up stagger-2">
          <span className="hero-wordmark-doc">DOC</span>
          <span className="hero-wordmark-care">CARE</span>
        </div>

        {/* Gold rule */}
        <div className="hero-rule animate-fade-in-up stagger-3">
          <span className="hero-rule-line" />
          <svg width="18" height="18" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="21" stroke="#D4AF37" strokeWidth="1.4" />
            <path d="M14 24c0-5.523 4.477-10 10-10s10 4.477 10 10"
              stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M19 29c0-2.761 2.239-5 5-5s5 2.239 5 5"
              stroke="#E6C56A" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="24" cy="34" r="2.2" fill="#D4AF37" />
          </svg>
          <span className="hero-rule-line" />
        </div>

        {/* Quote */}
        <p className="hero-quote animate-fade-in-up stagger-4">
          Healthcare Without Compromise.
        </p>
        <p className="hero-sub-quote animate-fade-in-up stagger-5">
          One secure platform for records, specialists, appointments, and AI-driven insights —
          <br className="hero-br" />
          built to the standard of the world's finest institutions.
        </p>

        {/* CTAs */}
        <div className="hero-cta animate-fade-in-up stagger-6">
          <Link
            to="/specialists"
            className="btn btn-gold btn-lg"
            id="hero-get-started"
          >
            Explore Specialists
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="#services"
            className="btn btn-outline btn-lg"
            id="hero-explore-services"
            onClick={e => {
              e.preventDefault();
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* ── Bottom metrics strip ── */}
      <div className="hero-metrics-strip animate-fade-in-up stagger-6">
        {[
          { value: '500+',    label: 'Verified Specialists' },
          { value: '98.9%',  label: 'Patient Satisfaction' },
          { value: '<2 min', label: 'AI Response Time' },
          { value: '256-bit',label: 'Encryption' },
        ].map((m, i) => (
          <div key={i} className="hero-metric-item">
            <span className="hero-metric-value">{m.value}</span>
            <span className="hero-metric-label">{m.label}</span>
          </div>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll-indicator">
        <span className="hero-scroll-text">Scroll to explore</span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="12" height="18" rx="6"
            stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
          <circle cx="7" cy="7" r="2" fill="#D4AF37" className="scroll-dot" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
