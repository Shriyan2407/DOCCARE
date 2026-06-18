import React from 'react';
import { Shield, Brain, Zap, Clock } from 'lucide-react';

const About = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center flex flex-col items-center mb-12">
        <div className="lx-label">The Vision</div>
        <h2 className="page-title">About <span className="blue-text">MediCare</span></h2>
        <p className="page-subtitle" style={{ maxWidth: '600px' }}>
          Providing world-class healthcare with state-of-the-art technology and an uncompromising approach to clinical excellence.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="lx-card" style={{ padding: '3rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(59,130,246,0.12)' }}>
            <Brain size={24} />
          </div>
          <h3 className="mb-3" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '1.5rem', color: '#fff' }}>Our Mission</h3>
          <p style={{ color: '#A1A1AA', lineHeight: 1.8, fontSize: '0.95rem' }}>
            To deliver high-quality, patient-centered healthcare services through continuous innovation, medical excellence, and uncompromising standards of care.
          </p>
        </div>
        <div className="lx-card" style={{ padding: '3rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(59,130,246,0.12)' }}>
            <Shield size={24} />
          </div>
          <h3 className="mb-3" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '1.5rem', color: '#fff' }}>Our Vision</h3>
          <p style={{ color: '#A1A1AA', lineHeight: 1.8, fontSize: '0.95rem' }}>
            To be the most exclusive and trusted healthcare partner, setting the global standard for clinical excellence, privacy, and patient safety.
          </p>
        </div>
      </div>

      <div className="lx-card" style={{ padding: '4rem 3rem' }}>
        <div className="lx-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Metrics</div>
        <h3 className="text-center mb-10" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '2rem', color: '#fff' }}>Hospital Statistics</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { value: '150+', label: 'Elite Specialists' },
            { value: '24/7', label: 'Concierge Care' },
            { value: '99.9%', label: 'Satisfaction' },
            { value: 'Zero', label: 'Compromise' }
          ].map((stat, i) => (
            <div key={i}>
              <h2 style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                fontSize: 'clamp(2rem, 3vw, 3rem)', 
                fontWeight: 700, 
                letterSpacing: '-0.05em', 
                lineHeight: 1, 
                marginBottom: '0.75rem', 
                background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #3B82F6 100%)', 
                backgroundSize: '200%', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text', 
              }}>
                {stat.value}
              </h2>
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                letterSpacing: '0.12em', 
                textTransform: 'uppercase', 
                color: '#71717A' 
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
