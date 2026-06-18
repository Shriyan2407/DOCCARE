import { useEffect, useRef } from 'react';

/**
 * ASMRStaticBackground
 *
 * High-density particle system with:
 * - Magnetic vortex on mouse hover
 * - Glass-shard + charcoal-dust aesthetic
 * - Friction glow on fast-moving particles
 *
 * Props
 *   particleCount  – number of particles (default 1000)
 *   bgAlpha        – motion-blur trail opacity (default 0.18, lower = longer trails)
 *   style          – container style overrides
 *   className      – container class name overrides
 */
const ASMRStaticBackground = ({
  particleCount = 1000,
  bgAlpha = 0.18,
  style = {},
  className = '',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width;
    let height;
    let animationFrameId;
    let particles = [];

    // ── Tuning ───────────────────────────────────────────────────────────────
    const MAGNETIC_RADIUS  = 280;
    const VORTEX_STRENGTH  = 0.07;
    const PULL_STRENGTH    = 0.12;

    // Track mouse relative to the canvas element, not the window
    const mouse = { x: -1000, y: -1000 };

    // ── Particle ─────────────────────────────────────────────────────────────
    class Particle {
      constructor() {
        this.x = 0; this.y = 0;
        this.vx = 0; this.vy = 0;
        this.size = 0;
        this.alpha = 0;
        this.color = '';
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.frictionGlow = 0;
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        // 70% charcoal, 30% glass-shard white
        this.color = Math.random() > 0.7 ? '240, 245, 255' : '80, 80, 85';
        this.alpha = Math.random() * 0.4 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.frictionGlow = 0;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS && dist > 0) {
          const force = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;
          // Centre pull
          this.vx += (dx / dist) * force * PULL_STRENGTH;
          this.vy += (dy / dist) * force * PULL_STRENGTH;
          // Swirl vortex (perpendicular to radius)
          this.vx += (dy / dist) * force * VORTEX_STRENGTH * 10;
          this.vy -= (dx / dist) * force * VORTEX_STRENGTH * 10;
          this.frictionGlow = force * 0.7;
        } else {
          this.frictionGlow *= 0.92;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Damping
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Frozen static jitter
        this.vx += (Math.random() - 0.5) * 0.04;
        this.vy += (Math.random() - 0.5) * 0.04;

        this.rotation += this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.05;

        // Screen wrap
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const finalAlpha = Math.min(this.alpha + this.frictionGlow, 0.9);
        ctx.fillStyle = `rgba(${this.color}, ${finalAlpha})`;

        if (this.frictionGlow > 0.3) {
          ctx.shadowBlur  = 8 * this.frictionGlow;
          ctx.shadowColor = `rgba(180, 220, 255, ${this.frictionGlow})`;
        }

        // Diamond / glass-shard geometry
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2.5);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size * 2.5);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // ── Init / resize ─────────────────────────────────────────────────────────
    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width  = canvas.width  = rect.width  || window.innerWidth;
      height = canvas.height = rect.height || window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // ── Render loop ───────────────────────────────────────────────────────────
    const render = () => {
      // Motion-blur trail (lower bgAlpha = longer ghosting)
      ctx.fillStyle = `rgba(10, 10, 12, ${bgAlpha})`;
      ctx.fillRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(render);
    };

    // ── Event listeners — use canvas rect so coordinates are correct ──────────
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    // Resize observer is more reliable than window.resize for embedded canvases
    const ro = new ResizeObserver(() => init());
    ro.observe(canvas.parentElement || canvas);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    init();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [particleCount, bgAlpha]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0a0a0c',
        overflow: 'hidden',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'none',
        }}
      />
    </div>
  );
};

export { ASMRStaticBackground };
export default ASMRStaticBackground;
