import React, { useEffect, useRef, useCallback } from 'react';

const GlowOrb = () => {
  const orbRef = useRef(null);
  const posRef = useRef({ x: -400, y: -400 });
  const targetRef = useRef({ x: -400, y: -400 });
  const sizeRef = useRef(240);
  const targetSizeRef = useRef(240);
  const rafRef = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.055);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.055);
    sizeRef.current = lerp(sizeRef.current, targetSizeRef.current, 0.07);

    if (orbRef.current) {
      orbRef.current.style.left = `${posRef.current.x}px`;
      orbRef.current.style.top = `${posRef.current.y}px`;
      orbRef.current.style.width = `${sizeRef.current}px`;
      orbRef.current.style.height = `${sizeRef.current}px`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el?.matches('a, button, .lx-card, .feature-lx-card, .btn')
        || el?.closest('a, button, .lx-card, .feature-lx-card, .btn');
      targetSizeRef.current = isInteractive ? 380 : 240;
    };

    const onLeave = () => {
      targetRef.current.x = -600;
      targetRef.current.y = -600;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(37,99,235,0.06) 40%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9997,
        willChange: 'left, top, width, height',
        filter: 'blur(24px)',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default GlowOrb;
