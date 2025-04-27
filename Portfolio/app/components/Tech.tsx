'use client';
import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { technologies } from "../constants";
import { motion } from "framer-motion";

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <motion.div 
          className="w-28 h-28" 
          key={technology.name}
          onMouseEnter={() => setHoveredTech(technology.name)}
          onMouseLeave={() => setHoveredTech(null)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div 
            className={`w-full h-full flex items-center justify-center rounded-full p-2 transform transition-all duration-300 ${
              hoveredTech === technology.name 
                ? "bg-[#915eff] shadow-[0_0_20px_rgba(145,94,255,0.5)]" 
                : "bg-tertiary"
            }`}
          >
            <motion.img
              src={technology.icon}
              alt={technology.name}
              className={`w-16 h-16 object-contain ${
                hoveredTech === technology.name ? "filter-none" : ""
              }`}
              animate={{
                rotate: hoveredTech === technology.name ? 360 : 0
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className={`text-center mt-2 transition-all duration-300 ${
            hoveredTech === technology.name ? "text-white font-bold" : "text-secondary"
          }`}>{technology.name}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, ""); 