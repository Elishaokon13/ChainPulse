// src/services/twitter.js
// Mock logic for Twitter integration. Replace with real Twitter API calls when ready.

import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config.js';

const client = new TwitterApi({
  appKey: config.twitter.apiKey,
  appSecret: config.twitter.apiSecret,
  accessToken: config.twitter.accessToken,
  accessSecret: config.twitter.accessSecret,
});

export async function getMentions(projectHandle, options = {}) {
  try {
    const {
      startTime,
      endTime,
      maxResults = 100,
      paginationToken
    } = options;

    const query = `@${projectHandle}`;
    
    const tweets = await client.v2.search(query, {
      start_time: startTime,
      end_time: endTime,
      max_results: maxResults,
      pagination_token: paginationToken,
      'tweet.fields': ['created_at', 'public_metrics', 'author_id'],
      'user.fields': ['username', 'name', 'public_metrics'],
      expansions: ['author_id']
    });

    return {
      data: tweets.data,
      meta: tweets.meta,
      includes: tweets.includes
    };
  } catch (error) {
    console.error('Error fetching Twitter mentions:', error);
    throw error;
  }
}

export async function getMentionsCount(projectHandle, timeWindow = '24h') {
  try {
    const now = new Date();
    const startTime = new Date(now - getTimeWindowInMs(timeWindow));
    
    const mentions = await getMentions(projectHandle, {
      startTime: startTime.toISOString(),
      endTime: now.toISOString()
    });

    return {
      count: mentions.meta?.total_tweet_count || 0,
      timeWindow
    };
  } catch (error) {
    console.error('Error getting mentions count:', error);
    throw error;
  }
}

function getTimeWindowInMs(timeWindow) {
  const units = {
    'h': 3600000,
    'd': 86400000,
    'w': 604800000
  };
  
  const value = parseInt(timeWindow);
  const unit = timeWindow.slice(-1);
  
  return value * (units[unit] || units['h']);
} 