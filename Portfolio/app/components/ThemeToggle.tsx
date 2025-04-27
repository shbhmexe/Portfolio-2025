'use client';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  // Return null to hide the theme toggle button completely
  return null;
  
  /* Original button code removed
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 z-50 p-2 rounded-full bg-tertiary hover:bg-violet-600 transition-colors duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <FiSun className="text-white text-xl" />
      ) : (
        <FiMoon className="text-gray-800 text-xl" />
      )}
    </button>
  );
  */
};

export default ThemeToggle; 