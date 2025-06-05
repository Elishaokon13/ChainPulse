import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Button,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

export default function Signals() {
  const [selectedSignal, setSelectedSignal] = useState(null);

  // Mock data for signals
  const signals = [
    {
      id: 1,
      project: 'Project Alpha',
      chain: 'Ethereum',
      type: 'Bullish',
      confidence: 85,
      timeframe: '7d',
      description: 'Strong onchain metrics with increasing wallet activity',
      metrics: {
        tvlGrowth: 25,
        walletGrowth: 1200,
        volumeGrowth: 45,
        socialGrowth: 30
      }
    },
    {
      id: 2,
      project: 'Project Beta',
      chain: 'Solana',
      type: 'Bearish',
      confidence: 75,
      timeframe: '3d',
      description: 'Declining metrics despite high social activity',
      metrics: {
        tvlGrowth: -15,
        walletGrowth: -500,
        volumeGrowth: -20,
        socialGrowth: 200
      }
    }
  ];

  return (
    <Box sx={{ pb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
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
          Trading Signals
        </Typography>
        <Typography color="text.secondary" paragraph>
          Real-time signals based on onchain metrics and social analysis
        </Typography>
      </Box>

      {/* Signals Grid */}
      <Grid container spacing={3}>
        {signals.map((signal) => (
          <Grid item xs={12} md={6} key={signal.id}>
            <Card sx={{ 
              height: '100%',
              background: signal.type === 'Bullish' 
                ? 'linear-gradient(145deg, #e8f5e9 0%, #c8e6c9 100%)'
                : 'linear-gradient(145deg, #ffebee 0%, #ffcdd2 100%)',
              border: '1px solid',
              borderColor: signal.type === 'Bullish' ? 'success.light' : 'error.light'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {signal.project}
                  </Typography>
                  <Chip 
                    label={signal.chain} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(26, 115, 232, 0.1)',
                      color: 'primary.main'
                    }} 
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Chip 
                    icon={signal.type === 'Bullish' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={signal.type}
                    color={signal.type === 'Bullish' ? 'success' : 'error'}
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Confidence: {signal.confidence}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Timeframe: {signal.timeframe}
                  </Typography>
                </Box>

                <Typography paragraph>
                  {signal.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      TVL Growth
                    </Typography>
                    <Typography 
                      color={signal.metrics.tvlGrowth >= 0 ? 'success.main' : 'error.main'}
                      sx={{ fontWeight: 500 }}
                    >
                      {signal.metrics.tvlGrowth > 0 ? '+' : ''}{signal.metrics.tvlGrowth}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Wallet Growth
                    </Typography>
                    <Typography 
                      color={signal.metrics.walletGrowth >= 0 ? 'success.main' : 'error.main'}
                      sx={{ fontWeight: 500 }}
                    >
                      {signal.metrics.walletGrowth > 0 ? '+' : ''}{signal.metrics.walletGrowth}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Volume Growth
                    </Typography>
                    <Typography 
                      color={signal.metrics.volumeGrowth >= 0 ? 'success.main' : 'error.main'}
                      sx={{ fontWeight: 500 }}
                    >
                      {signal.metrics.volumeGrowth > 0 ? '+' : ''}{signal.metrics.volumeGrowth}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Social Growth
                    </Typography>
                    <Typography 
                      color={signal.metrics.socialGrowth >= 0 ? 'success.main' : 'error.main'}
                      sx={{ fontWeight: 500 }}
                    >
                      {signal.metrics.socialGrowth > 0 ? '+' : ''}{signal.metrics.socialGrowth}%
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    color="primary"
                    onClick={() => setSelectedSignal(signal)}
                  >
                    View Analysis
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Signal Analysis Modal */}
      {selectedSignal && (
        <Paper sx={{ 
          mt: 4, 
          p: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
          border: '1px solid rgba(26, 115, 232, 0.1)'
        }}>
          <Typography variant="h6" gutterBottom>
            Detailed Analysis: {selectedSignal.project}
          </Typography>
          {/* Add detailed analysis content here */}
        </Paper>
      )}
    </Box>
  );
} 