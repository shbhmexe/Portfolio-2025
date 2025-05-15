'use client';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { socialLinks } from '../constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-tertiary border-t border-[#33306b] py-5 xs:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xs:flex-row justify-between items-center gap-3 xs:gap-4">
          <div className="mb-3 xs:mb-0 text-center xs:text-left">
            <p className="text-secondary text-xs xs:text-sm sm:text-base font-medium">
              © Shubham Shukla {currentYear}. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-5 xs:space-x-6 sm:space-x-8">
            <Link 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:text-white-100 transition-colors duration-300 transform hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
            </Link>
            <Link 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:text-white-100 transition-colors duration-300 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
            </Link>
            <Link 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:text-white-100 transition-colors duration-300 transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 