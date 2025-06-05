import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#93C5FD' : '#1E293B',
        light: isDarkMode ? '#60A5FA' : '#334155',
        dark: isDarkMode ? '#3B82F6' : '#0F172A',
      },
      secondary: {
        main: isDarkMode ? '#818CF8' : '#64748B',
        light: isDarkMode ? '#6366F1' : '#94A3B8',
        dark: isDarkMode ? '#4F46E5' : '#475569',
      },
      background: {
        default: isDarkMode ? '#0F172A' : '#F8FAFC',
        paper: isDarkMode ? '#1E293B' : '#FFFFFF',
      },
      text: {
        primary: isDarkMode ? '#F8FAFC' : '#1E293B',
        secondary: isDarkMode ? '#94A3B8' : '#64748B',
      },
    },
    typography: {
      fontFamily: '"Grotesk", system-ui, sans-serif',
      h1: {
        fontFamily: '"Grotesk", system-ui, sans-serif',
        fontWeight: 600,
        fontSize: '2.5rem',
        letterSpacing: '-0.015em',
      },
      h2: {
        fontFamily: '"Grotesk", system-ui, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
        letterSpacing: '-0.015em',
      },
      h3: {
        fontFamily: '"Grotesk", system-ui, sans-serif',
        fontWeight: 600,
        fontSize: '1.75rem',
        letterSpacing: '-0.015em',
      },
      h4: {
        fontFamily: '"Grotesk", system-ui, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
        letterSpacing: '-0.015em',
      },
      h5: {
        fontFamily: '"Grotesk", system-ui, sans-serif',
        fontWeight: 500,
        fontSize: '1.25rem',
        letterSpacing: '-0.015em',
      },
      h6: {
        fontFamily: '"Grotesk", system-ui, sans-serif',
        fontWeight: 500,
        fontSize: '1.125rem',
        letterSpacing: '-0.015em',
      },
      body1: {
        fontFamily: '"Grotesk", system-ui, sans-serif',
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontFamily: '"Grotesk", system-ui, sans-serif',
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            fontWeight: 600,
            textTransform: 'none',
            padding: '8px 20px',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme: () => {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
