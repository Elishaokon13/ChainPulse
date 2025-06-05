import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  TextField,
  Tooltip,
  Container
} from '@mui/material';
import {
  Code as CodeIcon,
  ContentCopy as CopyIcon,
  PlayArrow as PlayIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

const endpoints = [
  {
    method: 'GET',
    path: '/api/v1/projects',
    description: 'Get list of all projects',
    parameters: [
      { name: 'chain', type: 'string', required: false, description: 'Filter by blockchain' },
      { name: 'category', type: 'string', required: false, description: 'Filter by category' },
      { name: 'limit', type: 'number', required: false, description: 'Number of results to return' }
    ]
  },
  {
    method: 'GET',
    path: '/api/v1/projects/{id}',
    description: 'Get detailed information about a specific project',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Project ID' }
    ]
  },
  {
    method: 'GET',
    path: '/api/v1/metrics',
    description: 'Get aggregated metrics data',
    parameters: [
      { name: 'timeframe', type: 'string', required: false, description: 'Time period (24h, 7d, 30d)' },
      { name: 'chain', type: 'string', required: false, description: 'Filter by blockchain' }
    ]
  }
];

export default function Api() {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

  const handleCopy = (endpoint) => {
    navigator.clipboard.writeText(endpoint.path);
    setCopiedEndpoint(endpoint.path);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 4 }}>
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
            API Documentation
          </Typography>
          <Typography color="text.secondary" paragraph>
            Access ChainPulse data programmatically through our REST API
          </Typography>
        </Box>

        {/* API Key Section */}
        <Paper sx={{ 
          p: 3,
          mb: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
          border: '1px solid rgba(26, 115, 232, 0.1)'
        }}>
          <Typography variant="h6" gutterBottom>
            Your API Key
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              value="cp_live_xxxxxxxxxxxxxxxx"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              onClick={() => navigator.clipboard.writeText('cp_live_xxxxxxxxxxxxxxxx')}
              className="flex items-center gap-1"
            >
              <CopyIcon className="h-5 w-5" />
              Copy
            </Button>
          </Box>
        </Paper>

        {/* Endpoints Section */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Available Endpoints
        </Typography>

        {endpoints.map((endpoint, index) => (
          <Paper 
            key={endpoint.path}
            sx={{ 
              mb: 3,
              background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
              border: '1px solid rgba(26, 115, 232, 0.1)'
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip 
                  label={endpoint.method} 
                  color={endpoint.method === 'GET' ? 'success' : 'primary'}
                  sx={{ fontWeight: 600 }}
                />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {endpoint.path}
                </Typography>
                <Tooltip title="Copy endpoint">
                  <Button 
                    onClick={() => handleCopy(endpoint)}
                    variant="ghost" size="icon" className="h-8 w-8"
                  >
                    {copiedEndpoint === endpoint.path ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                </Tooltip>
              </Box>

              <Typography color="text.secondary" paragraph>
                {endpoint.description}
              </Typography>

              {endpoint.parameters && endpoint.parameters.length > 0 && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    Parameters
                  </Typography>
                  <List dense>
                    {endpoint.parameters.map((param) => (
                      <ListItem key={param.name}>
                        <ListItemIcon>
                          <CodeIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {param.name}
                              </Typography>
                              <Chip 
                                label={param.type} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: 'rgba(26, 115, 232, 0.1)',
                                  color: 'primary.main'
                                }} 
                              />
                              {param.required && (
                                <Chip 
                                  label="Required" 
                                  size="small" 
                                  color="error"
                                />
                              )}
                            </Box>
                          }
                          secondary={param.description}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Example Request
                </Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    fontFamily: 'monospace'
                  }}
                >
                  <Typography variant="body2">
                    curl -X GET "https://api.chainpulse.io{endpoint.path}" \<br />
                    &nbsp;&nbsp;-H "Authorization: Bearer cp_live_xxxxxxxxxxxxxxxx"
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Paper>
        ))}

        {/* Rate Limits Section */}
        <Paper sx={{ 
          p: 3,
          mt: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
          border: '1px solid rgba(26, 115, 232, 0.1)'
        }}>
          <Typography variant="h6" gutterBottom>
            Rate Limits
          </Typography>
          <Typography paragraph>
            • Free tier: 100 requests per minute<br />
            • Pro tier: 1000 requests per minute<br />
            • Enterprise tier: Custom limits
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
} 