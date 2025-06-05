import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  LinearProgress,
  Button as MuiButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getProject } from '../data/api';
import MetricDetailsDrawer from './MetricDetailsDrawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingState from './LoadingState';
import { Button } from "@/components/ui/button";

const drawerWidth = 400;

export default function ProjectDetailsPanel({ projectId, open, onClose }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        setLoading(true);
        setError(null); // Reset error state
        const data = await getProject(projectId);
        if (!data) {
          throw new Error('No project data received');
        }
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.message || 'Failed to fetch project details');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchProject();
    }
  }, [projectId, open]);

  const getHypeColor = (hype) => {
    switch (hype?.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedMetric(null);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: drawerWidth },
          boxSizing: 'border-box',
          bgcolor: 'background.default',
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Project Details
          </h2>
          <Button onClick={onClose} size="icon" variant="ghost" className="h-8 w-8">
            <CloseIcon className="h-4 w-4"/>
          </Button>
        </div>

        {loading ? (
          <LoadingState message="Loading project details..." />
        ) : error ? (
          <p className="text-red-500 p-4 text-center">
            {error}
          </p>
        ) : project ? (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                {project.name}
              </h3>
              <div className="flex gap-2 items-center mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                  {project.chain}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.hype?.toLowerCase() === 'high' ? 'bg-red-100 text-red-800' : project.hype?.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  Hype: {project.hype}
                </span>
              </div>
              <p className="text-secondary-foreground mb-4">
                {project.description}
              </p>
            </div>

            <hr className="my-6 border-t border-border" />

            <div className="grid grid-cols-1 gap-6">
              <div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                  <h4 className="text-lg font-semibold mb-4">
                    Project Score
                  </h4>
                  <div className="flex items-center gap-4">
                    <CircularProgress
                      variant="determinate"
                      value={project.score}
                      size={60}
                      sx={{ color: getScoreColor(project.score) }}
                    />
                    <p className="text-secondary-foreground">
                      Based on TVL, wallet growth, social engagement, and development activity
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                  <h4 className="text-lg font-semibold mb-4">
                    Key Metrics
                  </h4>
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex justify-between mb-1 items-center">
                        <Button variant="ghost" onClick={() => handleMetricClick('tvl')} className="p-0 min-w-0 font-semibold h-auto">
                          Total Value Locked (TVL)
                        </Button>
                        <span className="text-sm font-semibold">
                          ${project.tvl?.toLocaleString() || '0'}
                        </span>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((project.tvl / 10000000) * 100, 100)}
                        sx={{ height: 6, borderRadius: 4, color: 'primary.main' }}
                      />
                      <p className="text-xs text-secondary-foreground mt-1">
                        Indicates the absolute value of assets locked in the protocol. Higher is better.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 items-center">
                        <Button variant="ghost" onClick={() => handleMetricClick('wallets')} className="p-0 min-w-0 font-semibold h-auto">
                          Active Wallets
                        </Button>
                        <span className="text-sm font-semibold">
                          {project.wallets?.toLocaleString() || '0'}
                        </span>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((project.wallets / 10000) * 100, 100)}
                        sx={{ height: 6, borderRadius: 4, color: 'primary.main' }}
                      />
                      <p className="text-xs text-secondary-foreground mt-1">
                        Shows the number of unique wallets interacting with the project. Higher means more users.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 items-center">
                        <Button variant="ghost" onClick={() => handleMetricClick('mentions')} className="p-0 min-w-0 font-semibold h-auto">
                          Social Mentions (24h)
                        </Button>
                        <span className="text-sm font-semibold">
                          {Array.isArray(project.mentions) ? project.mentions.length : 0}
                        </span>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((project.mentions / 5000) * 100, 100)}
                        sx={{ height: 6, borderRadius: 4, color: project.hype === 'High' ? 'error.main' : 'primary.main' }}
                      />
                      <p className="text-xs text-secondary-foreground mt-1">
                        Reflects the number of times this project was mentioned on social media in the last 24 hours.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 items-center">
                        <Button variant="ghost" onClick={() => handleMetricClick('commits')} className="p-0 min-w-0 font-semibold h-auto">
                          Development Activity (30d)
                        </Button>
                        <span className="text-sm font-semibold">
                          {project.commits || 0} commits
                        </span>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((project.commits / 50) * 100, 100)}
                        sx={{ height: 6, borderRadius: 4, color: 'primary.main' }}
                      />
                      <p className="text-xs text-secondary-foreground mt-1">
                        Number of code commits in the last 30 days. Higher means more active development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                  <h4 className="text-lg font-semibold mb-4">
                    Growth Indicators
                  </h4>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      {project.score >= 70 ? (
                        <TrendingUpIcon className="text-green-500 w-5 h-5"/>
                      ) : (
                        <TrendingDownIcon className="text-red-500 w-5 h-5"/>
                      )}
                      <p className="text-secondary-foreground">
                        {project.score >= 70 
                          ? 'Strong fundamentals with sustainable growth'
                          : 'High social hype but weak fundamentals'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.commits > 10 ? (
                        <TrendingUpIcon className="text-green-500 w-5 h-5"/>
                      ) : (
                        <TrendingDownIcon className="text-red-500 w-5 h-5"/>
                      )}
                      <p className="text-secondary-foreground">
                        {project.commits > 10
                          ? 'Active development with regular updates'
                          : 'Limited development activity'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.wallets > 2000 ? (
                        <TrendingUpIcon className="text-green-500 w-5 h-5"/>
                      ) : (
                        <TrendingDownIcon className="text-red-500 w-5 h-5"/>
                      )}
                      <p className="text-secondary-foreground">
                        {project.wallets > 2000
                          ? 'Strong user adoption and growth'
                          : 'Limited user base and adoption'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <MetricDetailsDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        metric={selectedMetric}
        project={project}
        showBackArrow={true}
      />
    </Drawer>
  );
} 