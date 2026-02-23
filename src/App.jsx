import React, { useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import FlagshipAssets from './components/FlagshipAssets';
import Membership from './components/Membership';
import Footer from './components/Footer';
import MetricsBar from './components/MetricsBar';

// Let's implement a simple smooth scroller using GSAP if desired,
// We are implementing global Lenis smooth scrolling for cinematic GSAP performance.

function App() {
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
  // If we wanted to add a global noise overlay it's already in index.css
  return (
    <main className="w-full min-h-screen bg-background text-dark relative selection:bg-accent selection:text-background">
      <Navbar />
      <Hero />
      <MetricsBar />
      <Features />
      <Philosophy />
      <Protocol />
      <FlagshipAssets />
      <Membership />
      <Footer />
    </main>
  );
}

export default App;
