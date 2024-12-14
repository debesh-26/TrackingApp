import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 

export const trackLocation = (location) => API.post('/location', location);

export const fetchUsers = () => API.get('/admin/users');

export const fetchUserLocations = (userId) =>
  API.get(`/admin/users/${userId}/locations`);
