import express from 'express';
import { getPrice } from '../services/chainlink.js';
import { getMentions } from '../services/twitter.js';
const router = express.Router();

// TODO: Import real data services when ready
// import { getWalletActivity } from '../services/alchemy.js';
// import { getTVL } from '../services/chainlink.js';
// import { getCommitFrequency } from '../services/github.js';

// Shared function to generate the full project list with the current ethPrice
async function getAllProjects() {
  const ethPrice = await getPrice();
  return [
    { id: '1', name: 'Nexus Protocol', chain: 'Ethereum', tvl: ethPrice * 1000, wallets: 3500, mentions: 25, commits: 12, score: 89, hype: 'Low', price: ethPrice, description: 'A decentralized lending protocol with innovative yield optimization strategies and strong onchain metrics.', twitterHandle: 'nexusprotocol' },
    { id: '2', name: 'Solana Punks', chain: 'Solana', tvl: 50000, wallets: 800, mentions: 1200, commits: 3, score: 40, hype: 'High', price: ethPrice, description: 'An NFT collection on Solana with high social engagement but limited technical development.', twitterHandle: 'solanapunks' },
    { id: '3', name: 'Aurora Finance', chain: 'Ethereum', tvl: ethPrice * 2500, wallets: 5200, mentions: 45, commits: 28, score: 92, hype: 'Low', price: ethPrice, description: 'A comprehensive DeFi platform offering yield farming, staking, and cross-chain liquidity solutions.', twitterHandle: 'aurorafinance' },
    { id: '4', name: 'MoonDoge', chain: 'Arbitrum', tvl: 25000, wallets: 1500, mentions: 3500, commits: 2, score: 35, hype: 'High', price: ethPrice, description: 'A meme token with high social media presence but limited utility and development activity.', twitterHandle: 'moondoge' },
    { id: '5', name: 'Quantum Swap', chain: 'Ethereum', tvl: ethPrice * 1800, wallets: 4200, mentions: 35, commits: 45, score: 85, hype: 'Low', price: ethPrice, description: 'Advanced DEX with concentrated liquidity and MEV protection features.', twitterHandle: 'quantumswap' },
    { id: '6', name: 'Stellar Vault', chain: 'Ethereum', tvl: ethPrice * 3200, wallets: 6800, mentions: 55, commits: 32, score: 88, hype: 'Low', price: ethPrice, description: 'Secure yield vaults with automated strategy optimization and risk management.', twitterHandle: 'stellarvault' },
    { id: '7', name: 'Pulse Network', chain: 'Ethereum', tvl: ethPrice * 1500, wallets: 3800, mentions: 42, commits: 28, score: 82, hype: 'Low', price: ethPrice, description: 'Layer 2 scaling solution with advanced rollup technology and low fees.', twitterHandle: 'pulsenetwork' },
    { id: '8', name: 'Fusion Protocol', chain: 'Ethereum', tvl: ethPrice * 2800, wallets: 5100, mentions: 38, commits: 41, score: 86, hype: 'Low', price: ethPrice, description: 'Cross-chain bridge protocol with advanced security features and low latency.', twitterHandle: 'fusionprotocol' },
    { id: '9', name: 'Horizon Labs', chain: 'Ethereum', tvl: ethPrice * 2200, wallets: 4500, mentions: 48, commits: 35, score: 84, hype: 'Low', price: ethPrice, description: 'Research-driven DeFi protocol focusing on sustainable yield generation.', twitterHandle: 'horizonlabs' },
    { id: '10', name: 'Nova Finance', chain: 'Ethereum', tvl: ethPrice * 1900, wallets: 4100, mentions: 32, commits: 39, score: 81, hype: 'Low', price: ethPrice, description: 'Innovative lending protocol with dynamic interest rates and collateral optimization.', twitterHandle: 'novafinance' },
    { id: '11', name: 'Cosmic Cats', chain: 'Solana', tvl: 35000, wallets: 1200, mentions: 2800, commits: 4, score: 38, hype: 'High', price: ethPrice, description: 'NFT project with viral marketing but minimal technical innovation.', twitterHandle: 'cosmiccats' },
    { id: '12', name: 'Rocket Token', chain: 'Arbitrum', tvl: 18000, wallets: 900, mentions: 4200, commits: 1, score: 32, hype: 'High', price: ethPrice, description: 'Speculative token with aggressive marketing and limited development.', twitterHandle: 'rockettoken' },
    { id: '13', name: 'Galaxy Gems', chain: 'Solana', tvl: 42000, wallets: 1100, mentions: 3100, commits: 3, score: 36, hype: 'High', price: ethPrice, description: 'NFT marketplace with high social hype but basic functionality.', twitterHandle: 'galaxygems' },
    { id: '14', name: 'Star Coin', chain: 'Arbitrum', tvl: 22000, wallets: 1300, mentions: 3800, commits: 2, score: 33, hype: 'High', price: ethPrice, description: 'Meme token with celebrity endorsements but no real utility.', twitterHandle: 'starcoin' },
    { id: '15', name: 'Cosmic Punks', chain: 'Solana', tvl: 28000, wallets: 950, mentions: 2600, commits: 3, score: 37, hype: 'High', price: ethPrice, description: 'NFT derivative project with high social engagement but limited innovation.', twitterHandle: 'cosmicpunks' },
    { id: '16', name: 'Meteor Token', chain: 'Arbitrum', tvl: 15000, wallets: 850, mentions: 4500, commits: 1, score: 31, hype: 'High', price: ethPrice, description: 'Speculative token with aggressive marketing and minimal development.', twitterHandle: 'meteortoken' }
  ];
}

// GET /api/v1/projects
router.get('/', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error in /projects endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/v1/projects/:id
router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Project ID is required' });
    }
    const projects = await getAllProjects();
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: `Project with ID ${req.params.id} not found` });
    }
    // Fetch live mentions from Twitter API
    let mentions = [];
    try {
      if (project.twitterHandle) {
        const twitterData = await getMentions(project.twitterHandle, { maxResults: 10 });
        mentions = twitterData.data || [];
      }
    } catch (err) {
      console.error('Error fetching Twitter mentions:', err);
    }
    project.mentions = mentions;
    res.json(project);
  } catch (error) {
    console.error('Error in /projects/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch project details' });
  }
});

export default router; 