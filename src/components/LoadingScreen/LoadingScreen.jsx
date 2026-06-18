import { useEffect, useRef } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const screenRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Loading particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.05,
        alpha: Math.random() * 0.5 + 0.1,
        color: ['rgba(212,175,55,', 'rgba(230,197,106,'][Math.floor(Math.random() * 2)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    // Animation sequence
    const seq = async () => {
      await delay(100);
      // Phase 1: Logo fades in
      logoRef.current?.classList.add('visible');

      await delay(500);
      // Phase 2: Gold line draws
      lineRef.current?.classList.add('draw');

      await delay(700);
      // Phase 3: Tagline appears
      taglineRef.current?.classList.add('visible');

      await delay(400);
      // Phase 4: Progress bar fills
      progressRef.current?.classList.add('fill');

      await delay(900);
      // Phase 5: Transition out
      screenRef.current?.classList.add('exit');

      await delay(800);
      onComplete?.();
    };

    seq();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen" ref={screenRef} id="loading-screen">
      <canvas ref={canvasRef} className="loading-canvas" />

      {/* Ambient radial glow */}
      <div className="loading-glow" />

      {/* Center content */}
      <div className="loading-center">
        {/* Logo */}
        <div className="loading-logo" ref={logoRef}>
          <div className="loading-logo-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="url(#goldGrad)" strokeWidth="1.5" />
              <path d="M14 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M19 29c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="24" cy="34" r="2" fill="url(#goldGrad)" />
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
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

        {/* Gold line animation */}
        <div className="loading-line-wrapper" ref={lineRef}>
          <div className="loading-line">
            <div className="loading-line-shimmer" />
          </div>
        </div>

        {/* Tagline */}
        <p className="loading-tagline" ref={taglineRef}>
          Preparing Your Healthcare Experience
        </p>

        {/* Progress bar */}
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
