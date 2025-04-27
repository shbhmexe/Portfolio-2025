'use client';
import { motion } from "framer-motion";
import { staggerContainer } from "./utils/motion";
import { FC } from "react";

// Fix the HOC by using a more explicit function syntax
const SectionWrapper = (Component: FC, idName: string) => {
  const HOC: FC = () => {
    return (
      <div className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0">
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </div>
    );
  };
  
  return HOC;
};

export default SectionWrapper; 