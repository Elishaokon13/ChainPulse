import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress
} from '@mui/material';
import { getMetrics } from '../data/api';

export default function Metrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch metrics. Please try again later.');
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

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

  if (!metrics) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No metrics available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Platform Metrics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Overview
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Projects Tracked
                </Typography>
                <Typography variant="h5">
                  {metrics?.totalProjects?.toLocaleString() || '0'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total TVL
                </Typography>
                <Typography variant="h5">
                  ${metrics?.totalTVL?.toLocaleString() || '0'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Wallets
                </Typography>
                <Typography variant="h5">
                  {metrics?.totalWallets?.toLocaleString() || '0'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Chain Distribution
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {metrics?.chainDistribution?.map((chain) => (
                <Box key={chain.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">{chain.name}</Typography>
                    <Typography variant="subtitle2">{chain.count}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      TVL: ${chain.tvl?.toLocaleString() || '0'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Wallets: {chain.wallets?.toLocaleString() || '0'}
                    </Typography>
                  </Box>
                </Box>
              )) || (
                <Typography color="text.secondary">No chain data available</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 