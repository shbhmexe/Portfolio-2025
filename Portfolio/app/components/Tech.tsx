'use client';
import { useState, useRef, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { technologies } from "../constants";
import { motion, useAnimation, useInView } from "framer-motion";

const TechIcon = ({ technology, index }: { technology: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  const iconVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.4,
        delay: index * 0.05
      }
    },
    exit: { 
      opacity: 0,
      y: 30,
      scale: 0.8,
      transition: {
        duration: 0.25
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("exit");
    }
  }, [isInView, controls]);

  return (
    <motion.div 
      className="w-28 h-28 motion-section" 
      key={technology.name}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={iconVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`w-full h-full flex items-center justify-center rounded-full p-2 transform transition-all duration-300 ${
          isHovered 
            ? "bg-[#915eff] shadow-[0_0_20px_rgba(145,94,255,0.5)]" 
            : "bg-tertiary"
        }`}
      >
        <motion.img
          src={technology.icon}
          alt={technology.name}
          className={`w-16 h-16 object-contain ${
            isHovered ? "filter-none" : ""
          }`}
          animate={{
            rotate: isHovered ? 360 : 0
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        />
      </div>
      <p className={`text-center mt-2 transition-all duration-300 ${
        isHovered ? "text-white font-bold" : "text-secondary"
      }`}>{technology.name}</p>
    </motion.div>
  );
};

const Tech = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const titleControls = useAnimation();

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    } else {
      titleControls.start("exit");
    }
  }, [titleInView, titleControls]);

  return (
    <>
      <motion.div
        ref={titleRef}
        initial="hidden"
        animate={titleControls}
        variants={titleVariants}
        className="mb-12"
      >
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Technologies
        </h2>
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Tools I work with
        </p>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology, index) => (
          <TechIcon 
            key={technology.name}
            technology={technology}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, ""); 