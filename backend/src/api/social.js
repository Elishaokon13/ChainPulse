import express from 'express';
const router = express.Router();

// GET /api/v1/social
router.get('/', async (req, res) => {
  // For MVP, return mock social metrics
  const social = [
    {
      projectId: '1',
      project: 'Test DeFi',
      chain: 'Ethereum',
      twitterMentions: 25,
      discordMembers: 1200,
      redditPosts: 5
    },
    {
      projectId: '2',
      project: 'NFT Pump',
      chain: 'Solana',
      twitterMentions: 1200,
      discordMembers: 8000,
      redditPosts: 30
    }
  ];
  res.json(social);
});

export default router; 