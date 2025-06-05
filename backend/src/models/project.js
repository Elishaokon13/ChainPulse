import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  chain: String,
  tvl: Number,
  wallets: Number,
  mentions: Number,
  commits: Number,
  score: Number,
  hype: String,
  description: String,
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema); 