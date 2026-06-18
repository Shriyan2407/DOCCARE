import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, index = 0, className = '', style = {} }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`;
    card.style.transition = 'transform 0.15s ease';
    // Dynamic shadow follows tilt
    card.style.boxShadow = `
      ${-x * 15}px ${-y * 15}px 30px rgba(0,0,0,0.35),
      0 0 30px rgba(59,130,246,0.06)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease';
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glass-card ${className}`}
      style={{ padding: '1.75rem', willChange: 'transform', cursor: 'default', ...style }}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
