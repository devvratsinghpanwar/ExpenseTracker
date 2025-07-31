// Environment-aware API configuration
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '/api'; // SSR fallback
  
  const { hostname, protocol } = window.location;
  
  // Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  
  // Production - same domain
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

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
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.get('content-type'));
    
    const text = await response.text();
    console.log('Raw response:', text.substring(0, 200));
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('JSON parse error:', e);
      console.error('Response text:', text);
      throw new Error('Server returned invalid JSON');
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// API functions
export const register = (userData) => 
  apiCall('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const login = (credentials) => 
  apiCall('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const getExpenses = () => apiCall('/expenses');

export const addExpense = (expenseData) => 
  apiCall('/expenses', {
    method: 'POST',
    body: JSON.stringify(expenseData),
  });

export const deleteExpense = (id) => 
  apiCall(`/expenses/${id}`, {
    method: 'DELETE',
  });
