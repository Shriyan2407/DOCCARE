/**
 * StarsBackground — DocCare Luxury Gold Dust Particle System
 * 
 * Premium atmosphere inspired by:
 * Apple Black Titanium · Bugatti Configurator · Rolls Royce Ghost
 * 
 * NOT a space background — floating luxury golden dust particles
 * 70% Gold (#D4AF37) · 30% Soft White particles
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react';

// ─────────────────────────────────────────────────────────────
//  STAR GENERATION — Gold + White luxury dust mix
// ─────────────────────────────────────────────────────────────
function generateStars(count, starColor) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

// ─────────────────────────────────────────────────────────────
//  STAR LAYER — Single animated particle layer
// ─────────────────────────────────────────────────────────────
function StarLayer({
  count = 700,
  size = 2,
  duration = 120,
  starColor = '#D4AF37',
  blur = 0,
  glowColor = null,
  style = {},
}) {
  const [boxShadow, setBoxShadow] = useState('');

  useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  const particleStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: 'transparent',
    boxShadow: boxShadow,
    filter: blur > 0 ? `blur(${blur}px)` : undefined,
    position: 'absolute',
    top: 0,
    left: 0,
    willChange: 'transform',
    ...style,
  };

  // Add glow if specified
  if (glowColor && boxShadow) {
    particleStyle.boxShadow = boxShadow + `, 0 0 ${size * 3}px ${glowColor}`;
  }

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '2000px',
        willChange: 'transform',
      }}
    >
      <div style={particleStyle} />
      <div style={{ ...particleStyle, top: '2000px' }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
//  STARS BACKGROUND — Primary global background component
// ─────────────────────────────────────────────────────────────
export function StarsBackground({
  children,
  factor = 0.04,
  className,
  style,
}) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const springX = useSpring(offsetX, { stiffness: 40, damping: 25 });
  const springY = useSpring(offsetY, { stiffness: 40, damping: 25 });

  const handleMouseMove = useCallback(
    (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      offsetX.set(-(e.clientX - centerX) * factor);
      offsetY.set(-(e.clientY - centerY) * factor);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#000000',
        ...style,
      }}
      aria-hidden="true"
    >
      {/* ── Ambient Lighting Glows ── */}
      {/* Top Left — warm gold glow */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-10%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
        filter: 'blur(200px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        willChange: 'transform',
        animation: 'ambientDrift1 30s ease-in-out infinite alternate',
      }} />

      {/* Top Right — soft white clarity */}
      <div style={{
        position: 'absolute',
        top: '-5%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
        filter: 'blur(300px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        willChange: 'transform',
        animation: 'ambientDrift2 25s ease-in-out infinite alternate-reverse',
      }} />

      {/* Bottom Center — subtle gold warmth */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '30%',
        width: '700px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)',
        filter: 'blur(400px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        willChange: 'transform',
        animation: 'ambientDrift3 35s ease-in-out infinite alternate',
      }} />

      {/* ── Parallax Particle Container ── */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          position: 'absolute',
          inset: 0,
        }}
      >
        {/* Layer 1 — Tiny gold dust particles (most numerous, slowest) */}
        <StarLayer
          count={500}
          size={2}
          duration={180}
          starColor="#D4AF37"
        />

        {/* Layer 2 — Tiny soft white dust mix */}
        <StarLayer
          count={200}
          size={2}
          duration={200}
          starColor="rgba(255,255,255,0.6)"
        />

        {/* Layer 3 — Medium gold particles */}
        <StarLayer
          count={150}
          size={4}
          duration={140}
          starColor="#E6C56A"
          blur={0.5}
        />

        {/* Layer 4 — Medium soft white accent */}
        <StarLayer
          count={60}
          size={4}
          duration={160}
          starColor="rgba(255,255,255,0.4)"
          blur={0.5}
        />

        {/* Layer 5 — Large gold feature particles with glow */}
        <StarLayer
          count={50}
          size={6}
          duration={100}
          starColor="rgba(212,175,55,0.8)"
          blur={1}
          glowColor="rgba(212,175,55,0.4)"
        />

        {/* Layer 6 — Occasional oversized cinematic dust */}
        <StarLayer
          count={15}
          size={8}
          duration={80}
          starColor="rgba(230,197,106,0.7)"
          blur={1.5}
          glowColor="rgba(212,175,55,0.5)"
        />

        {/* Layer 7 — Rare hero particles (ultra large) */}
        <StarLayer
          count={6}
          size={10}
          duration={60}
          starColor="rgba(212,175,55,0.5)"
          blur={2}
          glowColor="rgba(212,175,55,0.3)"
        />
      </motion.div>

      {/* ── Fine noise texture for depth ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes ambientDrift1 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.7; }
          50%  { transform: translate(5%, 3%) scale(1.05); opacity: 1; }
          100% { transform: translate(-3%, 6%) scale(0.95); opacity: 0.8; }
        }
        @keyframes ambientDrift2 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50%  { transform: translate(-4%, 5%) scale(1.08); opacity: 0.9; }
          100% { transform: translate(4%, -4%) scale(0.92); opacity: 0.6; }
        }
        @keyframes ambientDrift3 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.6; }
          100% { transform: translate(6%, -3%) scale(1.1); opacity: 1; }
        }
      `}</style>

      {children}
    </div>
  );
}

export default StarsBackground;
