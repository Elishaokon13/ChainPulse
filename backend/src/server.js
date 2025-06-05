const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('ChainPulse API is running!');
});

// Add your other API routes here, for example:
// app.get('/api/projects', ...)
// app.get('/api/projects/:id', ...)

module.exports = app; // Required for Vercel serverless 