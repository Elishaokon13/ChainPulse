import { Box, Container, GlobalStyles } from '@mui/material';
import Navbar from './Navbar';

export default function MainLayout({ children, toggleTheme, isDarkMode }) {
  return (
    <>
      <GlobalStyles styles={{ body: { background: 'linear-gradient(135deg, #f8fafc 0%, #e8f0fe 100%)' } }} />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4
          }}
        >
          <Container maxWidth="xl">
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
} 