import axios from 'axios';

// Create an Axios instance. The baseURL will be '/api' which works
// perfectly for Vercel and for local development with the Vite proxy.
const api = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token on every API call
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  }
};

// Expenses API
export const expensesAPI = {
  getExpenses: async () => {
    const response = await api.get('/expenses');
    return response.data;
  },
  addExpense: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },
  deleteExpense: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  }
};

export default api;
