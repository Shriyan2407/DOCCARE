import { useEffect, useRef } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const screenRef  = useRef(null);
  const logoRef    = useRef(null);
  const lineRef    = useRef(null);
  const taglineRef = useRef(null);
  const progressRef= useRef(null);

  useEffect(() => {
    const seq = async () => {
      await delay(400);
      logoRef.current?.classList.add('visible');

      await delay(600);
      lineRef.current?.classList.add('draw');

      await delay(700);
      taglineRef.current?.classList.add('visible');

      await delay(500);
      progressRef.current?.classList.add('fill');

      await delay(1100);
      screenRef.current?.classList.add('exit');

      await delay(800);
      onComplete?.();
    };
    seq();
  }, [onComplete]);

  return (
    <div className="loading-screen" ref={screenRef} id="loading-screen">

      {/* Background gold particles canvas — rendered via CSS animation only, no JS canvas */}
      <div className="loading-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="loading-particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="loading-glow" />

      {/* ── Center content ── */}
      <div className="loading-center">

        {/* Logo + wordmark */}
        <div className="loading-logo" ref={logoRef}>
          <div className="loading-logo-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="url(#goldGrad2)" strokeWidth="1.5" />
              <path d="M14 24c0-5.523 4.477-10 10-10s10 4.477 10 10"
                stroke="url(#goldGrad2)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M19 29c0-2.761 2.239-5 5-5s5 2.239 5 5"
                stroke="url(#goldGrad2)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="24" cy="34" r="2" fill="url(#goldGrad2)" />
              <defs>
                <linearGradient id="goldGrad2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D4AF37" />
                  <stop offset="1" stopColor="#E6C56A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="loading-wordmark">
            <span className="loading-wordmark-doc">DOC</span>
            <span className="loading-wordmark-care">CARE</span>
          </div>
        </div>

        {/* Gold line */}
        <div className="loading-line-wrapper" ref={lineRef}>
          <div className="loading-line">
            <div className="loading-line-shimmer" />
          </div>
        </div>

        {/* Tagline */}
        <p className="loading-tagline" ref={taglineRef}>
          Preparing Your Healthcare Experience
        </p>

        {/* Progress */}
        <div className="loading-progress-wrap">
          <div className="loading-progress" ref={progressRef} />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="loading-corner loading-corner--tl" />
      <div className="loading-corner loading-corner--tr" />
      <div className="loading-corner loading-corner--bl" />
      <div className="loading-corner loading-corner--br" />
    </div>
  );
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

export default LoadingScreen;
