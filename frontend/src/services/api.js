import axios from 'axios';

// This simple setup works for both production and local development
const api = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://expense-tracker-mauve-nine.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token on every API call
api.interceptors.request.use(
  (config) => {
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

// You can keep your existing API function exports
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