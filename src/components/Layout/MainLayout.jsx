import { Box, GlobalStyles } from '@mui/material';
import Navbar from './Navbar';

export default function MainLayout({ children, toggleTheme, isDarkMode }) {
  return (
    <>
      <GlobalStyles styles={{ 
        body: { 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e8f0fe 100%)',
          minHeight: '100vh',
          width: '100vw',
          margin: 0,
          padding: 0,
          overflowX: 'hidden'
        }
      }} />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: 0,
        width: '100vw',
        bgcolor: 'transparent',
        overflowX: 'hidden'
      }}>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: { xs: 2, sm: 4 },
            px: { xs: 0, sm: 0 },
            width: '100vw',
            minWidth: 0,
            bgcolor: 'transparent'
          }}
        >
          <Box sx={{ width: '100%', minWidth: 0 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
} 