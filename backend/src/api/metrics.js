import express from 'express';
import { getPrice } from '../services/chainlink.js';
const router = express.Router();

// GET /api/v1/metrics
router.get('/', async (req, res) => {
  try {
    const ethPrice = await getPrice();
    
    const metrics = {
      totalProjects: 16,
      totalTVL: ethPrice * 15000,
      totalWallets: 45000,
      chainDistribution: [
        {
          name: 'Ethereum',
          count: 8,
          tvl: ethPrice * 12000,
          wallets: 35000
        },
        {
          name: 'Solana',
          count: 4,
          tvl: 155000,
          wallets: 4050
        },
        {
          name: 'Arbitrum',
          count: 4,
          tvl: 80000,
          wallets: 5950
        }
      ]
    };

    res.json(metrics);
  } catch (error) {
    console.error('Error in /metrics endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// GET /api/v1/metrics/:projectId
router.get('/:projectId', async (req, res) => {
  const ethPrice = await getPrice();
  const projectMetrics = {
    projectId: req.params.projectId,
    ethPrice,
    chart: [
      { date: '2024-01-01', tvl: ethPrice * 4, wallets: 200 },
      { date: '2024-02-01', tvl: ethPrice * 8, wallets: 400 },
      { date: '2024-03-01', tvl: ethPrice * 14, wallets: 800 },
      { date: '2024-04-01', tvl: ethPrice * 20, wallets: 1200 },
    ]
  };
  res.json(projectMetrics);
});

export default router; 