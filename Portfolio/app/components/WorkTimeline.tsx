'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../constants/styles';
import SectionWrapper from './SectionWrapper';
import { fadeIn, textVariant } from './utils/motion';
import { company } from '../../public/assets';
import { FaBriefcase, FaCode, FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa';

interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
  jobIcon: React.ReactNode;
  tech: string[];
}

const experiences: Experience[] = [
  {
    title: "Frontend Developer",
    company_name: "CodeX Interns",
    icon: company.meta,
    iconBg: "#383E56",
    date: "March 2025 - March 2025",
    jobIcon: <FaCode className="text-2xl text-blue-400" />,
    points: [
      "Building and refining web applications with React.js, Next.js, JavaScript, HTML, CSS, and Tailwind CSS",
      "Working alongside cross-functional teams to improve UI/UX and guarantee responsiveness.",
      "Adopting contemporary frontend techniques to boost performance and scalability.",
      "Optimizing application performance resulting in 40% faster page load times and improved SEO rankings",
      " Gaining knowledge and experience through hands-on projects, enhancing problem-solving and debugging abilities."
    ],
    tech: ["React", "Node.js", "TypeScript", "Tailwind CSS", "Next.js", "JavaScript"]
  },
  {
    title: "Frontend Developer",
    company_name: "SPARK KREATIVE LTD.",
    icon: company.tesla,
    iconBg: "#E6DEDD",
    date: "October 2024 - December 2024",
    jobIcon: <FaLaptopCode className="text-2xl text-green-400" />,
    points: [
      "Worked as a Web Developer intern at Spark Kreative Ltd",
      "Collaborated with cross-functional teams to deliver high-quality products meeting client requirements",
      "building responsive web applications using React.js, Node.js, and MongoDB",
      "Developed scalable backend services, optimized performance, and collaborated with cross-functional teams to enhance user experience.",
      "Integrated RESTful APIs and optimized state management using Redux and Context API"
    ],
    tech: ["React", "JavaScript", "html", "UI UX", "API", "Tailwind CSS"]
  },
  {
    title: "Web Developer",
    company_name: "Google for Developers.",
    icon: company.shopify,
    iconBg: "#383E56",
    date: "January 2025 - Present",
    jobIcon: <FaMobileAlt className="text-2xl text-purple-400" />,
    points: [
      "Actively engaged in the Google Developer community, attending events like Devpreneur Connect: Angular and Beyond powered by GDG Gurugram",
      " Contributed to open-source projects, expanding knowledge in Angular, MERN stack, and backend development.",
      "Networked with industry experts, enhancing technical skills and problem-solving abilities.",
      "Explored innovative solutions through hands-on projects and collaborations, fueling my passion for software development.",
      "Worked closely with UI/UX designers to implement pixel-perfect interfaces"
    ],
    tech: ["React js", "Google Cloud", "JavaScript", "Firebase", "Kubernetes", "API", "Next js", "Node js", "Express js","GCP", "Backend Development"]
  },
  {
    title: "Open Source Contributor",
    company_name: "Hacktoberfest",
    icon: company.starbucks,
    iconBg: "#E6DEDD",
    date: "October 2024 - October 2024",
    jobIcon: <FaServer className="text-2xl text-red-400" />,
    points: [
      "Participated in Hacktoberfest by contributing to various open-source repositories, fixing bugs, improving documentation, and adding new features.",
      "Learned how to collaborate with developers worldwide through GitHub by raising pull requests (PRs), reviewing code, and understanding open-source project structures.",
      "Enhanced my technical skills in technologies like C, C++, JavaScript, and Web Development by working on real-world projects and solving issues.",
      "Became a part of a global developer community, building confidence to contribute more actively to open-source projects beyond Hacktoberfest.",
    ],
    tech: ["Node.js", "Express", "MongoDB", "JavaScript", "HTML", "CSS", "React js", "TypeScript", "Tailwind CSS"]
  },
];

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => (
  <div className="timeline-item">
    {/* Timeline dot */}
    <div className="timeline-dot" style={{ backgroundColor: experience.iconBg }}>
      <div className="timeline-icon">
        {experience.jobIcon}
      </div>
    </div>

    {/* Timeline content */}
    <motion.div
      variants={fadeIn(index % 2 === 0 ? "left" : "right", "spring", index * 0.3, 0.75)}
      className={`timeline-content neon-border-hover ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
    >
      <div className="bg-tertiary rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full flex-shrink-0 flex justify-center items-center" style={{ backgroundColor: experience.iconBg }}>
            <img 
              src={experience.icon} 
              alt={experience.company_name} 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="text-white text-xl font-bold">{experience.title}</h3>
            <p className="text-secondary font-medium">{experience.company_name}</p>
            <p className="text-white-100 text-sm">{experience.date}</p>
          </div>
        </div>

        <ul className="list-disc ml-5 space-y-1.5 mb-4">
          {experience.points.map((point, pointIndex) => (
            <li 
              key={`experience-point-${index}-${pointIndex}`}
              className="text-white-100 text-sm pl-1">
              {point}
            </li>
          ))}
        </ul>
        
        <div className="pt-3 border-t border-gray-700">
          <p className="text-secondary text-sm mb-2">Technologies:</p>
          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech, techIndex) => (
              <span 
                key={`tech-${index}-${techIndex}`}
                className="px-2 py-1 bg-black-200 rounded-full text-xs text-white-100">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const WorkTimeline: React.FC = (  ) => {
  return (
    <>
      <motion.div variants={textVariant()} className="mb-20">
        <p className={`${styles.sectionSubText} uppercase`}>WHAT I HAVE DONE SO FAR</p>
        <h2 className={`${styles.sectionHeadText}`}>Work Experience.</h2>
      </motion.div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(WorkTimeline, "work"); 