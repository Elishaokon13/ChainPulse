import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  LinearProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getProject } from '../data/api';

const drawerWidth = 400;

export default function ProjectDetailsPanel({ projectId, open, onClose }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        setLoading(true);
        setError(null); // Reset error state
        const data = await getProject(projectId);
        if (!data) {
          throw new Error('No project data received');
        }
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.message || 'Failed to fetch project details');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchProject();
    }
  }, [projectId, open]);

  const getHypeColor = (hype) => {
    switch (hype?.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'success';
    if (score >= 40) return 'warning';
    return 'error';
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.default',
        },
      }}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Project Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 4, textAlign: 'center' }}>
            {error}
          </Typography>
        ) : project ? (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                {project.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip 
                  label={project.chain} 
                  size="small"
                  sx={{ bgcolor: 'primary.main', color: 'white' }}
                />
                <Chip 
                  label={`Hype: ${project.hype}`}
                  size="small"
                  color={getHypeColor(project.hype)}
                />
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {project.description}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Project Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress
                        variant="determinate"
                        value={project.score}
                        size={60}
                        color={getScoreColor(project.score)}
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
                        <Typography variant="caption" component="div" color="text.secondary">
                          {project.score}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Based on TVL, wallet growth, social engagement, and development activity
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Key Metrics
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="subtitle2">Total Value Locked (TVL)</Typography>
                        <Typography variant="subtitle2">
                          ${project.tvl?.toLocaleString() || '0'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((project.tvl / 10000000) * 100, 100)}
                          color="primary"
                          sx={{ height: 6, borderRadius: 1, flexGrow: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {project.tvl >= 1000000 ? 'High' : project.tvl >= 100000 ? 'Medium' : 'Low'} TVL
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Indicates the absolute value of assets locked in the protocol. Higher is better.
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="subtitle2">Active Wallets</Typography>
                        <Typography variant="subtitle2">
                          {project.wallets?.toLocaleString() || '0'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((project.wallets / 10000) * 100, 100)}
                          color="primary"
                          sx={{ height: 6, borderRadius: 1, flexGrow: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {project.wallets >= 5000 ? 'High' : project.wallets >= 1000 ? 'Medium' : 'Low'} Activity
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Shows the number of unique wallets interacting with the project. Higher means more users.
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="subtitle2">Social Mentions (24h)</Typography>
                        <Typography variant="subtitle2">
                          {project.mentions?.toLocaleString() || '0'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((project.mentions / 5000) * 100, 100)}
                          color={project.hype === 'High' ? 'error' : 'primary'}
                          sx={{ height: 6, borderRadius: 1, flexGrow: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {project.hype === 'High' ? 'High' : project.mentions >= 1000 ? 'Medium' : 'Low'} Engagement
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Reflects the number of times this project was mentioned on social media in the last 24 hours.
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="subtitle2">Development Activity (30d)</Typography>
                        <Typography variant="subtitle2">
                          {project.commits || '0'} commits
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((project.commits / 50) * 100, 100)}
                          color="primary"
                          sx={{ height: 6, borderRadius: 1, flexGrow: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {project.commits >= 20 ? 'High' : project.commits >= 10 ? 'Medium' : 'Low'} Activity
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Number of code commits in the last 30 days. Higher means more active development.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Growth Indicators
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {project.score >= 70 ? (
                        <TrendingUpIcon color="success" />
                      ) : (
                        <TrendingDownIcon color="error" />
                      )}
                      <Typography variant="body2">
                        {project.score >= 70 
                          ? 'Strong fundamentals with sustainable growth'
                          : 'High social hype but weak fundamentals'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {project.commits > 10 ? (
                        <TrendingUpIcon color="success" />
                      ) : (
                        <TrendingDownIcon color="error" />
                      )}
                      <Typography variant="body2">
                        {project.commits > 10
                          ? 'Active development with regular updates'
                          : 'Limited development activity'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {project.wallets > 2000 ? (
                        <TrendingUpIcon color="success" />
                      ) : (
                        <TrendingDownIcon color="error" />
                      )}
                      <Typography variant="body2">
                        {project.wallets > 2000
                          ? 'Strong user adoption and growth'
                          : 'Limited user base and adoption'}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ) : null}
      </Box>
    </Drawer>
  );
} 