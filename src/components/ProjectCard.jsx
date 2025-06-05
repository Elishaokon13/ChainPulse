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
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'success';
    if (score >= 40) return 'warning';
    return 'error';
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
      onClick={() => onClick(project.id)}
    >
      <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {project.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label={project.chain} 
                size="small"
                sx={{ bgcolor: 'primary.main', color: 'white' }}
              />
              <Chip 
                label={`Hype: ${project.hype}`}
                size="small"
                color={getHypeColor(project.hype)}
              />
            </Box>
          </Box>
          <Tooltip title="View Details">
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => {
              e.stopPropagation();
              onClick(project.id);
            }}>
              <InfoIcon className="h-4 w-4"/>
            </Button>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              TVL
            </Typography>
            <Typography variant="h6">
              ${project.tvl?.toLocaleString() || '0'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Wallets
            </Typography>
            <Typography variant="h6">
              {project.wallets?.toLocaleString() || '0'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Score
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={project.score}
                size={40}
                color={getScoreColor(project.score)}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div" color="text.secondary">
                  {project.score}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {project.score >= 70 ? (
              <TrendingUpIcon color="success" fontSize="small" />
            ) : (
              <TrendingDownIcon color="error" fontSize="small" />
            )}
            <Typography variant="body2" color="text.secondary">
              {project.score >= 70 ? 'Strong' : 'Weak'} Fundamentals
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {project.commits} commits
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 