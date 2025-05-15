'use client';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Tech from './components/Tech';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import WorkTimeline from './components/WorkTimeline';
import Footer from './components/Footer';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-primary">
        <div className="canvas-loader"></div>
      </div>
    );
  }

  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <WorkTimeline />
      <Tech />
      <Projects />
      <Achievements />
      <div className="relative z-0">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Home; 