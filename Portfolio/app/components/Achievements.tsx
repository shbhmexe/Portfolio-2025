'use client';
import { motion } from "framer-motion";
import { styles } from "../constants/styles";
import SectionWrapper from "./SectionWrapper";
import { fadeIn, textVariant } from "./utils/motion";
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
    title: "Google Developer Cloud Memeber",
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

const AchievementCard = ({ index, title, description, icon }: { index: number; title: string; description: string; icon: JSX.Element }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-8 rounded-2xl sm:w-[360px] w-full"
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

const Achievements = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
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