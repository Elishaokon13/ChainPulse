import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Chip, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, Timeline } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const ProjectSocialMentions = ({ projectHandle }) => {
  const [mentions, setMentions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchMentions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/social/mentions/${projectHandle}?maxResults=10`);
        const data = await response.json();
        setMentions(data.data || []);
        
        // Calculate social score based on mentions
        const socialScore = calculateSocialScore(data);
        setScore(socialScore);
      } catch (err) {
        setError('Failed to fetch social mentions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentions();
    // Refresh every 5 minutes
    const interval = setInterval(fetchMentions, 300000);
    return () => clearInterval(interval);
  }, [projectHandle]);

  const calculateSocialScore = (data) => {
    if (!data.data) return 0;
    
    const tweets = data.data;
    const now = new Date();
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
    
    // Calculate engagement metrics
    const recentTweets = tweets.filter(tweet => new Date(tweet.created_at) > oneDayAgo);
    const totalEngagement = recentTweets.reduce((sum, tweet) => {
      const metrics = tweet.public_metrics;
      return sum + (metrics.like_count + metrics.retweet_count * 2 + metrics.reply_count);
    }, 0);
    
    // Calculate score (0-100)
    const baseScore = Math.min(totalEngagement / 100, 100);
    const timeBonus = recentTweets.length * 5;
    
    return Math.min(baseScore + timeBonus, 100);
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Social Mentions</Typography>
          <Chip 
            label={`Score: ${Math.round(score)}`}
            color={score > 50 ? "success" : "warning"}
            icon={score > 50 ? <TrendingUp /> : <TrendingDown />}
          />
        </Box>

        <Grid container spacing={2}>
          {mentions.map((tweet) => (
            <Grid item xs={12} key={tweet.id}>
              <Box 
                p={2} 
                border={1} 
                borderColor="divider" 
                borderRadius={1}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Timeline color="primary" />
                <Box flex={1}>
                  <Typography variant="body2" color="textSecondary">
                    {formatDistanceToNow(new Date(tweet.created_at), { addSuffix: true })}
                  </Typography>
                  <Typography variant="body1">{tweet.text}</Typography>
                  <Box display="flex" gap={2} mt={1}>
                    <Chip 
                      size="small" 
                      label={`❤️ ${tweet.public_metrics.like_count}`} 
                    />
                    <Chip 
                      size="small" 
                      label={`🔄 ${tweet.public_metrics.retweet_count}`} 
                    />
                    <Chip 
                      size="small" 
                      label={`💬 ${tweet.public_metrics.reply_count}`} 
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectSocialMentions; 