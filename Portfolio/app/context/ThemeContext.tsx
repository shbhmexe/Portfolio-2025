'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  // Always force dark theme on initial load
  useEffect(() => {
    // Remove any light theme class
    document.documentElement.classList.remove('light-theme');
    
    // Force dark theme in localStorage
    localStorage.setItem('theme', 'dark');
    
    // Ensure theme state is dark
    setTheme('dark');
  }, []);

  const toggleTheme = () => {
    // For this version, we're disabling theme toggle and always using dark
    setTheme('dark');
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.remove('light-theme');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 