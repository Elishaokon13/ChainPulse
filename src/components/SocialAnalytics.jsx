import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Info as InfoIcon,
  Timeline,
  People,
  Share,
  Comment
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const SocialAnalytics = ({ projectHandle, mentions }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If mentions is null or undefined, set default values
        if (!mentions) {
          setAnalyticsData({
            total: 0,
            likes: 0,
            retweets: 0,
            replies: 0
          });
          return;
        }

        const engagement = calculateEngagement();
        setAnalyticsData(engagement);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load social analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [mentions]);

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!analyticsData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No social data available</Typography>
      </Box>
    );
  }

  // Calculate engagement metrics
  const calculateEngagement = () => {
    if (!mentions?.length) return { total: 0, likes: 0, retweets: 0, replies: 0 };
    
    return mentions.reduce((acc, tweet) => {
      const metrics = tweet.public_metrics;
      return {
        total: acc.total + metrics.like_count + metrics.retweet_count + metrics.reply_count,
        likes: acc.likes + metrics.like_count,
        retweets: acc.retweets + metrics.retweet_count,
        replies: acc.replies + metrics.reply_count
      };
    }, { total: 0, likes: 0, retweets: 0, replies: 0 });
  };

  const totalMentions = mentions?.length || 0;

  const MetricCard = ({ title, value, icon, trend, tooltip }) => (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {value.toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          {trend && (
            <Chip
              size="small"
              icon={trend > 0 ? <TrendingUp /> : <TrendingDown />}
              label={`${Math.abs(trend)}%`}
              color={trend > 0 ? "success" : "error"}
            />
          )}
          {tooltip && (
            <Tooltip title={tooltip}>
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Timeline /> Social Analytics
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Mentions"
            value={totalMentions}
            icon={<Timeline color="primary" />}
            trend={12}
            tooltip="Total number of mentions in the last 24 hours"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Engagement"
            value={analyticsData.total}
            icon={<People color="primary" />}
            trend={8}
            tooltip="Sum of likes, retweets, and replies"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <MetricCard
            title="Retweets"
            value={analyticsData.retweets}
            icon={<Share color="primary" />}
            trend={15}
            tooltip="Number of retweets"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <MetricCard
            title="Replies"
            value={analyticsData.replies}
            icon={<Comment color="primary" />}
            trend={-5}
            tooltip="Number of replies"
          />
        </Grid>
      </Grid>

      {/* Engagement Distribution */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Engagement Distribution</Typography>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Likes</Typography>
                <Typography variant="body2">
                  {((analyticsData.likes / analyticsData.total) * 100).toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(analyticsData.likes / analyticsData.total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Retweets</Typography>
                <Typography variant="body2">
                  {((analyticsData.retweets / analyticsData.total) * 100).toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(analyticsData.retweets / analyticsData.total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Replies</Typography>
                <Typography variant="body2">
                  {((analyticsData.replies / analyticsData.total) * 100).toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(analyticsData.replies / analyticsData.total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>Recent Activity</Typography>
              <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                {mentions?.slice(0, 5).map((tweet) => (
                  <Box key={tweet.id} sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatDistanceToNow(new Date(tweet.created_at), { addSuffix: true })}
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {tweet.text}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip size="small" label={`❤️ ${tweet.public_metrics.like_count}`} />
                      <Chip size="small" label={`🔄 ${tweet.public_metrics.retweet_count}`} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Social Impact Score */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Social Impact Score</Typography>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Engagement Rate</Typography>
                <Typography variant="body2">
                  {((analyticsData.total / (totalMentions * 1000)) * 100).toFixed(2)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(analyticsData.total / (totalMentions * 1000)) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Growth Rate</Typography>
                <Typography variant="body2">+12%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={12}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>Recommendations</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  • Increase engagement by responding to mentions
                </Typography>
                <Typography variant="body2">
                  • Post more frequently during peak hours
                </Typography>
                <Typography variant="body2">
                  • Focus on content that generates retweets
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SocialAnalytics; 