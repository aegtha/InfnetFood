import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    background: isDarkMode ? '#121212' : '#f5f5f5',
    card: isDarkMode ? '#1e1e1e' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#333333',
    subtitle: isDarkMode ? '#bbbbbb' : '#666666',
    accent: '#ff5c5c',
    divider: isDarkMode ? '#333333' : '#eeeeee',
    input: isDarkMode ? '#2d2d2d' : '#ffffff',
    inputBorder: isDarkMode ? '#444444' : '#dddddd'
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}