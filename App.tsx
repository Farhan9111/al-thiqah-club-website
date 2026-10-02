import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Programs } from './pages/Programs';
import { Donate } from './pages/Donate';
import { Events } from './pages/Events';
import { ProgramDetails } from './pages/ProgramDetails';
import { GetInvolved } from './pages/GetInvolved';
import { Contact } from './pages/Contact';
import { Volunteer } from './pages/Volunteer';
import { Membership } from './pages/Membership';
import { Sponsorship } from './pages/Sponsorship';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { ScrollToTop } from './components/ScrollToTop';

const Layout: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 15,
      scale: shouldReduceMotion ? 1 : 0.99
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -15,
      scale: shouldReduceMotion ? 1 : 1.01
    }
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: [0.22, 1, 0.36, 1],
    duration: shouldReduceMotion ? 0 : 0.35
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Skip to main content link for WCAG 2.1 AAA keyboard compliance */}
      <a href="#main-content" className="skip-to-content-link">
        {t('a11y.skip_to_content')}
      </a>

      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full flex-grow flex flex-col"
            onAnimationStart={() => window.scrollTo({ top: 0, behavior: 'instant' })}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="programs" element={<Programs />} />
            <Route path="programs/:id" element={<ProgramDetails />} />
            <Route path="events" element={<Events />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="membership" element={<Membership />} />
            <Route path="sponsorship" element={<Sponsorship />} />
            <Route path="donate" element={<Donate />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
