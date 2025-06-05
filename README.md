# ChainPulse Dashboard

A real-time blockchain analytics dashboard that provides insights into DeFi projects, their metrics, and social analytics.

## Features

- 📊 Real-time project metrics (TVL, Active Wallets, Social Mentions, Dev Activity)
- 🐦 Live Twitter/X social analytics integration
- 📈 Timeframe-based analytics (24h, 7d, 30d)
- 🎯 Detailed project insights with interactive metrics
- 💻 Modern, responsive UI built with Material-UI
- 🔄 Real-time data updates

## Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **APIs**: Twitter/X API
- **Data**: Real-time blockchain and social metrics

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Twitter/X API credentials

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chainpulse-dashboard.git
cd chainpulse-dashboard
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the backend directory
   - Add your Twitter/X API credentials:
```
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
```

4. Start the development servers:
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
chainpulse-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectDetailsPanel.jsx
│   │   │   └── MetricDetailsDrawer.jsx
│   │   ├── data/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── projects.js
│   │   ├── services/
│   │   │   └── twitter.js
│   │   └── server.js
│   └── package.json
└── README.md
```

## Features in Detail

### Project Overview
- Interactive project cards with key metrics
- Slide-in details panel for comprehensive project information
- Real-time data updates

### Metrics
- **TVL (Total Value Locked)**
  - Current value
  - Percentage change over time
  - Comparison with L1 chains

- **Active Wallets**
  - Total active wallets
  - Growth over time
  - Inactive wallet tracking

- **Social Analytics**
  - Live Twitter/X mentions
  - Engagement metrics (likes, comments)
  - Impressions tracking

- **Development Activity**
  - Commit history
  - First and last commit dates
  - Total commits

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@chainpulse.com or open an issue in the repository.
