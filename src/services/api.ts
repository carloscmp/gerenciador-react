import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL base do backend
});

export default api;
