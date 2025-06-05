import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectsRouter from './api/projects.js';
import metricsRouter from './api/metrics.js';
import signalsRouter from './api/signals.js';
import socialRouter from './api/social.js';
import devActivityRouter from './api/devActivity.js';
import scoresRouter from './api/scores.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ChainPulse API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/v1/projects',
      metrics: '/api/v1/metrics',
      signals: '/api/v1/signals',
      social: '/api/v1/social',
      'dev-activity': '/api/v1/dev-activity',
      scores: '/api/v1/scores'
    }
  });
});

// Routes
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/metrics', metricsRouter);
app.use('/api/v1/signals', signalsRouter);
app.use('/api/v1/social', socialRouter);
app.use('/api/v1/dev-activity', devActivityRouter);
app.use('/api/v1/scores', scoresRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api/v1`);
}); 