import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  IconButton as MuiIconButton,
  CircularProgress,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { getProject } from '../data/api';
import ProjectSocialMentions from '../components/ProjectSocialMentions';
import SocialAnalytics from '../components/SocialAnalytics';
import MetricDetailsDrawer from '../components/MetricDetailsDrawer';
import { Button } from "@/components/ui/button";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProject(id);
        setProject(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch project details. Please try again later.');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const GrowthMetric = ({ value, label, description }) => {
    const isPositive = value > 0;
    const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
    const Icon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;
    
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-secondary-foreground">
            {label}
          </p>
          <div className="flex items-center gap-1">
            <Icon className={`w-4 h-4 ${colorClass}`} />
            <p className={`${colorClass} font-semibold`}>
              {Math.abs(value)}%
            </p>
          </div>
        </div>
        <p className="text-xs text-secondary-foreground">
          {description}
        </p>
      </div>
    );
  };

  // Add a handler to open the metric details drawer
  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedMetric(null);
  };

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

  if (!project) {
    return (
      <div className="p-4 text-center">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center"
          variant="ghost"
        >
          <ArrowBackIcon className="mr-1 h-4 w-4"/>
          Back to Dashboard
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2">
              {project.name}
            </h1>
            <div className="flex gap-2 items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                {project.chain}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.hype?.toLowerCase() === 'high' ? 'bg-red-100 text-red-800' : project.hype?.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {project.hype}
              </span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-lg font-semibold mb-2">Project Score</p>
            <div className="relative inline-flex">
              <CircularProgress
                variant="determinate"
                value={project.score}
                size={80}
                thickness={4}
                sx={{
                  color: project.score >= 70 ? '#4CAF50' : 
                         project.score >= 40 ? '#FFC107' : '#F44336' // Using hex for MUI
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-xl font-semibold text-secondary-foreground">
                  {project.score}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Growth Metrics, Detailed Metrics) */}
        <div className="md:col-span-2">
          {/* Growth Metrics */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Growth Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GrowthMetric 
                value={15} 
                label="TVL Growth" 
                description="Total Value Locked has increased by 15% in the last 30 days"
              />
              <GrowthMetric 
                value={8} 
                label="Wallet Growth" 
                description="Number of active wallets has grown by 8% this month"
              />
              <GrowthMetric 
                value={-3} 
                label="Social Growth" 
                description="Social media mentions have decreased by 3% this week"
              />
              <GrowthMetric 
                value={12} 
                label="Developer Activity" 
                description="GitHub commits have increased by 12% in the last month"
              />
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Detailed Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">TVL Distribution</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <p className="font-semibold">Staking</p>
                      <p>60%</p>
                    </div>
                    <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4 }} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <p className="font-semibold">Lending</p>
                      <p>30%</p>
                    </div>
                    <LinearProgress variant="determinate" value={30} sx={{ height: 8, borderRadius: 4 }} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <p className="font-semibold">Other</p>
                      <p>10%</p>
                    </div>
                    <LinearProgress variant="determinate" value={10} sx={{ height: 8, borderRadius: 4 }} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Social Sentiment</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <p className="font-semibold">Positive</p>
                      <p>65%</p>
                    </div>
                    <LinearProgress 
                      variant="determinate" 
                      value={65} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#4CAF50' // Green
                        }
                      }} 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <p className="font-semibold">Neutral</p>
                      <p>25%</p>
                    </div>
                    <LinearProgress 
                      variant="determinate" 
                      value={25} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#FFC107' // Yellow
                        }
                      }} 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <p className="font-semibold">Negative</p>
                      <p>10%</p>
                    </div>
                    <LinearProgress 
                      variant="determinate" 
                      value={10} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#F44336' // Red
                        }
                      }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Project Overview, Social Analytics, Risk Assessment) */}
        <div className="md:col-span-1">
          {/* Project Overview */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Project Overview
            </h2>
            <p className="text-secondary-foreground mb-4">
              {project.description}
            </p>
            <hr className="my-4 border-t border-border" />
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="justify-start" onClick={() => handleMetricClick('tvl')}>
                Total Value Locked: ${project.tvl.toLocaleString()}
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleMetricClick('wallets')}>
                Active Wallets: {project.wallets.toLocaleString()}
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleMetricClick('mentions')}>
                Social Mentions: {Array.isArray(project.mentions) ? project.mentions.length : 0}
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleMetricClick('commits')}>
                GitHub Commits: {project.commits.toLocaleString()}
              </Button>
            </div>
          </div>

          {/* Social Analytics Section */}
          <ProjectSocialMentions projectHandle={project.twitterHandle} />

          {/* Risk Assessment Section */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Risk Assessment
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <p className="font-semibold">Smart Contract Risk</p>
                  <p className="text-green-500">Low</p>
                </div>
                <LinearProgress 
                  variant="determinate" 
                  value={20} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4CAF50' // Green
                    }
                  }} 
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <p className="font-semibold">Market Risk</p>
                  <p className="text-yellow-500">Medium</p>
                </div>
                <LinearProgress 
                  variant="determinate" 
                  value={50} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#FFC107' // Yellow
                    }
                  }} 
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <p className="font-semibold">Social Risk</p>
                  <p className="text-red-500">High</p>
                </div>
                <LinearProgress 
                  variant="determinate" 
                  value={80} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#F44336' // Red
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Details Drawer */}
      <MetricDetailsDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        metric={selectedMetric}
        project={project}
        showBackArrow={true}
      />
    </div>
  );
} 