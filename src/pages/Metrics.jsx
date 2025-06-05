import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress
} from '@mui/material';
import { getMetrics } from '../data/api';

export default function Metrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch metrics. Please try again later.');
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="p-4 text-center">
        <p>No metrics available</p>
      </div>
    );
  }

  return (
    <div className="pb-4 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold mb-6">
        Platform Metrics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Overview
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-secondary-foreground mb-1">
                  Total Projects Tracked
                </p>
                <p className="text-2xl font-semibold">
                  {metrics?.totalProjects?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary-foreground mb-1">
                  Total TVL
                </p>
                <p className="text-2xl font-semibold">
                  ${metrics?.totalTVL?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary-foreground mb-1">
                  Total Wallets
                </p>
                <p className="text-2xl font-semibold">
                  {metrics?.totalWallets?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Chain Distribution
            </h2>
            <div className="flex flex-col gap-4">
              {metrics?.chainDistribution?.map((chain) => (
                <div key={chain.name}>
                  <div className="flex justify-between mb-1">
                    <p className="font-semibold">{chain.name}</p>
                    <p className="font-semibold">{chain.count}</p>
                  </div>
                  <div className="flex justify-between text-sm text-secondary-foreground mb-1">
                    <p>
                      TVL: ${chain.tvl?.toLocaleString() || '0'}
                    </p>
                    <p>
                      Wallets: {chain.wallets?.toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
              )) || (
                <p className="text-secondary-foreground text-center">No chain data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 