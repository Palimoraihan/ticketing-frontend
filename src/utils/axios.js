import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden - show error message
          toast.error('You do not have permission to perform this action');
          break;
        case 404:
          // Not found - show error message
          toast.error('Resource not found');
          break;
        case 500:
          // Server error - show error message
          toast.error('Server error occurred');
          break;
        default:
          // Show error message from response
          toast.error(error.response.data.error || 'An error occurred');
      }
    } else {
      // Network error
      toast.error('Network error occurred');
    }
    return Promise.reject(error);
  }
);

export default api; 