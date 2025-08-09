import { ref, get, set, update, remove, push } from 'firebase/database';
import { database, auth } from './firebase';

// Helper to get current user ID
const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user authenticated');
  }
  return user.uid;
};

// Portfolio operations
export const portfolioApi = {
  // Get user's portfolio
  getPortfolio: async (userId = null) => {
    const uid = userId || getCurrentUserId();
    const portfolioRef = ref(database, `portfolios/${uid}`);
    const snapshot = await get(portfolioRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map(key => ({
        ...data[key],
        firebaseID: key
      }));
    }
    return [];
  },

  // Add stock to portfolio
  addStock: async (stockData, userId = null) => {
    const uid = userId || getCurrentUserId();
    const portfolioRef = ref(database, `portfolios/${uid}`);
    const newStockRef = push(portfolioRef);
    await set(newStockRef, stockData);
    return newStockRef.key;
  },

  // Update stock in portfolio
  updateStock: async (stockId, stockData, userId = null) => {
    const uid = userId || getCurrentUserId();
    const stockRef = ref(database, `portfolios/${uid}/${stockId}`);
    await update(stockRef, stockData);
  },

  // Remove stock from portfolio
  removeStock: async (stockId, userId = null) => {
    const uid = userId || getCurrentUserId();
    const stockRef = ref(database, `portfolios/${uid}/${stockId}`);
    await remove(stockRef);
  }
};

// Watchlist operations
export const watchlistApi = {
  // Get user's watchlist
  getWatchlist: async (userId = null) => {
    const uid = userId || getCurrentUserId();
    const watchlistRef = ref(database, `watchlists/${uid}`);
    const snapshot = await get(watchlistRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map(key => ({
        ...data[key],
        firebaseID: key
      }));
    }
    return [];
  },

  // Add stock to watchlist
  addStock: async (stockData, userId = null) => {
    const uid = userId || getCurrentUserId();
    const watchlistRef = ref(database, `watchlists/${uid}`);
    const newStockRef = push(watchlistRef);
    await set(newStockRef, stockData);
    return newStockRef.key;
  },

  // Remove stock from watchlist
  removeStock: async (stockId, userId = null) => {
    const uid = userId || getCurrentUserId();
    const stockRef = ref(database, `watchlists/${uid}/${stockId}`);
    await remove(stockRef);
  }
};

// User data operations
export const userApi = {
  // Get user profile data
  getUserData: async (userId = null) => {
    const uid = userId || getCurrentUserId();
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  },

  // Update user profile data
  updateUserData: async (userData, userId = null) => {
    const uid = userId || getCurrentUserId();
    const userRef = ref(database, `users/${uid}`);
    await update(userRef, userData);
  }
};

// Keep the original axios-based API for external services (stock data, news)
import axios from 'axios';

export const externalApi = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for external API
externalApi.interceptors.request.use(
  config => {
    console.log(`Making ${config.method ? config.method.toUpperCase() : 'UNKNOWN'} request to ${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for external API
externalApi.interceptors.response.use(
  response => response,
  error => {
    console.error('External API Error:', (error.response && error.response.data) || error.message);
    return Promise.reject(error);
  }
);

export default { portfolioApi, watchlistApi, userApi, externalApi };