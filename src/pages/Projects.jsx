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
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { getProjects } from '../data/api';

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch projects. Please try again later.');
        console.error('Error fetching projects:', err);
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontFamily: 'Charter',
            fontWeight: 600,
            color: 'primary.main',
            mb: 2
          }}
        >
          Projects Directory
        </Typography>

        {/* Search and Filter Bar */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Chain</InputLabel>
              <Select
                value={selectedChain}
                label="Chain"
                onChange={(e) => setSelectedChain(e.target.value)}
              >
                {chains.map((chain) => (
                  <MenuItem key={chain} value={chain}>
                    {chain}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="score">Score</MenuItem>
                <MenuItem value="tvlGrowth">TVL Growth</MenuItem>
                <MenuItem value="walletGrowth">Wallet Growth</MenuItem>
                <MenuItem value="tweets">Tweets</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Projects Table */}
      <TableContainer component={Paper} sx={{ 
        background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
        border: '1px solid rgba(26, 115, 232, 0.1)'
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>Chain</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">TVL</TableCell>
              <TableCell align="right">Wallets</TableCell>
              <TableCell align="right">Mentions</TableCell>
              <TableCell align="right">Commits</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {project.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={project.chain} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(26, 115, 232, 0.1)',
                      color: 'primary.main'
                    }} 
                  />
                </TableCell>
                <TableCell>{project.hype}</TableCell>
                <TableCell align="right">
                  <Typography 
                    sx={{ 
                      color: project.score >= 70 ? 'success.main' : 
                            project.score >= 40 ? 'warning.main' : 'error.main',
                      fontWeight: 500
                    }}
                  >
                    {project.score}/100
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontWeight: 500 }}>
                    ${project.tvl.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontWeight: 500 }}>
                    {project.wallets.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">{project.mentions}</TableCell>
                <TableCell align="right">{project.commits}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton size="small" color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 