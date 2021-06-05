import React, { createContext, useMemo, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

interface Props {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextData>({
  theme: dark,
  toggleTheme: () => {
    console.log("ThemeProvider isn't rendered 😞");
  },
});

function ThemeContextProvider({ children }: Props) {
  const [theme, setTheme] = useState(dark);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  const memoizedValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={memoizedValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
