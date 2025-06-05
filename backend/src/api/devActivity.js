import express from 'express';
const router = express.Router();

// GET /api/v1/dev-activity
router.get('/', async (req, res) => {
  // For MVP, return mock developer activity
  const devActivity = [
    {
      projectId: '1',
      project: 'Test DeFi',
      chain: 'Ethereum',
      githubRepo: 'user/test-defi',
      commitsLastWeek: 12,
      openIssues: 3,
      contributors: 4
    },
    {
      projectId: '2',
      project: 'NFT Pump',
      chain: 'Solana',
      githubRepo: 'user/nft-pump',
      commitsLastWeek: 3,
      openIssues: 10,
      contributors: 2
    }
  ];
  res.json(devActivity);
});

export default router; 