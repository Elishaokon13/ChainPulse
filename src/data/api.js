import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = async () => {
  const response = await api.get('/api/v1/projects');
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/api/v1/projects/${id}`);
  return response.data;
};

export async function getProjectDetails(id) {
  try {
    const response = await api.get(`/api/v1/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
}

export default api;

export async function getMetrics() {
  try {
    const response = await api.get('/api/v1/metrics');
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
} 