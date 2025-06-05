import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { getProjects } from '../data/api';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsPanel from '../components/ProjectDetailsPanel';
import { useTheme } from './ThemeContext';

const chains = ['All', 'Ethereum', 'Solana', 'Arbitrum'];

export default function Dashboard() {
  const { isDarkMode } = useTheme();
  const [selectedChain, setSelectedChain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChainChange = (event, newChain) => {
    if (newChain !== null) {
      setSelectedChain(newChain);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesChain =
        selectedChain === 'All' || project.chain === selectedChain;
      return matchesSearch && matchesChain;
    });
  }, [projects, searchQuery, selectedChain]);

  const trendingProjects = filteredProjects
    .filter((p) => p.score >= 70)
    .slice(0, 4);
  const hypedProjects = filteredProjects
    .filter((p) => p.score < 40)
    .slice(0, 4);
  const signalProjects = [...trendingProjects, ...hypedProjects].slice(0, 4);

  const tabFilteredProjects = selectedTab === 0 ? trendingProjects : hypedProjects;

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseDetails = () => {
    setSelectedProjectId(null);
  };

  const GrowthMetric = ({ value, label }) => {
    const isPositive = value >= 0;
    const color = isPositive ? 'success.main' : 'error.main';
    const Icon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.75 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Icon sx={{ color, fontSize: '1rem' }} />
          <Typography
            variant="body2"
            sx={{
              color,
              fontWeight: 600,
              background: isPositive
                ? 'linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0) 100%)'
                : 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0) 100%)',
              px: 1,
              borderRadius: 1,
            }}
          >
            {Math.abs(value)}%
          </Typography>
        </Box>
      </Box>
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress
          size={48}
          sx={{
            color: 'primary.main',
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)', opacity: 1 },
              '50%': { transform: 'scale(1.2)', opacity: 0.7 },
              '100%': { transform: 'scale(1)', opacity: 1 },
            },
          }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error.main" gutterBottom sx={{ fontWeight: 600 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={fetchProjects}
          sx={{
            mt: 2,
            borderRadius: 3,
            background: 'linear-gradient(45deg, #3B82F6 30%, #60A5FA 90%)',
            color: 'primary.contrastText',
            fontWeight: 600,
            px: 4,
            py: 1,
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #2563EB 30%, #3B82F6 90%)',
              boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 3, sm: 4, md: 6 },
        minHeight: '100vh',
        background: isDarkMode
          ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
          : 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isDarkMode
            ? 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ maxWidth: '1400px', mx: 'auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="display1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textShadow: isDarkMode
                ? '0 0 10px rgba(147, 197, 253, 0.3)'
                : 'none',
            }}
          >
            ChainPulse – Spot Projects with Onchain Growth Before the Hype
          </Typography>

          {/* Search and Filter Bar */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 4 }}>
            <TextField
              fullWidth
              placeholder="Search by project name or token..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: isDarkMode
                    ? 'rgba(30, 41, 59, 0.8)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.light',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                  fontWeight: 500,
                },
              }}
            />
            <ToggleButtonGroup
              value={selectedChain}
              exclusive
              onChange={handleChainChange}
              aria-label="chain filter"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                '& .MuiToggleButton-root': {
                  borderRadius: '20px !important',
                  textTransform: 'none',
                  px: 3,
                  py: 0.75,
                  border: 'none',
                  backgroundColor: isDarkMode
                    ? 'rgba(30, 41, 59, 0.8)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    background: isDarkMode
                      ? 'linear-gradient(45deg, #3B82F6 30%, #60A5FA 90%)'
                      : 'linear-gradient(45deg, #1E293B 30%, #334155 90%)',
                    color: 'primary.contrastText',
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                    '&:hover': {
                      background: isDarkMode
                        ? 'linear-gradient(45deg, #2563EB 30%, #3B82F6 90%)'
                        : 'linear-gradient(45deg, #0F172A 30%, #1E293B 90%)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: isDarkMode
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'rgba(30, 41, 59, 0.1)',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)',
                  },
                },
              }}
            >
              {chains.map((chain) => (
                <ToggleButton
                  key={chain}
                  value={chain}
                  sx={{
                    ...(chain === 'All' && {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                    }),
                  }}
                >
                  {chain === 'All' && <SearchIcon sx={{ fontSize: '1.1rem' }} />}
                  {chain}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Trending Projects Section */}
        {trendingProjects.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                fontWeight: 600,
                textShadow: isDarkMode
                  ? '0 0 8px rgba(59, 130, 246, 0.3)'
                  : 'none',
              }}
            >
              <TrendingUpIcon fontSize="medium" /> Trending Projects
            </Typography>
            <Grid container spacing={3}>
              {trendingProjects.map((project) => (
                <Grid item xs={12} sm={6} md={3} key={project.id}>
                  <Card
                    sx={{
                      height: '100%',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      backgroundColor: isDarkMode
                        ? 'rgba(30, 41, 59, 0.7)'
                        : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(12px)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: isDarkMode
                        ? '0 4px 20px rgba(59, 130, 246, 0.2)'
                        : '0 4px 20px rgba(0, 0, 0, 0.05)',
                      border: isDarkMode
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDarkMode
                          ? '0 8px 30px rgba(59, 130, 246, 0.4)'
                          : '0 8px 30px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {project.name}
                        </Typography>
                        <Chip
                          label={project.chain}
                          size="small"
                          sx={{
                            background: isDarkMode
                              ? 'linear-gradient(45deg, #3B82F6 30%, #60A5FA 90%)'
                              : 'linear-gradient(45deg, #1E293B 30%, #334155 90%)',
                            color: 'primary.contrastText',
                            fontWeight: 600,
                            borderRadius: 2,
                            boxShadow: isDarkMode
                              ? '0 0 8px rgba(59, 130, 246, 0.3)'
                              : 'none',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <GrowthMetric value={project.tvlGrowth || 0} label="TVL Growth" />
                        <GrowthMetric value={project.walletGrowth || 0} label="Wallet Growth" />
                        <GrowthMetric value={project.socialGrowth || 0} label="Social Growth" />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Score
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                project.score >= 70
                                  ? 'success.main'
                                  : project.score >= 40
                                  ? 'warning.main'
                                  : 'error.main',
                              fontWeight: 600,
                              background: isDarkMode
                                ? 'rgba(59, 130, 246, 0.1)'
                                : 'rgba(30, 41, 59, 0.05)',
                              px: 1.5,
                              borderRadius: 2,
                            }}
                          >
                            {project.score}/100
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Hyped but Weak Projects Section */}
        {hypedProjects.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'warning.main',
                fontWeight: 600,
                textShadow: isDarkMode
                  ? '0 0 8px rgba(245, 158, 11, 0.3)'
                  : 'none',
              }}
            >
              <WarningIcon fontSize="medium" /> Hyped but Weak Projects
            </Typography>
            <Grid container spacing={3}>
              {hypedProjects.map((project) => (
                <Grid item xs={12} sm={6} md={3} key={project.id}>
                  <Card
                    sx={{
                      height: '100%',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      backgroundColor: isDarkMode
                        ? 'rgba(30, 41, 59, 0.7)'
                        : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(12px)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: isDarkMode
                        ? '0 4px 20px rgba(245, 158, 11, 0.2)'
                        : '0 4px 20px rgba(0, 0, 0, 0.05)',
                      border: isDarkMode
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDarkMode
                          ? '0 8px 30px rgba(245, 158, 11, 0.4)'
                          : '0 8px 30px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {project.name}
                        </Typography>
                        <Chip
                          label={project.chain}
                          size="small"
                          sx={{
                            background: isDarkMode
                              ? 'linear-gradient(45deg, #F59E0B 30%, #FBBF24 90%)'
                              : 'linear-gradient(45deg, #F59E0B 30%, #FBBF24 90%)',
                            color: 'warning.contrastText',
                            fontWeight: 600,
                            borderRadius: 2,
                            boxShadow: isDarkMode
                              ? '0 0 8px rgba(245, 158, 11, 0.3)'
                              : 'none',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <GrowthMetric value={project.tvlGrowth || 0} label="TVL Growth" />
                        <GrowthMetric value={project.walletGrowth || 0} label="Wallet Growth" />
                        <GrowthMetric value={project.socialGrowth || 0} label="Social Growth" />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Score
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'warning.main',
                              fontWeight: 600,
                              background: isDarkMode
                                ? 'rgba(245, 158, 11, 0.1)'
                                : 'rgba(245, 158, 11, 0.05)',
                              px: 1.5,
                              borderRadius: 2,
                            }}
                          >
                            {project.score}/100
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Signal of the Week Section */}
        {signalProjects.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                fontWeight: 600,
                textShadow: isDarkMode
                  ? '0 0 8px rgba(59, 130, 246, 0.3)'
                  : 'none',
              }}
            >
              <InfoIcon fontSize="medium" /> Signal of the Week
            </Typography>
            <Grid container spacing={3}>
              {signalProjects.map((project) => (
                <Grid item xs={12} sm={6} md={3} key={project.id}>
                  <Card
                    sx={{
                      height: '100%',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      backgroundColor: isDarkMode
                        ? 'rgba(30, 41, 59, 0.7)'
                        : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(12px)',
                      transition: 'transform ㅤ0.3s ease, box-shadow 0.3s ease',
                      boxShadow: isDarkMode
                        ? '0 4px 20px rgba(59, 130, 246, 0.2)'
                        : '0 4px 20px rgba(0, 0, 0, 0.05)',
                      border: isDarkMode
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDarkMode
                          ? '0 8px 30px rgba(59, 130, 246, 0.4)'
                          : '0 8px 30px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {project.name}
                        </Typography>
                        <Chip
                          label={project.chain}
                          size="small"
                          sx={{
                            background: isDarkMode
                              ? 'linear-gradient(45deg, #3B82F6 30%, #60A5FA 90%)'
                              : 'linear-gradient(45deg, #1E293B 30%, #334155 90%)',
                            color: 'primary.contrastText',
                            fontWeight: 600,
                            borderRadius: 2,
                            boxShadow: isDarkMode
                              ? '0 0 8px rgba(59, 130, 246, 0.3)'
                              : 'none',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <GrowthMetric value={project.tvlGrowth || 0} label="TVL Growth" />
                        <GrowthMetric value={project.walletGrowth || 0} label="Wallet Growth" />
                        <GrowthMetric value={project.socialGrowth || 0} label="Social Growth" />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Score
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                project.score >= 70
                                  ? 'success.main'
                                  : project.score >= 40
                                  ? 'warning.main'
                                  : 'error.main',
                              fontWeight: 600,
                              background: isDarkMode
                                ? 'rgba(59, 130, 246, 0.1)'
                                : 'rgba(30, 41, 59, 0.05)',
                              px: 1.5,
                              borderRadius: 2,
                            }}
                          >
                            {project.score}/100
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Tabs for Filtering Projects */}
        <Paper
          sx={{
            mb: 5,
            backgroundColor: isDarkMode
              ? 'rgba(30, 41, 59, 0.7)'
              : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: 'none',
            borderRadius: 3,
            boxShadow: isDarkMode
              ? '0 4px 20px rgba(59, 130, 246, 0.2)'
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'primary.light',
                },
              },
              '& .MuiTabs-indicator': {
                background: isDarkMode
                  ? 'linear-gradient(90deg, #3B82F6, #60A5FA)'
                  : 'linear-gradient(90deg, #1E293B, #334155)',
                height: 3,
                boxShadow: isDarkMode
                  ? '0 0 10px rgba(59, 130, 246, 0.5)'
                  : 'none',
              },
            }}
          >
            <Tab label="Trending Projects" />
            <Tab label="Hyped but Weak" />
          </Tabs>
        </Paper>

        {/* Display Filtered Projects Based on Tabs */}
        <Grid container spacing={3}>
          {tabFilteredProjects.length > 0 ? (
            tabFilteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard
                  project={project}
                  onClick={handleProjectClick}
                  sx={{
                    backgroundColor: isDarkMode
                      ? 'rgba(30, 41, 59, 0.7)'
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    border: 'none',
                    borderRadius: 4,
                    boxShadow: isDarkMode
                      ? '0 4px 20px rgba(59, 130, 246, 0.2)'
                      : '0 4px 20px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: isDarkMode
                        ? '0 8px 30px rgba(59, 130, 246, 0.4)'
                        : '0 8px 30px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 4, fontWeight: 500 }}>
                No projects found for this category.
              </Typography>
            </Grid>
          )}
        </Grid>

        <ProjectDetailsPanel
          projectId={selectedProjectId}
          open={!!selectedProjectId}
          onClose={handleCloseDetails}
        />
      </Box>
    </Box>
  );
}