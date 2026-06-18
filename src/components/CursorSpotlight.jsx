import React, { useEffect, useRef, useCallback } from 'react';

const CursorSpotlight = () => {
  const spotlightRef = useRef(null);
  const posRef = useRef({ x: -300, y: -300 });
  const targetRef = useRef({ x: -300, y: -300 });
  const rafRef = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.1);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.1);

    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${posRef.current.x}px`;
      spotlightRef.current.style.top = `${posRef.current.y}px`;
    }

    document.documentElement.style.setProperty('--cursor-x', `${posRef.current.x}px`);
    document.documentElement.style.setProperty('--cursor-y', `${posRef.current.y}px`);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };
    const onLeave = () => {
      targetRef.current.x = -400;
      targetRef.current.y = -400;
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
      ref={spotlightRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9998,
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, rgba(37,99,235,0.02) 35%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        willChange: 'left, top',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default CursorSpotlight;
