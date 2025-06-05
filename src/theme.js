import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Grotesk", system-ui, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      letterSpacing: '-0.015em',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.015em',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '-0.015em',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.015em',
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      letterSpacing: '-0.015em',
      lineHeight: 1.6,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.125rem',
      letterSpacing: '-0.015em',
      lineHeight: 1.7,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '-0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '-0.01em',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
    },
    overline: {
      fontWeight: 500,
      fontSize: '0.75rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '-0.01em',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '-0.01em',
    },
    input: {
      fontSize: '0.875rem',
    },
    label: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    helperText: {
      fontSize: '0.75rem',
    },
    error: {
      fontSize: '0.75rem',
    },
    text: {
      fontSize: '0.875rem',
    },
    menu: {
      fontSize: '0.875rem',
    },
    navigation: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    small: {
      fontSize: '0.75rem',
    },
    large: {
      fontSize: '1.25rem',
    },
    medium: {
      fontSize: '1rem',
    },
    tiny: {
      fontSize: '0.75rem',
    },
    monospace: {
      fontSize: '0.875rem',
    },
    display1: {
      fontWeight: 600,
      fontSize: '3rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    display2: {
      fontWeight: 600,
      fontSize: '4rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    display3: {
      fontWeight: 600,
      fontSize: '5rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    display4: {
      fontWeight: 600,
      fontSize: '6rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
  },
  palette: {
    primary: {
      main: '#1E293B',
      light: '#334155',
      dark: '#0F172A',
    },
    secondary: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#475569',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#22C55E',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6', // Merged from duplicate palette definition
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
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
          borderRadius: 16,
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        },
      },
    },
  },
});

export default theme;