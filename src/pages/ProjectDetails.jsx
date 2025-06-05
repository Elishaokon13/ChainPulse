import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Divider,
  Button,
  LinearProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { getProject } from '../data/api';
import ProjectSocialMentions from '../components/ProjectSocialMentions';
import SocialAnalytics from '../components/SocialAnalytics';
import MetricDetailsDrawer from '../components/MetricDetailsDrawer';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProject(id);
        setProject(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch project details. Please try again later.');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const GrowthMetric = ({ value, label, description }) => {
    const isPositive = value > 0;
    const color = isPositive ? 'success.main' : 'error.main';
    const Icon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;
    
    return (
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Icon sx={{ color, fontSize: '1rem' }} />
            <Typography sx={{ color, fontWeight: 500 }}>
              {Math.abs(value)}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    );
  };

  // Add a handler to open the metric details drawer
  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedMetric(null);
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

  if (!project) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Project not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
              {project.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip 
                label={project.chain} 
                sx={{ 
                  backgroundColor: 'rgba(26, 115, 232, 0.1)',
                  color: 'primary.main'
                }} 
              />
              <Chip 
                label={project.hype} 
                sx={{ 
                  backgroundColor: project.hype === 'High' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                  color: project.hype === 'High' ? 'warning.main' : 'success.main'
                }} 
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Project Score
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={project.score}
                size={80}
                thickness={4}
                sx={{
                  color: project.score >= 70 ? 'success.main' : 
                         project.score >= 40 ? 'warning.main' : 'error.main'
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" component="div" color="text.secondary">
                  {project.score}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Growth Metrics */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Growth Metrics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <GrowthMetric 
                  value={15} 
                  label="TVL Growth" 
                  description="Total Value Locked has increased by 15% in the last 30 days"
                />
                <GrowthMetric 
                  value={8} 
                  label="Wallet Growth" 
                  description="Number of active wallets has grown by 8% this month"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GrowthMetric 
                  value={-3} 
                  label="Social Growth" 
                  description="Social media mentions have decreased by 3% this week"
                />
                <GrowthMetric 
                  value={12} 
                  label="Developer Activity" 
                  description="GitHub commits have increased by 12% in the last month"
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Detailed Metrics */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Detailed Metrics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    TVL Distribution
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Staking</Typography>
                        <Typography variant="body2">60%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Lending</Typography>
                        <Typography variant="body2">30%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={30} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Other</Typography>
                        <Typography variant="body2">10%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={10} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Social Sentiment
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Positive</Typography>
                        <Typography variant="body2">65%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={65} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'success.main'
                          }
                        }} 
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Neutral</Typography>
                        <Typography variant="body2">25%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={25} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'warning.main'
                          }
                        }} 
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Negative</Typography>
                        <Typography variant="body2">10%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={10} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'error.main'
                          }
                        }} 
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Project Overview
            </Typography>
            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button fullWidth variant="contained" color="primary" sx={{ justifyContent: 'flex-start' }} onClick={() => handleMetricClick('tvl')}>
                Total Value Locked: ${project.tvl.toLocaleString()}
              </Button>
              <Button fullWidth variant="contained" color="primary" sx={{ justifyContent: 'flex-start' }} onClick={() => handleMetricClick('wallets')}>
                Active Wallets: {project.wallets.toLocaleString()}
              </Button>
              <Button fullWidth variant="contained" color="primary" sx={{ justifyContent: 'flex-start' }} onClick={() => handleMetricClick('mentions')}>
                Social Mentions: {Array.isArray(project.mentions) ? project.mentions.length : 0}
              </Button>
              <Button fullWidth variant="contained" color="primary" sx={{ justifyContent: 'flex-start' }} onClick={() => handleMetricClick('commits')}>
                GitHub Commits: {project.commits.toLocaleString()}
              </Button>
            </Box>
          </Paper>

          {/* Social Analytics Section */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <SocialAnalytics 
              projectHandle={project.twitterHandle} 
              mentions={project.mentions} 
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Risk Assessment
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Smart Contract Risk</Typography>
                  <Typography color="success.main">Low</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={20} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'success.main'
                    }
                  }} 
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Market Risk</Typography>
                  <Typography color="warning.main">Medium</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={50} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'warning.main'
                    }
                  }} 
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Social Risk</Typography>
                  <Typography color="error.main">High</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={80} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'error.main'
                    }
                  }} 
                />
              </Box>
            </Box>
          </Paper>

          <Grid item xs={12} md={6}>
            <ProjectSocialMentions projectHandle={project.twitterHandle} />
          </Grid>
        </Grid>
      </Grid>

      {/* Metric Details Drawer */}
      <MetricDetailsDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        metric={selectedMetric}
        project={project}
        showBackArrow={true}
      />
    </Box>
  );
} 