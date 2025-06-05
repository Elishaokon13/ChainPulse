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
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500 p-4 text-center">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">
        DeFi Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard
              project={project}
              onClick={() => handleProjectSelect(project.id)}
            />
          </div>
        ))}
      </div>
      <ProjectDetailsPanel
        projectId={selectedProjectId}
        open={!!selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />
    </div>
  );
} 