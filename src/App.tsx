/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Results from './sections/Results';
import Stats from './sections/Stats';
import CTA from './sections/CTA';
import HomePractice from './sections/HomePractice';
import Footer from './sections/Footer';
import AwardsTicker from './components/AwardsTicker';
import Preloader from './components/Preloader';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { EditProvider } from './context/EditContext';
import { AdminToolbar } from './components/AdminToolbar';

import TeamPage from './pages/TeamPage';
import TeamMemberPage from './pages/TeamMemberPage';
import AboutPage from './pages/AboutPage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import InsightsPage from './pages/InsightsPage';
import ArticlePage from './pages/ArticlePage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.JSX.Element | React.JSX.Element[] }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function HomePage() {
  return (
    <main>
      <Helmet>
        <title>Stein Scop Attorneys | Commercial Law Firm — Sandton, Johannesburg</title>
        <meta name="description" content="Stein Scop Attorneys Inc. is a director-led commercial law firm in Sandton, Johannesburg, advising clients across South Africa and the African continent on M&A, litigation, employment, mining, and more." />
        <meta property="og:title" content="Stein Scop Attorneys | Commercial Law Firm" />
        <meta property="og:description" content="Director-led commercial law firm in Sandton advising on M&A, litigation, employment, mining and more across South Africa and Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.steinscop.com" />
      </Helmet>
      <Hero />
      <Intro />
      <Results />
      <AwardsTicker />
      <Stats />
      <HomePractice />
      <CTA />
    </main>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPreloader, setShowPreloader] = useState(() => {
    return !sessionStorage.getItem('ss_visited');
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('ss_visited', '1');
    setShowPreloader(false);
  };

  return (
    <EditProvider>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      <Router>
        <ScrollToTop />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showPreloader ? 0 : 1 }}
          transition={{ duration: 0.6 }}
          className="relative [overflow-x:clip]"
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-0.5 bg-brand-accent origin-left z-[100]"
            style={{ scaleX }}
          />

          {/* Custom Cursor — single ring */}
          <motion.div
            className="hidden md:block fixed top-0 left-0 w-7 h-7 rounded-full border border-brand-accent/70 pointer-events-none z-[9999]"
            animate={{ x: mousePos.x - 14, y: mousePos.y - 14 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.5 }}
          />

          <Navbar />

          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/practice-areas" element={<PracticeAreasPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<ArticlePage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/team/:id" element={<TeamMemberPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </PageTransition>

          <Footer />
          <AdminToolbar />
        </motion.div>
      </Router>
    </EditProvider>
  );
}
