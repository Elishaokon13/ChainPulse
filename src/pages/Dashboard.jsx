import { useState, useEffect } from 'react';
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
  IconButton,
  Tooltip,
  Paper,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { getProjects } from '../data/api';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsPanel from '../components/ProjectDetailsPanel';

const chains = ['All', 'Ethereum', 'Solana', 'Arbitrum'];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedChain, setSelectedChain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        console.log('Received projects from API:', data);
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChainChange = (event, newChain) => {
    if (newChain !== null) {
      setSelectedChain(newChain);
    }
  };

  // Filter projects based on search and chain
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChain = selectedChain === 'All' || project.chain === selectedChain;
    return matchesSearch && matchesChain;
  });

  // Separate projects into trending and hyped but weak
  const trendingProjects = filteredProjects.filter(p => p.score >= 70).slice(0, 4);
  const hypedProjects = filteredProjects.filter(p => p.score < 40).slice(0, 4);
  const signalProjects = [...trendingProjects, ...hypedProjects].slice(0, 4);

  console.log('Filtered projects:', {
    all: projects.length,
    filtered: filteredProjects.length,
    trending: trendingProjects.length,
    hyped: hypedProjects.length,
    signal: signalProjects.length
  });

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseDetails = () => {
    setSelectedProjectId(null);
  };

  const GrowthMetric = ({ value, label }) => {
    const isPositive = value > 0;
    const color = isPositive ? 'success.main' : 'error.main';
    const Icon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;
    
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography color="text.secondary">{label}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Icon sx={{ color, fontSize: '1rem' }} />
          <Typography sx={{ color, fontWeight: 500 }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ pb: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontFamily: 'Charter',
              fontWeight: 600,
              color: 'primary.main',
              mb: 2
            }}
          >
            ChainPulse – Spot Projects with Onchain Growth Before the Hype
          </Typography>

          {/* Search and Filter Bar */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search by project name or token..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                },
              }}
            />
            <ToggleButtonGroup
              value={selectedChain}
              exclusive
              onChange={handleChainChange}
              aria-label="chain filter"
              sx={{
                '& .MuiToggleButton-root': {
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                },
              }}
            >
              {chains.map((chain) => (
                <ToggleButton key={chain} value={chain}>
                  {chain}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Trending Projects Section */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main'
            }}
          >
            <TrendingUpIcon /> Trending Projects
          </Typography>
          <Grid container spacing={3}>
            {trendingProjects.map((project) => (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
                    border: '1px solid rgba(26, 115, 232, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {project.name}
                      </Typography>
                      <Chip 
                        label={project.chain} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(26, 115, 232, 0.1)',
                          color: 'primary.main'
                        }} 
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <GrowthMetric value={15} label="TVL Growth" />
                      <GrowthMetric value={8} label="Wallet Growth" />
                      <GrowthMetric value={-3} label="Social Growth" />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography color="text.secondary">Score</Typography>
                        <Typography 
                          sx={{ 
                            color: project.score >= 70 ? 'success.main' : 
                                  project.score >= 40 ? 'warning.main' : 'error.main',
                            fontWeight: 500
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

        {/* Hyped but Weak Projects Section */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'warning.main'
            }}
          >
            <WarningIcon /> Hyped but Weak Projects
          </Typography>
          <Grid container spacing={3}>
            {hypedProjects.map((project) => (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <Paper 
                  sx={{ 
                    p: 3,
                    background: 'linear-gradient(145deg, #fff8e1 0%, #fff3e0 100%)',
                    border: '1px solid rgba(255, 152, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {project.name}
                    </Typography>
                    <Chip 
                      label={project.chain} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        color: 'warning.main'
                      }} 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <GrowthMetric value={-5} label="TVL Growth" />
                    <GrowthMetric value={-2} label="Wallet Growth" />
                    <GrowthMetric value={25} label="Social Growth" />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography color="text.secondary">Score</Typography>
                      <Typography color="warning.main" fontWeight={500}>
                        {project.score}/100
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Signal of the Week Section */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main'
            }}
          >
            <InfoIcon /> Signal of the Week
          </Typography>
          <Grid container spacing={3}>
            {signalProjects.map((project) => (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <Paper 
                  sx={{ 
                    p: 3,
                    background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
                    border: '1px solid rgba(26, 115, 232, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {project.name}
                    </Typography>
                    <Chip 
                      label={project.chain} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(26, 115, 232, 0.1)',
                        color: 'primary.main'
                      }} 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <GrowthMetric value={12} label="TVL Growth" />
                    <GrowthMetric value={7} label="Wallet Growth" />
                    <GrowthMetric value={-2} label="Social Growth" />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography color="text.secondary">Score</Typography>
                      <Typography 
                        sx={{ 
                          color: project.score >= 70 ? 'success.main' : 
                                project.score >= 40 ? 'warning.main' : 'error.main',
                          fontWeight: 500
                        }}
                      >
                        {project.score}/100
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Trending Projects" />
          <Tab label="Hyped but Weak" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard 
              project={project} 
              onClick={handleProjectClick}
            />
          </Grid>
        ))}
      </Grid>

      <ProjectDetailsPanel
        projectId={selectedProjectId}
        open={!!selectedProjectId}
        onClose={handleCloseDetails}
      />
    </Box>
  );
} 