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
    <div className="container mx-auto px-4 pb-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          API Documentation
        </h1>
        <p className="text-secondary-foreground">
          Access ChainPulse data programmatically through our REST API
        </p>
      </div>

      {/* API Key Section */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Your API Key
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
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
            className="flex items-center gap-1 w-full md:w-auto justify-center md:justify-start"
          >
            <CopyIcon className="h-5 w-5" />
            Copy
          </Button>
        </div>
      </div>

      {/* Endpoints Section */}
      <h2 className="text-2xl font-semibold mb-6">
        Available Endpoints
      </h2>

      {endpoints.map((endpoint) => (
        <div 
          key={endpoint.path}
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              {endpoint.method}
            </span>
            <h3 className="text-lg font-semibold flex-grow">
              {endpoint.path}
            </h3>
            <Tooltip title="Copy endpoint">
              <Button 
                onClick={() => handleCopy(endpoint)}
                variant="ghost" size="icon" className="h-8 w-8"
              >
                {copiedEndpoint === endpoint.path ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            </Tooltip>
          </div>

          <p className="text-secondary-foreground mb-4">
            {endpoint.description}
          </p>

          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <>
              <h4 className="text-lg font-semibold mt-4 mb-2">
                Parameters
              </h4>
              <List dense>
                {endpoint.parameters.map((param) => (
                  <ListItem key={param.name} className="px-0">
                    <ListItemIcon>
                      <CodeIcon className="text-primary w-5 h-5"/>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                          <p className="font-semibold mr-1">
                            {param.name}
                          </p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {param.type}
                          </span>
                          {param.required && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Required
                            </span>
                          )}
                        </div>
                      }
                      secondary={<p className="text-secondary-foreground text-sm mt-1 sm:mt-0">{param.description}</p>}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">
              Example Request
            </h4>
            <div 
              className="rounded-md border bg-gray-50 p-4 font-mono text-sm text-foreground overflow-x-auto"
            >
              <pre>
                {`curl -X ${endpoint.method} "https://api.chainpulse.io${endpoint.path}" \\\n    -H "Authorization: Bearer cp_live_xxxxxxxxxxxxxxxx"`}
              </pre>
            </div>
          </div>
        </div>
      ))}

      {/* Rate Limits Section */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Rate Limits
        </h2>
        <p className="text-secondary-foreground mb-2">
          • Free tier: 100 requests per minute
        </p>
        <p className="text-secondary-foreground mb-2">
          • Pro tier: 1000 requests per minute
        </p>
        <p className="text-secondary-foreground">
          • Enterprise tier: Custom limits
        </p>
      </div>
    </div>
  );
} 