import { useEffect, useRef } from 'react';
import './AmbientBackground.css';

export default function AmbientBackground() {
  const containerRef = useRef(null);
  const auraLayerRef = useRef(null);
  const particlesFarRef = useRef(null);
  const particlesMidRef = useRef(null);
  const particlesNearRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Apply subtle parallax to different layers
      if (auraLayerRef.current) {
        auraLayerRef.current.style.transform = `translate3d(${currentX * -20}px, ${currentY * -20}px, 0)`;
      }
      if (particlesFarRef.current) {
        particlesFarRef.current.style.transform = `translate3d(${currentX * -10}px, ${currentY * -10}px, 0)`;
      }
      if (particlesMidRef.current) {
        particlesMidRef.current.style.transform = `translate3d(${currentX * -30}px, ${currentY * -30}px, 0)`;
      }
      if (particlesNearRef.current) {
        particlesNearRef.current.style.transform = `translate3d(${currentX * -60}px, ${currentY * -60}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ambient-background" ref={containerRef}>
      {/* LAYER 1: Pure OLED Black (Handled by container CSS) */}
      
      {/* LAYER 2: Large moving aura lights */}
      <div className="aura-layer" ref={auraLayerRef}>
        <div className="aura aura-top-left"></div>
        <div className="aura aura-bottom-right"></div>
        <div className="aura aura-center"></div>
      </div>

      {/* LAYER 3: Floating aura particles (Light blobs) */}
      <div className="particles-layer particles-far" ref={particlesFarRef}>
        {/* Generate multiple blurred blobs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`far-${i}`} className={`aura-blob blob-far blob-color-${i % 3}`} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * -60}s`,
            animationDuration: `${40 + Math.random() * 20}s`
          }}></div>
        ))}
      </div>

      <div className="particles-layer particles-mid" ref={particlesMidRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`mid-${i}`} className={`aura-blob blob-mid blob-color-${(i + 1) % 3}`} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * -60}s`,
            animationDuration: `${30 + Math.random() * 20}s`
          }}></div>
        ))}
      </div>

      <div className="particles-layer particles-near" ref={particlesNearRef}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`near-${i}`} className={`aura-blob blob-near blob-color-${(i + 2) % 3}`} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * -60}s`,
            animationDuration: `${20 + Math.random() * 20}s`
          }}></div>
        ))}
      </div>
      
      {/* Grain overlay to eliminate color banding on OLED */}
      <div className="ambient-grain"></div>
    </div>
  );
}
