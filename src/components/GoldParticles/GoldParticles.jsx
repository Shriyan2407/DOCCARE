import { useEffect, useRef } from 'react';
import './GoldParticles.css';

const GoldParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(212,175,55,',   // gold
      'rgba(230,197,106,',  // soft gold
      'rgba(255,255,255,',  // white
    ];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4 - 0.1;
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.6 + 0.1;
        this.alphaSpeed = (Math.random() - 0.5) * 0.008;
        this.blur = Math.random() * 4;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;

        // Fade in / out
        if (this.life < 30) {
          this.alpha = Math.min(this.alpha, (this.life / 30) * 0.7);
        } else if (this.life > this.maxLife - 30) {
          this.alpha = Math.max(0, this.alpha * 0.97);
        } else {
          this.alpha += this.alphaSpeed;
          this.alpha = Math.max(0.05, Math.min(0.8, this.alpha));
        }

        if (this.life > this.maxLife || this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.filter = `blur(${this.blur}px)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `${this.colorBase}${this.alpha})`);
        gradient.addColorStop(0.5, `${this.colorBase}${this.alpha * 0.5})`);
        gradient.addColorStop(1, `${this.colorBase}0)`);

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    // Spawn particles
    const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="gold-particles-canvas"
      aria-hidden="true"
    />
  );
};

export default GoldParticles;
