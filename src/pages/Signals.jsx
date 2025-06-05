import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Button,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

export default function Signals() {
  const [selectedSignal, setSelectedSignal] = useState(null);

  // Mock data for signals
  const signals = [
    {
      id: 1,
      project: 'Project Alpha',
      chain: 'Ethereum',
      type: 'Bullish',
      confidence: 85,
      timeframe: '7d',
      description: 'Strong onchain metrics with increasing wallet activity',
      metrics: {
        tvlGrowth: 25,
        walletGrowth: 1200,
        volumeGrowth: 45,
        socialGrowth: 30
      }
    },
    {
      id: 2,
      project: 'Project Beta',
      chain: 'Solana',
      type: 'Bearish',
      confidence: 75,
      timeframe: '3d',
      description: 'Declining metrics despite high social activity',
      metrics: {
        tvlGrowth: -15,
        walletGrowth: -500,
        volumeGrowth: -20,
        socialGrowth: 200
      }
    }
  ];

  const getSignalCardClasses = (type) => {
    if (type === 'Bullish') {
      return 'bg-green-50 border-green-200';
    } else if (type === 'Bearish') {
      return 'bg-red-50 border-red-200';
    } else {
      return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = (value) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Trading Signals
        </h1>
        <p className="text-secondary-foreground">
          Real-time signals based on onchain metrics and social analysis
        </p>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {signals.map((signal) => (
          <div key={signal.id}>
            <div className={`rounded-lg border shadow-sm h-full flex flex-col ${getSignalCardClasses(signal.type)}`}>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">
                    {signal.project}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                    {signal.chain}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm text-secondary-foreground">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${signal.type === 'Bullish' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {signal.type === 'Bullish' ? <TrendingUpIcon className="-ml-1 mr-1 w-4 h-4"/> : <TrendingDownIcon className="-ml-1 mr-1 w-4 h-4"/>}
                    {signal.type}
                  </span>
                  <p>
                    Confidence: {signal.confidence}%
                  </p>
                  <p>
                    Timeframe: {signal.timeframe}
                  </p>
                </div>

                <p className="text-secondary-foreground mb-4">
                  {signal.description}
                </p>

                <hr className="my-4 border-t border-border" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-secondary-foreground">TVL Growth</p>
                    <p className={`${getTextColor(signal.metrics.tvlGrowth)} font-semibold`}>
                      {signal.metrics.tvlGrowth > 0 ? '+' : ''}{signal.metrics.tvlGrowth}%
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-foreground">Wallet Growth</p>
                    <p className={`${getTextColor(signal.metrics.walletGrowth)} font-semibold`}>
                      {signal.metrics.walletGrowth > 0 ? '+' : ''}{signal.metrics.walletGrowth}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-foreground">Volume Growth</p>
                    <p className={`${getTextColor(signal.metrics.volumeGrowth)} font-semibold`}>
                      {signal.metrics.volumeGrowth > 0 ? '+' : ''}{signal.metrics.volumeGrowth}%
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-foreground">Social Growth</p>
                    <p className={`${getTextColor(signal.metrics.socialGrowth)} font-semibold`}>
                      {signal.metrics.socialGrowth > 0 ? '+' : ''}{signal.metrics.socialGrowth}%
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => setSelectedSignal(signal)}
                    variant="outline"
                  >
                    View Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Signal Analysis Modal */}
      {selectedSignal && (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Detailed Analysis: {selectedSignal.project}
          </h2>
          {/* Add detailed analysis content here */}
        </div>
      )}
    </div>
  );
} 