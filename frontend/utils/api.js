import axios from 'axios';

// Default Axios instance for Rails API calls
const api = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Firebase Axios instance for external Firebase calls
const firebaseApi = axios.create({
  baseURL: 'https://roberthood-edcdd.firebaseio.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptors
api.interceptors.request.use(
  config => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

firebaseApi.interceptors.request.use(
  config => {
    console.log(`Making Firebase ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptors
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

firebaseApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Firebase API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { api, firebaseApi };
export default api;