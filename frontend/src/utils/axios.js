import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', // URL da sua API
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;
