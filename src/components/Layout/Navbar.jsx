import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Psychology as PsychologyIcon,
  TrendingUp as TrendingUpIcon,
  Code as CodeIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Projects', icon: <SearchIcon />, path: '/projects' },
  { text: 'Signals', icon: <PsychologyIcon />, path: '/signals' },
  { text: 'Metrics', icon: <TrendingUpIcon />, path: '/metrics' },
  { text: 'About', icon: <InfoIcon />, path: '/about' }
];

export default function Navbar({ toggleTheme, isDarkMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6" component="div" sx={{ 
          fontFamily: 'Charter',
          fontWeight: 600,
          color: 'primary.main'
        }}>
          ChainPulse
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(26, 115, 232, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(26, 115, 232, 0.12)',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 2,
                fontFamily: 'Charter',
                fontWeight: 600,
                color: 'primary.main',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              ChainPulse
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        backgroundColor: 'rgba(26, 115, 232, 0.08)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                color="primary" 
                onClick={toggleTheme}
                sx={{ ml: 1 }}
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            backgroundColor: 'background.paper'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
} 