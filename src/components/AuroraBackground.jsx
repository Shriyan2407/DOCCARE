import React, { useEffect, useState } from 'react';

/**
 * AuroraBackground — Cinematic AI OS Aurora.
 * OLED black base with massive electric blue organic waves and a 50-100 premium particle system.
 */
const AuroraBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 75 premium floating particles
    const newParticles = Array.from({ length: 75 }).map((_, i) => {
      // Occasional massive particles
      const isGiant = Math.random() > 0.9;
      const size = isGiant ? Math.floor(Math.random() * 10 + 20) : Math.floor(Math.random() * 8 + 4);
      
      const left = Math.random() * 100;
      const duration = Math.floor(Math.random() * 20 + 15);
      const delay = Math.random() * -20;
      const blur = isGiant ? 'blur(4px)' : 'blur(1px)';
      const opacity = Math.random() * 0.5 + 0.3;
      
      return { id: i, size, left, duration, delay, blur, opacity };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#000000', // Pure OLED Black
      }}
    >
      {/* Aurora layer 1 */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '1200px',
        height: '1000px',
        background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.2) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)',
        filter: 'blur(200px)',
        borderRadius: '50%',
        animation: 'au1 25s ease-in-out infinite alternate',
        willChange: 'transform',
      }} />

      {/* Aurora layer 2 */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-15%',
        width: '1000px',
        height: '1100px',
        background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.25) 0%, rgba(96,165,250,0.1) 40%, transparent 70%)',
        filter: 'blur(250px)',
        borderRadius: '50%',
        animation: 'au2 30s ease-in-out infinite alternate-reverse',
        willChange: 'transform',
      }} />

      {/* Aurora layer 3 */}
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '15%',
        width: '900px',
        height: '800px',
        background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.2) 0%, rgba(37,99,235,0.08) 40%, transparent 70%)',
        filter: 'blur(180px)',
        borderRadius: '50%',
        animation: 'au3 20s ease-in-out infinite alternate',
        willChange: 'transform',
      }} />

      {/* Noise Texture Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        mixBlendMode: 'overlay',
      }} />

      {/* Premium Particle System */}
      <div className="particles-container">
        {particles.map(p => (
          <div 
            key={p.id} 
            className="premium-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s, ${p.duration * 0.8}s`,
              animationDelay: `${p.delay}s, ${p.delay * 1.2}s`,
              filter: p.blur,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 2}px rgba(96, 165, 250, 0.8)`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes au1 {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(6%,4%) scale(1.1); }
          100% { transform: translate(-4%,8%) scale(0.9); }
        }
        @keyframes au2 {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(-6%,4%) scale(1.15); }
          100% { transform: translate(5%,-6%) scale(0.85); }
        }
        @keyframes au3 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(8%,-5%) scale(1.2); }
        }

        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .premium-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(147, 197, 253, 0.6);
          animation: 
            floatUp linear infinite,
            twinkle ease-in-out infinite alternate;
          will-change: transform, opacity;
        }
        
        @keyframes floatUp {
          0% { transform: translateY(110vh) translateX(0); }
          50% { transform: translateY(40vh) translateX(20px); }
          100% { transform: translateY(-10vh) translateX(-20px); }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;
