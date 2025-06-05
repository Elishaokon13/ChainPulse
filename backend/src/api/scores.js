import express from 'express';
const router = express.Router();

// GET /api/v1/scores
router.get('/', async (req, res) => {
  // For MVP, return mock project scores and flags
  const scores = [
    {
      projectId: '1',
      project: 'Test DeFi',
      chain: 'Ethereum',
      score: 89,
      flag: 'High Signal, Low Hype'
    },
    {
      projectId: '2',
      project: 'NFT Pump',
      chain: 'Solana',
      score: 40,
      flag: 'Likely Hype'
    }
  ];
  res.json(scores);
});

export default router; 