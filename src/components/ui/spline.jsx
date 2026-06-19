import { Suspense, lazy, useRef, useEffect, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * SplineScene - Lazy-loaded, visibility-aware Spline 3D component.
 * Only mounts the heavy Spline canvas when the container enters the viewport.
 * On mobile (≤768px), renders the fallback instead to preserve 60 FPS.
 */
export function SplineScene({ scene, className, fallback }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip observer on mobile
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [isMobile]);

  const DefaultFallback = fallback || (
    <div className="spline-fallback">
      <div className="spline-fallback-glow" />
      <div className="spline-fallback-orb" />
    </div>
  );

  return (
    <div ref={containerRef} className={`spline-container ${className || ''}`}>
      {isMobile ? (
        DefaultFallback
      ) : isVisible ? (
        <Suspense fallback={DefaultFallback}>
          <Spline scene={scene} className="spline-canvas" />
        </Suspense>
      ) : (
        DefaultFallback
      )}
    </div>
  );
}
