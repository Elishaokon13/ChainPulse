import express from 'express';
import { getMentions, getMentionsCount } from '../services/twitter.js';

const router = express.Router();

// Get mentions for a project
router.get('/mentions/:projectHandle', async (req, res) => {
  try {
    const { projectHandle } = req.params;
    const { startTime, endTime, maxResults, paginationToken } = req.query;

    const mentions = await getMentions(projectHandle, {
      startTime,
      endTime,
      maxResults: parseInt(maxResults),
      paginationToken
    });

    res.json(mentions);
  } catch (error) {
    console.error('Error in mentions endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch mentions' });
  }
});

// Get mentions count for a project
router.get('/mentions/:projectHandle/count', async (req, res) => {
  try {
    const { projectHandle } = req.params;
    const { timeWindow } = req.query;

    const count = await getMentionsCount(projectHandle, timeWindow);
    res.json(count);
  } catch (error) {
    console.error('Error in mentions count endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch mentions count' });
  }
});

export default router; 