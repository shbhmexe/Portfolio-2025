'use client';
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import { styles } from "../constants/styles";
import { services } from "../constants";
import SectionWrapper from "./SectionWrapper";
import Tilt from "react-parallax-tilt";

const ServiceCard = ({ index, title, icon }: { index: number; title: string; icon: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  const cardVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 200,
        duration: 0.4,
        delay: index * 0.1
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
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
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="xs:w-[250px] w-full motion-section"
    >
      <Tilt>
        <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
          <div
            className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
          >
            <img
              src={icon}
              alt="web-development"
              className="w-16 h-16 object-contain"
            />

            <h3 className="text-white text-[20px] font-bold text-center">
              {title}
            </h3>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const About = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const titleControls = useAnimation();

  const paragraphRef = useRef(null);
  const paragraphInView = useInView(paragraphRef, { once: false, amount: 0.3 });
  const paragraphControls = useAnimation();

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 30,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  };

  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    } else {
      titleControls.start("exit");
    }
  }, [titleInView, titleControls]);

  useEffect(() => {
    if (paragraphInView) {
      paragraphControls.start("visible");
    } else {
      paragraphControls.start("exit");
    }
  }, [paragraphInView, paragraphControls]);

  return (
    <>
      <motion.div 
        ref={titleRef}
        initial="hidden"
        animate={titleControls}
        variants={titleVariants}
        className="motion-section"
      >
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        ref={paragraphRef}
        initial="hidden"
        animate={paragraphControls}
        variants={paragraphVariants}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] motion-section"
      >
        I'm a skilled web developer with experience in TypeScript and JavaScript,
        and expertise in frameworks like React, Node.js, and Next.js. I quickly learn
        and collaborate closely with clients to create efficient, scalable, and
        user-friendly solutions that solve real-world problems. Let's work together
        to bring your ideas to life!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about"); 