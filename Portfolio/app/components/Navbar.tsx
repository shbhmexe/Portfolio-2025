'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { styles } from '../constants/styles';
import { navLinks } from '../constants';
import { usePathname } from 'next/navigation';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Social media links
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/shbhmexe', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/shubham-shukla-62095032a/', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://instagram.com/shbhm.exe', label: 'Instagram' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Close the mobile menu when clicking anywhere outside
    const handleClickOutside = (event: MouseEvent) => {
      if (toggle) {
        setToggle(false);
      }
    };

    // Add global click event to close menu
    if (toggle) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggle]);

  const closeMenu = () => {
    setToggle(false);
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-6 fixed top-0 z-[999] ${
        scrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          href='/'
          className='flex items-center gap-3 logo-text'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
            closeMenu();
          }}
        >
          <div className='w-10 h-10 rounded-full bg-[#915EFF] flex items-center justify-center text-white font-bold text-lg'>
            S
          </div>
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Shbhm.exe<span className='sm:ml-2 ml-1'>Portfolio</span>
          </p>
        </Link>

        <div className="flex items-center">
          {/* Social Icons - desktop only */}
          <div className="hidden sm:flex items-center mr-8 space-x-4">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-secondary hover:text-white transition-colors text-xl"
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          {/* Nav Links - desktop only */}
          <ul className='list-none hidden sm:flex flex-row gap-10'>
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? 'text-white' : 'text-secondary'
                } hover:text-white text-[18px] font-medium cursor-pointer transition-colors`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            id="mobile-menu-button"
            className='w-[28px] h-[28px] object-contain cursor-pointer z-20 flex flex-col justify-center items-center'
            onClick={(e) => {
              e.stopPropagation(); 
              setToggle(!toggle);
            }}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${toggle ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${toggle ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${toggle ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </button>

          <div
            id="mobile-menu"
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 bg-gradient-to-b from-[#0c0a1f] to-[#151030] backdrop-blur-md absolute top-20 right-0 mx-4 my-2 min-w-[200px] z-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out`}
            onClick={(e) => e.stopPropagation()} // Prevent click from immediately closing when clicking inside menu
          >
            <div className='flex flex-col items-end w-full'>
              <ul className='list-none flex justify-end items-end flex-1 flex-col gap-5 mb-6 w-full'>
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === nav.title ? 'text-white' : 'text-secondary'
                    }`}
                    onClick={() => {
                      setActive(nav.title);
                      closeMenu();
                    }}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>
                ))}
              </ul>
              
              {/* Social Icons - mobile menu */}
              <div className="flex items-center justify-end space-x-5 w-full mt-2 border-t border-gray-700 pt-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-secondary hover:text-white transition-colors text-xl"
                    onClick={closeMenu}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 