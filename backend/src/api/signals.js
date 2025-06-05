import express from 'express';
const router = express.Router();

// GET /api/v1/signals
router.get('/', async (req, res) => {
  // For MVP, return mock signals data
  const signals = [
    {
      id: '1',
      project: 'Test DeFi',
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
      id: '2',
      project: 'NFT Pump',
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
  res.json(signals);
});

export default router; 