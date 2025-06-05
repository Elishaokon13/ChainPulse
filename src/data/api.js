import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = async () => {
  const response = await api.get('/api/projects');
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/api/projects/${id}`);
  return response.data;
};

export default api;

export async function getMetrics() {
  try {
    const response = await api.get('/api/metrics');
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
}

export async function getProjectDetails(id) {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project details');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
} 