import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Charter", sans-serif',
    h1: {
      fontFamily: 'Charter',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Charter',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Charter',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Charter',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Montserrat',
    },
    body2: {
      fontFamily: 'Montserrat',
    },
  },
  palette: {
    primary: {
      main: '#1a73e8',
      light: '#4285f4',
      dark: '#0d47a1',
    },
    secondary: {
      main: '#ffffff',
      dark: '#f5f5f5',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a2027',
      secondary: '#4a5568',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        },
      },
    },
  },
}); 