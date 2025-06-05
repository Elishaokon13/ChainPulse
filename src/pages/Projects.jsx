import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Container
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { getProjects } from '../data/api';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsPanel from '../components/ProjectDetailsPanel';
import LoadingState from '../components/LoadingState';

const categories = ['All', 'DeFi', 'NFT', 'Infra', 'Social', 'Meme'];
const chains = ['All', 'Ethereum', 'Solana', 'Arbitrum'];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChain, setSelectedChain] = useState('All');
  const [sortBy, setSortBy] = useState('score');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesChain = selectedChain === 'All' || project.chain === selectedChain;
    return matchesSearch && matchesCategory && matchesChain;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score;
      case 'tvlGrowth':
        return b.tvl - a.tvl;
      case 'walletGrowth':
        return b.wallets - a.wallets;
      case 'tweets':
        return b.mentions - a.mentions;
      default:
        return 0;
    }
  });

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
  };

  if (loading) {
    return <LoadingState message="Loading projects..." fullScreen />;
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" sx={{ p: 4, textAlign: 'center' }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>
        DeFi Projects
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard
              project={project}
              onSelect={handleProjectSelect}
            />
          </Grid>
        ))}
      </Grid>
      <ProjectDetailsPanel
        projectId={selectedProjectId}
        open={!!selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />
    </Container>
  );
} 