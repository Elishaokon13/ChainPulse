import React from 'react';
import { useTheme } from "../../contexts/ThemeContext";
import {
  IconButton,
  Tooltip,
  Box,
  Typography,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
        <IconButton
          size="small"
          onClick={toggleTheme}
          sx={{
            p: 0.5,
            borderRadius: '8px',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          fontSize: '0.875rem',
          display: 'none',
          [muiTheme.breakpoints.up('sm')]: {
            display: 'block',
          },
        }}
      >
        {isDarkMode ? 'Light' : 'Dark'}
      </Typography>
    </Box>
  );
};

export default ThemeSwitcher;
