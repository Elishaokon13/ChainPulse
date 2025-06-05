import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, Divider, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingState from './LoadingState';
import { Button } from "@/components/ui/button";

const TIMEFRAMES = [
  { label: '24h', value: '24h' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' }
];

const metricDetails = {
  tvl: {
    title: 'Total Value Locked (TVL)',
    description: 'TVL represents the total value of assets locked in the protocol. It is a key indicator of trust and adoption. Higher TVL means more users are depositing assets into the protocol.',
    details: (project) => `Current TVL: $${project.tvl.toLocaleString()}`
  },
  wallets: {
    title: 'Active Wallets',
    description: 'Active wallets shows the number of unique wallets interacting with the project. It reflects user adoption and community growth.',
    details: (project) => `Active Wallets: ${project.wallets.toLocaleString()}`
  },
  mentions: {
    title: 'Social Mentions',
    description: 'Social mentions count the number of times this project was mentioned on social media (e.g., Twitter) in the last 24 hours. It is a measure of community engagement and hype.',
    details: (project) => `Mentions (24h): ${Array.isArray(project.mentions) ? project.mentions.length : 0}`
  },
  commits: {
    title: 'GitHub Commits',
    description: 'Development activity is measured by the number of code commits in the last 30 days. More commits usually means more active development and innovation.',
    details: (project) => `Commits (30d): ${project.commits.toLocaleString()}`
  }
};

export default function MetricDetailsDrawer({ open, onClose, metric, project, showBackArrow }) {
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && metric) {
      setLoading(true);
      // Simulate data fetching
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [open, metric]);

  if (!metric || !project) return null;
  const info = metricDetails[metric];
  if (!info) return null;

  // Mocked historical/timeframe data for demonstration
  const mockData = {
    wallets: {
      increase: 120, // wallets added in timeframe
      inactive: 50, // inactive wallets
    },
    tvl: {
      percentChange: 4.2, // % change in timeframe
      l1Comparison: 'Ethereum',
      l1Tvl: 50000000, // L1 TVL for comparison
    },
    mentions: {
      impressions: 12000,
      mentions: Array.isArray(project.mentions) ? project.mentions.length : 0,
      likes: 340,
      comments: 45,
    },
    commits: {
      first: '2023-01-15',
      last: '2024-06-30',
      total: project.commits || 0,
    }
  };

  let content = null;
  if (loading) {
    content = <LoadingState message={`Loading ${metric} details...`} />;
  } else if (error) {
    content = (
      <p className="text-red-500 p-4 text-center">
        {error}
      </p>
    );
  } else if (metric === 'wallets') {
    content = (
      <>
        <h3 className="text-lg font-semibold mb-2">Active Wallets</h3>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select value={timeframe} label="Timeframe" onChange={e => setTimeframe(e.target.value)}>
            {TIMEFRAMES.map(tf => <MenuItem key={tf.value} value={tf.value}>{tf.label}</MenuItem>)}
          </Select>
        </FormControl>
        <p className="mb-1">
          <b>Total Active Wallets:</b> {project.wallets?.toLocaleString() || 0}
        </p>
        <p className="mb-1">
          <b>Increase in {timeframe}:</b> +{mockData.wallets.increase}
        </p>
        <p className="mb-1">
          <b>Inactive Wallets:</b> {mockData.wallets.inactive}
        </p>
      </>
    );
  } else if (metric === 'tvl') {
    content = (
      <>
        <h3 className="text-lg font-semibold mb-2">Total Value Locked (TVL)</h3>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select value={timeframe} label="Timeframe" onChange={e => setTimeframe(e.target.value)}>
            {TIMEFRAMES.map(tf => <MenuItem key={tf.value} value={tf.value}>{tf.label}</MenuItem>)}
          </Select>
        </FormControl>
        <p className="mb-1">
          <b>Current TVL:</b> ${project.tvl?.toLocaleString() || 0}
        </p>
        <p className="mb-1">
          <b>Change in {timeframe}:</b> {mockData.tvl.percentChange > 0 ? '+' : ''}{mockData.tvl.percentChange}%
        </p>
        <p className="mb-1">
          <b>Compared to {mockData.tvl.l1Comparison} TVL:</b> ${mockData.tvl.l1Tvl.toLocaleString()}
        </p>
      </>
    );
  } else if (metric === 'mentions') {
    content = (
      <>
        <h3 className="text-lg font-semibold mb-2">Social Mentions</h3>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select value={timeframe} label="Timeframe" onChange={e => setTimeframe(e.target.value)}>
            {TIMEFRAMES.map(tf => <MenuItem key={tf.value} value={tf.value}>{tf.label}</MenuItem>)}
          </Select>
        </FormControl>
        <p className="mb-1">
          <b>Mentions:</b> {mockData.mentions.mentions}
        </p>
        <p className="mb-1">
          <b>Impressions:</b> {mockData.mentions.impressions}
        </p>
        <p className="mb-1">
          <b>Likes:</b> {mockData.mentions.likes}
        </p>
        <p className="mb-1">
          <b>Comments:</b> {mockData.mentions.comments}
        </p>
      </>
    );
  } else if (metric === 'commits') {
    content = (
      <>
        <h3 className="text-lg font-semibold mb-2">Development Activity</h3>
        <p className="mb-1">
          <b>First Commit Date:</b> {mockData.commits.first}
        </p>
        <p className="mb-1">
          <b>Last Commit Date:</b> {mockData.commits.last}
        </p>
        <p className="mb-1">
          <b>Total Commits:</b> {mockData.commits.total}
        </p>
      </>
    );
  }

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 350 }, // Responsive width: full on small, 350px on medium+
          boxSizing: 'border-box',
          bgcolor: 'background.default',
        },
      }}
    >
      <div className="w-full max-w-sm mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {showBackArrow && (
              <Button onClick={onClose} size="icon" variant="ghost" className="h-8 w-8">
                <ArrowBackIcon className="h-4 w-4" />
              </Button>
            )}
            <h2 className={`text-xl font-semibold ${showBackArrow ? 'ml-2' : ''}`}>
              {metric === 'wallets' && 'Active Wallets'}
              {metric === 'tvl' && 'Total Value Locked (TVL)'}
              {metric === 'mentions' && 'Social Mentions'}
              {metric === 'commits' && 'Development Activity'}
            </h2>
          </div>
          <Button onClick={onClose} size="icon" variant="ghost" className="h-8 w-8"><CloseIcon className="h-4 w-4" /></Button>
        </div>
        <hr className="my-4 border-t border-border" />
        <p className="mb-4 text-secondary-foreground">{info.description}</p>
        {content}
      </div>
    </Drawer>
  );
} 