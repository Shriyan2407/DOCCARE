import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import SpecialistsPage from './pages/SpecialistsPage/SpecialistsPage';
import DoctorProfile from './pages/DoctorProfile/DoctorProfile';
import BookingFlow from './pages/BookingFlow/BookingFlow';
import Dashboard from './pages/Dashboard/Dashboard';
import HealthRecords from './pages/HealthRecords/HealthRecords';
import './App.css';

import { AnimatePresence, motion } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/specialists" element={<PageTransition><SpecialistsPage /></PageTransition>} />
        <Route path="/specialists/:id" element={<PageTransition><DoctorProfile /></PageTransition>} />
        <Route path="/book" element={<PageTransition><BookingFlow /></PageTransition>} />
        <Route path="/book/:doctorId" element={<PageTransition><BookingFlow /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/records" element={<PageTransition><HealthRecords /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

import AmbientBackground from './components/AmbientBackground/AmbientBackground';

const AppContent = ({ visible }) => {
  return (
    <div className={`app-content ${visible ? 'app-content--visible' : ''}`}>
      <AmbientBackground />
      <Navbar />
      <ScrollToTop />
      
      <AnimatedRoutes />

      <Footer />
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => setVisible(true), 100);
  };

  useEffect(() => {
    if (!visible) return;
    let lenis;
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis smooth scroll not available:', err.message);
      }
    };
    initLenis();
    return () => lenis?.destroy();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const animateElements = document.querySelectorAll(
      '.card, .service-card, .specialist-card, .insight-card, .insights-featured'
    );
    animateElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Router>
      <div className="app">
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
        <AppContent visible={visible} />
      </div>
    </Router>
  );
}

export default App;
