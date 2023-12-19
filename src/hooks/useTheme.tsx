import {createContext, useContext, useState} from 'react';
import {getPreferredTheme, setDocumentTheme} from '../lib/utils';

export type Theme = 'dark' | 'light';

interface ThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const currentTheme = getPreferredTheme();

const ThemeContext = createContext<ThemeContext>({theme: currentTheme, setTheme: () => null});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState(currentTheme);

  function setGlobalTheme(theme: Theme) {
    setTheme(theme);
    setDocumentTheme(theme);
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme: setGlobalTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
