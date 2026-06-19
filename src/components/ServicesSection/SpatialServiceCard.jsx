import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ServiceDetailsModal } from './ServiceDetailsModal';
import './ServicesSection.css';

export const SpatialServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const isHero = service.featured;

  return (
    <motion.div
      ref={cardRef}
      className={`spatial-card-wrapper ${isHero ? 'hero-span' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        zIndex: hovered ? 10 : 1
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        className="spatial-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: hovered ? 1.02 : 1,
          boxShadow: hovered 
            ? "0 30px 60px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(212,175,55,0.4)" 
            : "0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div 
          className="spatial-glow"
          style={{
            background: `radial-gradient(circle at ${useTransform(springX, [-0.5, 0.5], [0, 100])}% ${useTransform(springY, [-0.5, 0.5], [0, 100])}%, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 60%)`,
            opacity: hovered ? 1 : 0
          }}
        />

        <div className="spatial-layer layer-bg" style={{ transform: "translateZ(-20px)" }}>
          {isHero && (
            <div className="hero-bg-anim">
              <div className="scanning-line" />
            </div>
          )}
        </div>

        <div className="spatial-layer layer-flow" style={{ transform: "translateZ(0px)" }}>
          <div className="spatial-header" style={{ transform: "translateZ(20px)" }}>
            <div className="spatial-icon-wrap">
              {service.icon}
            </div>
            {isHero && <span className="badge badge-gold badge-glow">Premium Care</span>}
          </div>

          <motion.div 
            className="spatial-stats-row"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="metric-box">
              <span className="m-val">{service.successRate}</span>
              <span className="m-lbl">Success Rate</span>
            </div>
            <div className="metric-box">
              <span className="m-val">{service.specialistsCount}</span>
              <span className="m-lbl">Specialists</span>
            </div>
            <div className="metric-box">
              <span className="m-val">{service.waitTime}</span>
              <span className="m-lbl">Wait Time</span>
            </div>
          </motion.div>

          <div className="spatial-tags" style={{ transform: "translateZ(30px)" }}>
            {service.tags.map(tag => (
              <span key={tag} className="badge badge-outline">{tag}</span>
            ))}
          </div>
          
          <h3 className="spatial-title" style={{ transform: "translateZ(50px)" }}>{service.title}</h3>
          
          <p className="spatial-desc" style={{ transform: "translateZ(40px)" }}>{service.description}</p>
          
          <div className="spacer" />

          <motion.div 
            className="spatial-actions"
            style={{ transform: "translateZ(60px)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0.4, y: hovered ? 0 : 5 }}
          >
            <Link to={`/book?specialty=${service.id}`} className="btn btn-gold btn-sm">Quick Book</Link>
            <button className="btn btn-ghost btn-sm" onClick={() => setIsModalOpen(true)}>Learn More</button>
          </motion.div>
        </div>
      </motion.div>

      {/* Render Modal Outside the 3D transforms */}
      <ServiceDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={service} 
      />
    </motion.div>
  );
};
