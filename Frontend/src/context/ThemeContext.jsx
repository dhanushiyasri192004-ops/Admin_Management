import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const applyThemeToDOM = (themeMode) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;

  if (themeMode === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
    if (body) {
      body.classList.add('dark');
      body.classList.remove('light');
      body.setAttribute('data-theme', 'dark');
    }
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
    if (body) {
      body.classList.remove('dark');
      body.classList.add('light');
      body.setAttribute('data-theme', 'light');
    }
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    let saved = null;
    try {
      saved = localStorage.getItem('ams_theme');
    } catch (e) {}
    const initialTheme = saved === 'dark' ? 'dark' : 'light';
    applyThemeToDOM(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    applyThemeToDOM(theme);
    try {
      localStorage.setItem('ams_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyThemeToDOM(nextTheme);
    try {
      localStorage.setItem('ams_theme', nextTheme);
    } catch (e) {}
    setTheme(nextTheme);
  };

  const setExplicitTheme = (newTheme) => {
    if (newTheme !== 'light' && newTheme !== 'dark') return;
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem('ams_theme', newTheme);
    } catch (e) {}
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setExplicitTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
