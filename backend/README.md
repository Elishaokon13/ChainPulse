# ChainPulse Backend (Zero-Cost Edition)

This is the backend for ChainPulse, a zero-cost crypto analytics platform. It provides REST APIs for project metrics, signals, social data, and more, ready to connect to Chainlink, Alchemy, Twitter, and GitHub APIs.

## Features
- REST API for projects, metrics, signals, social, and developer activity
- Ready for integration with Alchemy (Sepolia), Chainlink Data Feeds, Twitter API, and GitHub API
- Uses MongoDB (Atlas free tier) and Redis (optional, free tier)
- Mock data for easy MVP testing

## Setup
1. Clone this repo and `cd backend`
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your API keys/links
4. Run `npm start` (or `npm run dev` if using nodemon)

## Environment Variables (`.env`)
- `PORT` - Port to run the server (default: 4000)
- `ALCHEMY_SEPOLIA_URL` - Alchemy Sepolia RPC URL
- `CHAINLINK_TVL_FEED` - Chainlink Data Feed address (Sepolia)
- `TWITTER_BEARER_TOKEN` - Twitter API Bearer Token
- `GITHUB_TOKEN` - GitHub Personal Access Token
- `MONGODB_URI` - MongoDB Atlas URI
- `REDIS_URL` - Redis Cloud URL (optional)

## Endpoints
- `GET /api/v1/projects` - List projects with metrics
- `GET /api/v1/projects/:id` - Project details
- `GET /api/v1/metrics` - Aggregated metrics
- `GET /api/v1/metrics/:projectId` - Project metrics
- `GET /api/v1/signals` - Trading signals
- `GET /api/v1/scores` - Project scores
- `GET /api/v1/social` - Social metrics
- `GET /api/v1/dev-activity` - Developer activity

## Notes
- All endpoints return mock data by default. Replace logic in `src/services/` to fetch real data.
- See comments in code for where to add your API keys and logic.

--- 