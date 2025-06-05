import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export async function getProjects() {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getProject(id) {
  try {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
}

export async function getMetrics() {
  try {
    const response = await axios.get(`${API_URL}/metrics`);
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