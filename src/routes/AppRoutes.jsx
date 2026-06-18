import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Home from '../pages/Home';
import Doctors from '../pages/Doctors';
import DoctorDetails from '../pages/DoctorDetails';
import BookAppointment from '../pages/BookAppointment';
import Appointments from '../pages/Appointments';
import PatientRecords from '../pages/PatientRecords';
import Profile from '../pages/Profile';
import About from '../pages/About';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import AuroraBackground from '../components/AuroraBackground';
import CursorSpotlight from '../components/CursorSpotlight';
import GlowOrb from '../components/GlowOrb';

gsap.registerPlugin(ScrollTrigger);

const AppRoutes = () => {
  const location = useLocation();

  // ── Initialize Lenis smooth scrolling, synced with GSAP RAF ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    // Sync Lenis with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Expose lenis globally for ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: 'transform',
    });

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // ── Scroll to top on route change ──
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div className="app-container">
      {/* Global atmospheric effects */}
      <AuroraBackground />
      <CursorSpotlight />
      <GlowOrb />

      {/* Floating Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/doctors" element={<PageTransition><Doctors /></PageTransition>} />
            <Route path="/doctors/:id" element={<PageTransition><DoctorDetails /></PageTransition>} />
            <Route path="/book-appointment" element={<PageTransition><BookAppointment /></PageTransition>} />
            <Route path="/appointments" element={<PageTransition><Appointments /></PageTransition>} />
            <Route path="/patient-records" element={<PageTransition><PatientRecords /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default AppRoutes;
