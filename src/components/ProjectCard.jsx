import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Tooltip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from "@/components/ui/button"; // Import Shadcn UI Button

export default function ProjectCard({ project, onClick }) {
  const getHypeColor = (hype) => {
    switch (hype?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800'; // Tailwind class
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'; // Tailwind class
      case 'low':
        return 'bg-green-100 text-green-800'; // Tailwind class
      default:
        return 'bg-gray-100 text-gray-800'; // Tailwind class
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-500'; // Tailwind class
    if (score >= 40) return 'text-yellow-500'; // Tailwind class
    return 'text-red-500'; // Tailwind class
  };

  return (
    <div 
      className="rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 min-w-0"
      onClick={() => onClick(project.id)}
    >
      <div className="p-4 sm:p-6 flex-grow relative min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 min-w-0">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold mb-1 truncate">
              {project.name}
            </h3>
            <div className="flex flex-wrap gap-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                {project.chain}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getHypeColor(project.hype)}`}>
                Hype: {project.hype}
              </span>
            </div>
          </div>
          <Tooltip title="View Details">
            <Button size="icon" variant="ghost" className="h-9 w-9 min-w-[36px] min-h-[36px]" onClick={(e) => {
              e.stopPropagation();
              onClick(project.id);
            }}>
              <InfoIcon className="h-5 w-5"/>
            </Button>
          </Tooltip>
        </div>

        <div className="flex flex-col xs:flex-row justify-between gap-4 mb-4 min-w-0">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-secondary-foreground mb-0.5">TVL</p>
            <p className="text-base sm:text-lg font-semibold truncate">${project.tvl?.toLocaleString() || '0'}</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-secondary-foreground mb-0.5">Wallets</p>
            <p className="text-base sm:text-lg font-semibold truncate">{project.wallets?.toLocaleString() || '0'}</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-secondary-foreground mb-0.5">Score</p>
            <div className="relative inline-flex w-10 h-10">
              <CircularProgress
                variant="determinate"
                value={project.score}
                size={40}
                sx={{ color: getScoreColor(project.score) }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-secondary-foreground font-semibold">
                  {project.score}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xs:flex-row justify-between items-center gap-2 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            {project.score >= 70 ? (
              <TrendingUpIcon className="text-green-500 w-5 h-5"/>
            ) : (
              <TrendingDownIcon className="text-red-500 w-5 h-5"/>
            )}
            <p className="text-xs sm:text-sm text-secondary-foreground truncate">
              {project.score >= 70 ? 'Strong' : 'Weak'} Fundamentals
            </p>
          </div>
          <p className="text-xs sm:text-sm text-secondary-foreground">
            {project.commits} commits
          </p>
        </div>
      </div>
    </div>
  );
} 