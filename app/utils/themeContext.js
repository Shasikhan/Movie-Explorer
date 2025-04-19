// ThemeContext.tsx
import React, {createContext, useContext, useState} from 'react';
import {theme} from './theme'; // Assuming you have this theme setup.

export const ThemeContext = createContext({
  currentTheme: theme.dark,
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}) => {
  const [currentTheme, setCurrentTheme] = useState(theme.dark);

  const toggleTheme = () => {
    setCurrentTheme(prev => (prev.name === 'dark' ? theme.light : theme.dark));
  };

  return (
    <ThemeContext.Provider value={{currentTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
