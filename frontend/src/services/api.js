// Environment-aware API configuration
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '/api'; // SSR fallback
  
  const { hostname, protocol } = window.location;
  
  // Development - check for both dev and preview ports
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost:')) {
    return 'http://localhost:5000/api';
  }
  
  // Production - same domain
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  register: (userData) => 
    apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) => 
    apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
};

// Expenses API functions
export const expensesAPI = {
  getExpenses: () => apiCall('/expenses'),

  addExpense: (expenseData) => 
    apiCall('/expenses', {
      method: 'POST',
      body: JSON.stringify(expenseData),
    }),

  deleteExpense: (id) => 
    apiCall(`/expenses/${id}`, {
      method: 'DELETE',
    })
};

// Individual exports for backward compatibility
export const register = authAPI.register;
export const login = authAPI.login;
export const getExpenses = expensesAPI.getExpenses;
export const addExpense = expensesAPI.addExpense;
export const deleteExpense = expensesAPI.deleteExpense;
