import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  chainlink: {
    apiKey: process.env.CHAINLINK_API_KEY
  },
  alchemy: {
    apiKey: process.env.ALCHEMY_API_KEY
  },
  twitter: {
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
  },
  github: {
    apiKey: process.env.GITHUB_API_KEY
  },
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  }
}; 