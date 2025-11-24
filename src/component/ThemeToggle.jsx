import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check user's system preference or saved theme
    const savedTheme = localStorage.getItem('unilag-yard-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDark(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (dark) => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('unilag-yard-theme', theme);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
    
    // Add haptic feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Prevent SSR mismatch
  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Loading theme">
        <Sun size={20} />
      </button>
    );
  }

  return (
    <button 
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun size={20} className="theme-icon" />
      ) : (
        <Moon size={20} className="theme-icon" />
      )}
      <span className="theme-tooltip">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;