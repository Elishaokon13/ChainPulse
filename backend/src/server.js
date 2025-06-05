const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('ChainPulse API is running!');
});

const projects = [
  { id: '1', name: 'Nexus Protocol', chain: 'Ethereum', tvl: 1000000, wallets: 3500, mentions: 25, commits: 12, score: 89, hype: 'Low', description: 'A decentralized lending protocol with innovative yield optimization strategies and strong onchain metrics.', twitterHandle: 'nexusprotocol' },
  { id: '2', name: 'Solana Punks', chain: 'Solana', tvl: 50000, wallets: 800, mentions: 1200, commits: 3, score: 40, hype: 'High', description: 'An NFT collection on Solana with high social engagement but limited technical development.', twitterHandle: 'solanapunks' },
  { id: '3', name: 'Aurora Finance', chain: 'Ethereum', tvl: 2500000, wallets: 5200, mentions: 45, commits: 28, score: 92, hype: 'Low', description: 'A comprehensive DeFi platform offering yield farming, staking, and cross-chain liquidity solutions.', twitterHandle: 'aurorafinance' },
  { id: '4', name: 'MoonDoge', chain: 'Arbitrum', tvl: 25000, wallets: 1500, mentions: 3500, commits: 2, score: 35, hype: 'High', description: 'A meme token with high social media presence but limited utility and development activity.', twitterHandle: 'moondoge' },
  { id: '5', name: 'Quantum Swap', chain: 'Ethereum', tvl: 1800000, wallets: 4200, mentions: 35, commits: 45, score: 85, hype: 'Low', description: 'Advanced DEX with concentrated liquidity and MEV protection features.', twitterHandle: 'quantumswap' },
  { id: '6', name: 'Stellar Vault', chain: 'Ethereum', tvl: 3200000, wallets: 6800, mentions: 55, commits: 32, score: 88, hype: 'Low', description: 'Secure yield vaults with automated strategy optimization and risk management.', twitterHandle: 'stellarvault' },
  { id: '7', name: 'Pulse Network', chain: 'Ethereum', tvl: 1500000, wallets: 3800, mentions: 42, commits: 28, score: 82, hype: 'Low', description: 'Layer 2 scaling solution with advanced rollup technology and low fees.', twitterHandle: 'pulsenetwork' },
  { id: '8', name: 'Fusion Protocol', chain: 'Ethereum', tvl: 2800000, wallets: 5100, mentions: 38, commits: 41, score: 86, hype: 'Low', description: 'Cross-chain bridge protocol with advanced security features and low latency.', twitterHandle: 'fusionprotocol' },
  { id: '9', name: 'Horizon Labs', chain: 'Ethereum', tvl: 2200000, wallets: 4500, mentions: 48, commits: 35, score: 84, hype: 'Low', description: 'Research-driven DeFi protocol focusing on sustainable yield generation.', twitterHandle: 'horizonlabs' },
  { id: '10', name: 'Nova Finance', chain: 'Ethereum', tvl: 1900000, wallets: 4100, mentions: 32, commits: 39, score: 81, hype: 'Low', description: 'Innovative lending protocol with dynamic interest rates and collateral optimization.', twitterHandle: 'novafinance' },
  { id: '11', name: 'Cosmic Cats', chain: 'Solana', tvl: 35000, wallets: 1200, mentions: 2800, commits: 4, score: 38, hype: 'High', description: 'NFT project with viral marketing but minimal technical innovation.', twitterHandle: 'cosmiccats' },
  { id: '12', name: 'Rocket Token', chain: 'Arbitrum', tvl: 18000, wallets: 900, mentions: 4200, commits: 1, score: 32, hype: 'High', description: 'Speculative token with aggressive marketing and limited development.', twitterHandle: 'rockettoken' },
  { id: '13', name: 'Galaxy Gems', chain: 'Solana', tvl: 42000, wallets: 1100, mentions: 3100, commits: 3, score: 36, hype: 'High', description: 'NFT marketplace with high social hype but basic functionality.', twitterHandle: 'galaxygems' },
  { id: '14', name: 'Star Coin', chain: 'Arbitrum', tvl: 22000, wallets: 1300, mentions: 3800, commits: 2, score: 33, hype: 'High', description: 'Meme token with celebrity endorsements but no real utility.', twitterHandle: 'starcoin' },
  { id: '15', name: 'Cosmic Punks', chain: 'Solana', tvl: 28000, wallets: 950, mentions: 2600, commits: 3, score: 37, hype: 'High', description: 'NFT derivative project with high social engagement but limited innovation.', twitterHandle: 'cosmicpunks' },
  { id: '16', name: 'Meteor Token', chain: 'Arbitrum', tvl: 15000, wallets: 850, mentions: 4500, commits: 1, score: 31, hype: 'High', description: 'Speculative token with aggressive marketing and minimal development.', twitterHandle: 'meteortoken' }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

module.exports = app; // Required for Vercel serverless 