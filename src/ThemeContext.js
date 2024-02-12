import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleThemeShortcut = useCallback((event) => {
    if (event.key === 'q' && event.ctrlKey) {
      toggleTheme();
    }
  }, [toggleTheme]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'q' && event.ctrlKey) {
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleThemeShortcut);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keydown', handleThemeShortcut);
    };
  }, [toggleTheme, handleThemeShortcut]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
