'use client';
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { styles } from "../constants/styles";
import SectionWrapper from "./SectionWrapper";
import { textVariant } from "./utils/motion";
import { FaTrophy, FaMedal, FaAward, FaCertificate } from "react-icons/fa";

interface Achievement {
  title: string;
  description: string;
  icon: JSX.Element;
}

const achievements: Achievement[] = [
  {
    title: "10+ Projects Completed",
    description: "Built and deployed over 10+ web development projects using React.js, Next.js, Tailwind CSS, and Node.js.",
    icon: <FaTrophy className="text-yellow-400 text-4xl" />,
  },
  {
    title: "Aspiring Open Source Contributor",
    description: "Working towards contributing to open-source projects and collaborating with global developer communities.",
    icon: <FaMedal className="text-blue-400 text-4xl" />,
  },
  {
    title: "Certified Frontend Developer",
    description: "Completed professional certifications in frontend development and JavaScript through IITM online programs and self-learning platforms.",
    icon: <FaAward className="text-green-400 text-4xl" />,
  },
  {
    title: "Algorithm Learning Journey",
    description: "Currently mastering advanced algorithms including Greedy, Divide & Conquer, and Dynamic Programming to strengthen coding interviews preparation.",
    icon: <FaCertificate className="text-purple-400 text-4xl" />,
  }
];

const AchievementCard = ({ index, title, description, icon }: { index: number; title: string; description: string; icon: JSX.Element }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      transition: {
        duration: 0.2
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
      className="bg-black-200 p-8 rounded-2xl sm:w-[360px] w-full motion-section"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h3 className="text-white font-bold text-[24px]">{title}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="flex-shrink-0">{icon}</div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
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
      >
        <p className={styles.sectionSubText}>Recognition & Milestones</p>
        <h2 className={styles.sectionHeadText}>Achievements.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={`achievement-${index}`}
            index={index}
            {...achievement}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Achievements, "achievements"); 