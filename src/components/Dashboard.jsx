import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';
import ProjectDetailsPanel from './ProjectDetailsPanel';
import { getProjects, getMetrics } from '../data/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [projectsData, metricsData] = await Promise.all([
          getProjects(),
          getMetrics()
        ]);
        setProjects(projectsData);
        setMetrics(metricsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setDetailsOpen(true);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography>Loading dashboard data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          ChainPulse Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time insights into blockchain projects and their performance
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Trending Projects
            </Typography>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <ProjectCard 
                    project={project} 
                    onClick={handleProjectClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Market Overview
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Value Locked (TVL)
                </Typography>
                <Typography variant="h4">
                  ${metrics.tvl?.toLocaleString() || '0'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Active Wallets
                </Typography>
                <Typography variant="h4">
                  {metrics.wallets?.toLocaleString() || '0'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Social Mentions
                </Typography>
                <Typography variant="h4">
                  {metrics.mentions?.toLocaleString() || '0'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <ProjectDetailsPanel
        projectId={selectedProjectId}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </Box>
  );
};

export default Dashboard; 