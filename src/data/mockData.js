// Mock data for dashboard metrics and charts

export const metricsData = {
  totalUsers: 12500,
  activeUsers: 8450,
  totalTransactions: 45678,
  revenue: 1250000,
  growthRate: 15.8,
  userRetention: 87.5
};

export const chartData = {
  dailyActiveUsers: [
    { date: '2024-01-01', users: 1200 },
    { date: '2024-01-02', users: 1350 },
    { date: '2024-01-03', users: 1420 },
    { date: '2024-01-04', users: 1380 },
    { date: '2024-01-05', users: 1500 },
    { date: '2024-01-06', users: 1650 },
    { date: '2024-01-07', users: 1700 }
  ],
  revenueData: [
    { month: 'Jan', revenue: 150000 },
    { month: 'Feb', revenue: 175000 },
    { month: 'Mar', revenue: 190000 },
    { month: 'Apr', revenue: 210000 },
    { month: 'May', revenue: 225000 },
    { month: 'Jun', revenue: 240000 }
  ],
  userDistribution: [
    { region: 'North America', users: 4500 },
    { region: 'Europe', users: 3800 },
    { region: 'Asia Pacific', users: 2800 },
    { region: 'South America', users: 1200 },
    { region: 'Africa', users: 800 }
  ]
};

export const recentActivity = [
  {
    id: 1,
    type: 'transaction',
    description: 'New transaction processed',
    amount: 2500,
    timestamp: '2024-01-07T14:30:00Z',
    status: 'completed'
  },
  {
    id: 2,
    type: 'user',
    description: 'New user registration',
    timestamp: '2024-01-07T13:45:00Z',
    status: 'success'
  },
  {
    id: 3,
    type: 'alert',
    description: 'System performance alert',
    timestamp: '2024-01-07T12:15:00Z',
    status: 'warning'
  },
  {
    id: 4,
    type: 'transaction',
    description: 'Large transaction processed',
    amount: 15000,
    timestamp: '2024-01-07T11:20:00Z',
    status: 'completed'
  }
];

export const performanceMetrics = {
  systemUptime: 99.99,
  averageResponseTime: 120, // in milliseconds
  errorRate: 0.05,
  activeConnections: 2500,
  cpuUsage: 45,
  memoryUsage: 60
};

export const userMetrics = {
  newUsers: {
    daily: 150,
    weekly: 1050,
    monthly: 4200
  },
  activeUsers: {
    daily: 8450,
    weekly: 12500,
    monthly: 35000
  },
  userEngagement: {
    averageSessionDuration: 25, // in minutes
    pagesPerSession: 4.5,
    bounceRate: 32.5
  }
};

export const transactionMetrics = {
  totalVolume: 45678000,
  averageTransactionValue: 1250,
  successRate: 99.8,
  processingTime: {
    average: 1.2, // in seconds
    p95: 2.5,
    p99: 3.8
  }
};

// Export all data as a single object for convenience
export const mockDashboardData = {
  metrics: metricsData,
  charts: chartData,
  activity: recentActivity,
  performance: performanceMetrics,
  users: userMetrics,
  transactions: transactionMetrics
}; 