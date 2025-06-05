import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config.js';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (config.mongodbUri) {
  mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// API routes
import projectsRouter from './api/projects.js';
import metricsRouter from './api/metrics.js';
import signalsRouter from './api/signals.js';
import socialRouter from './api/social.js';
import devActivityRouter from './api/devActivity.js';
import scoresRouter from './api/scores.js';

app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/metrics', metricsRouter);
app.use('/api/v1/signals', signalsRouter);
app.use('/api/v1/social', socialRouter);
app.use('/api/v1/dev-activity', devActivityRouter);
app.use('/api/v1/scores', scoresRouter);

app.get('/', (req, res) => res.send('ChainPulse API Running'));

app.listen(config.port, () => console.log(`Server running on port ${config.port}`)); 