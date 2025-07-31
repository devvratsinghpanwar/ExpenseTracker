// Dynamic API base URL
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

// Get auth token from localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return user.token;
};

// API call helper
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  console.log('Making API call to:', `${API_BASE_URL}${endpoint}`);
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  
  const text = await response.text();// First 200 chars
  
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('JSON parse error:', e);
    throw new Error('Server returned invalid JSON');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: (userData) => apiCall('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiCall('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
};

// Expenses API
export const expensesAPI = {
  getExpenses: () => apiCall('/expenses'),
  
  addExpense: (expenseData) => apiCall('/expenses', {
    method: 'POST',
    body: JSON.stringify(expenseData),
  }),
  
  deleteExpense: (id) => apiCall(`/expenses/${id}`, {
    method: 'DELETE',
  }),
};
