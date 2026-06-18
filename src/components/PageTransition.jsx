import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: 'blur(12px)',
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(8px)',
    scale: 1.01,
    transition: {
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
