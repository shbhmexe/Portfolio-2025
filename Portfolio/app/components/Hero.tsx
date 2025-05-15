'use client';
import { motion, useAnimation, useInView } from "framer-motion";
import { styles } from "../constants/styles";
import SplineModel from './canvas/SplineModel';
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  
  // Add refs and animation controls for scroll animations
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const titleControls = useAnimation();
  
  const subTextRef = useRef(null);
  const subTextInView = useInView(subTextRef, { once: false, amount: 0.5 });
  const subTextControls = useAnimation();
  
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: false, amount: 0.5 });
  const lineControls = useAnimation();

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const subTextVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 300,
        delay: 0.1,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      x: -30,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const lineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { 
      scaleY: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 6,
        stiffness: 100,
        duration: 0.4
      }
    },
    exit: { 
      scaleY: 0, 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Hide banner after 5 seconds
    if (isMobile && showBanner) {
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile, showBanner]);
  
  // Control animations based on viewport visibility
  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    } else {
      titleControls.start("exit");
    }
  }, [titleInView, titleControls]);
  
  useEffect(() => {
    if (subTextInView) {
      subTextControls.start("visible");
    } else {
      subTextControls.start("exit");
    }
  }, [subTextInView, subTextControls]);
  
  useEffect(() => {
    if (lineInView) {
      lineControls.start("visible");
    } else {
      lineControls.start("exit");
    }
  }, [lineInView, lineControls]);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Text section - smaller and positioned higher */}
      <div className={`${styles.paddingX} absolute inset-0 top-[40px] sm:top-[100px] max-w-7xl mx-auto flex flex-row items-start gap-6 z-50 select-none`}>
        <div className="flex flex-col justify-center items-center mt-5" ref={lineRef}>
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <motion.div 
            className="w-1 sm:h-44 h-24 violet-gradient motion-section"
            initial="hidden"
            animate={lineControls}
            variants={lineVariants}
          />
        </div>

        <div className="mt-5">
          <motion.h1 
            className={`${styles.heroHeadText} text-white motion-section`}
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={titleVariants}
          >
            Hi, I&apos;m <span className="text-[#915EFF]">Shubham Shukla</span>
          </motion.h1>
          <motion.p 
            className={`${styles.heroSubText} mt-4 text-secondary motion-section`}
            ref={subTextRef}
            initial="hidden"
            animate={subTextControls}
            variants={subTextVariants}
          >
            I develop beautiful web applications <br className="sm:block hidden" />
            with modern user interfaces and experiences
          </motion.p>
        </div>
      </div>

      {/* Mobile notification banner - shows for 5 seconds only */}
      {isMobile && showBanner && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full bg-[#151030] bg-opacity-70 backdrop-blur-sm p-3 text-white z-[999] border-b-2 border-[#915EFF] shadow-lg"
        >
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-[#915EFF]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold text-sm">For best experience, view on desktop</p>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="text-white focus:outline-none"
              aria-label="Close notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {/* Spacer div to prevent text selection when interacting with 3D model */}
      <div className="absolute inset-0 top-[130px] sm:top-[170px] h-[100px] pointer-events-none"></div>

      {/* 3D Model Container - Hidden on mobile */}
      {!isMobile ? (
        <div className="hero-3d-container absolute inset-0 top-[130px] sm:top-[170px] flex items-center justify-center z-10 bg-transparent pointer-events-auto">
          <div className="w-full h-[calc(100vh-170px)] max-w-full mx-auto pointer-events-auto">
            <SplineModel />
          </div>
        </div>
      ) : (
        <div className="hero-mobile-placeholder absolute inset-0 top-[170px] flex items-center justify-center z-10">
          <div className="p-6 max-w-md text-center">
            <div className="w-48 h-48 mx-auto my-6 opacity-80">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="drop-shadow-[0_0_15px_rgba(145,94,255,0.5)]"
              >
                <img 
                  src="/robot.svg" 
                  alt="3D Robot"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-[#915EFF] mb-4">Interactive 3D View</h3>
            <p className="text-gray-300 text-base mb-6 px-4">
              The interactive 3D model is available on desktop devices.
              For the best experience, please view on a larger screen.
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex justify-center"
            >
              <a 
                href="#about" 
                className="inline-flex items-center gap-2 text-sm font-medium text-[#915EFF] hover:text-white transition-colors duration-300"
                aria-label="Scroll to About section"
              >
                <span>Scroll down</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      )}

      {/* Better Responsive scroll indicator - only show on desktop */}
      {!isMobile && (
        <div className="absolute xs:bottom-12 bottom-20 w-full flex justify-center items-center">
          <a href="#about" aria-label="Scroll to About section">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
      )}

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .hero-3d-container {
            height: calc(100vh - 250px) !important;
            top: 200px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-3d-container {
            height: calc(100vh - 280px) !important;
            top: 220px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 