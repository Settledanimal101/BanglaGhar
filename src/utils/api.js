import axios from 'axios';

// Create a new Axios instance with a custom configuration
const apiClient = axios.create({
  // The an absolute URL for production (from Vercel's env variables)
  // OR the proxy path for local development.
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

/*
  OPTIONAL BUT HIGHLY RECOMMENDED:
  Use an interceptor to automatically attach the auth token to every request.
  This means you don't have to manually add the Authorization header everywhere.
*/
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or your state management)
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      // Add the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;
