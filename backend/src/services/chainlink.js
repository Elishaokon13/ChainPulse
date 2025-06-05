import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { config } from '../config.js';

dotenv.config();

const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// ETH/USD Price Feed on Sepolia
const ETH_USD_PRICE_FEED = '0x694AA1769357215DE4FAC081bf1f309aDC325306';

// ABI for Chainlink Price Feed
const PRICE_FEED_ABI = [
  'function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)'
];

// Example mapping for Sepolia
const FEEDS = {
  ETH_USD: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  BTC_USD: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
  // Add more as needed
};

export async function getPrice() {
  try {
    // Use Chainlink API to get real-time price data
    const response = await fetch('https://api.chain.link/v1/price', {
      headers: {
        'Authorization': `Bearer ${config.chainlink.apiKey}`
      }
    });
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error('Error fetching price from Chainlink:', error);
    // Fallback to a default value if API fails
    return 2000; // Default ETH price
  }
}

// Generic function for any feed address
export async function getPriceFromFeed(feedAddress) {
  try {
    const priceFeed = new ethers.Contract(feedAddress, PRICE_FEED_ABI, provider);
    const roundData = await priceFeed.latestRoundData();
    const price = Number(roundData.answer) / 1e8;
    return price;
  } catch (error) {
    console.error('Error fetching price from feed:', error);
    throw error;
  }
} 