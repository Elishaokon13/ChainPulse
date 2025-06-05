import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  if (!metric || !project) return null;
  const info = metricDetails[metric];
  if (!info) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showBackArrow && (
              <IconButton onClick={onClose} size="small">
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6">{info.title}</Typography>
          </Box>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 2 }}>{info.description}</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{info.details(project)}</Typography>
      </Box>
    </Drawer>
  );
} 