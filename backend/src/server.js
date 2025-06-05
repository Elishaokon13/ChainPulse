const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('ChainPulse API is running!');
});

// Add your other API routes here, for example:
// app.get('/api/projects', ...)
// app.get('/api/projects/:id', ...)

app.get('/api/projects', (req, res) => {
  // Example static data; replace with your real data or database call
  res.json([
    {
      id: 1,
      name: "Example Project",
      description: "This is a sample project.",
      chain: "Ethereum",
      tvl: 1000000,
      wallets: 500,
      hype: "High",
      score: 85,
      mentions: [],
      commits: 25
    }
    // Add more projects as needed
  ]);
});

module.exports = app; // Required for Vercel serverless 