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
  Menu as MenuIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Button as ShadcnButton } from "@/components/ui/button";
import ThemeSwitcher from '../ui/ThemeSwitcher';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Projects', icon: <SearchIcon />, path: '/projects' },
  { text: 'Signals', icon: <PsychologyIcon />, path: '/signals' },
  { text: 'Metrics', icon: <TrendingUpIcon />, path: '/metrics' },
  { text: 'About', icon: <InfoIcon />, path: '/about' }
];

export default function Navbar() {
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
          fontFamily: 'Grotesk',
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
      <Divider />
      <List>
        <ListItem button>
          <ThemeSwitcher />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          {isMobile && (
            <Button
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="mr-2 md:hidden" size="icon" variant="ghost"
            >
              <MenuIcon className="h-6 w-6"/>
            </Button>
          )}

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 mr-6"
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: 'Charter',
                fontWeight: 600,
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              ChainPulse
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow items-center gap-1">
            {navItems.map((item) => (
              <ShadcnButton
                key={item.text}
                asChild
                variant="ghost"
                className={`
                  ${location.pathname === item.path ? 'text-primary' : 'text-secondary-foreground'}
                  hover:bg-accent
                  hover:text-accent-foreground
                  data-[state=active]:text-primary
                  h-auto
                `}
              >
                <Link to={item.path} className="flex items-center gap-1">
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              </ShadcnButton>
            ))}
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center gap-1">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Material UI - for now) */}
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
    </nav>
  );
} 