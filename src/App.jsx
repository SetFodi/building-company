import React, { useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import PortfolioIndex from './pages/PortfolioIndex';
import PortfolioShowcase from './pages/PortfolioShowcase';
import Firm from './pages/Firm';
import Inquiries from './pages/Inquiries';
import Preloader from './components/Preloader';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Lenis global initialization in App wrapper
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <Router>
      <main className="w-full min-h-screen bg-background text-dark relative selection:bg-accent selection:text-background">
        <ScrollToTop />
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/firm" element={<Firm />} />
          <Route path="/portfolio" element={<PortfolioIndex />} />
          <Route path="/portfolio/:id" element={<PortfolioShowcase />} />
          <Route path="/inquiries" element={<Inquiries />} />
        </Routes>
      </main>
    </Router>
  );
}

// Global scroll reset on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [pathname]);
  return null;
}
