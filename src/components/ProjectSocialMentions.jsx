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
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex justify-center items-center min-h-[200px]">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Social Mentions</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${score > 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            Score: {Math.round(score)}
            {score > 50 ? <TrendingUp className="ml-1 w-4 h-4"/> : <TrendingDown className="ml-1 w-4 h-4"/>}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mentions.map((tweet) => (
            <div key={tweet.id} className="col-span-1">
              <div 
                className="p-4 border border-border rounded-md flex items-center gap-4"
              >
                <Timeline className="text-primary w-5 h-5"/>
                <div className="flex-1">
                  <p className="text-sm text-secondary-foreground">
                    {formatDistanceToNow(new Date(tweet.created_at), { addSuffix: true })}
                  </p>
                  <p className="text-foreground">{tweet.text}</p>
                  <div className="flex gap-2 mt-2 text-sm">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                      ❤️ {tweet.public_metrics.like_count}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                      🔄 {tweet.public_metrics.retweet_count}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                      💬 {tweet.public_metrics.reply_count}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSocialMentions; 