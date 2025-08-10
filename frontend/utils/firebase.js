import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Debug: Check what webpack DefinePlugin values are available
console.log('Environment variables check:', {
  apiKey: typeof FIREBASE_API_KEY !== 'undefined' ? 'DEFINED' : 'MISSING',
  messagingSenderId: typeof FIREBASE_MESSAGING_SENDER_ID !== 'undefined' ? 'DEFINED' : 'MISSING', 
  appId: typeof FIREBASE_APP_ID !== 'undefined' ? 'DEFINED' : 'MISSING',
  measurementId: typeof FIREBASE_MEASUREMENT_ID !== 'undefined' ? 'DEFINED' : 'MISSING'
});

// Firebase configuration using webpack-defined constants
const firebaseConfig = {
  databaseURL: "https://roberthood-edcdd.firebaseio.com",
  projectId: "roberthood-edcdd",
  authDomain: "roberthood-edcdd.firebaseapp.com",
  storageBucket: "roberthood-edcdd.firebasestorage.app",
  // These will be replaced by webpack DefinePlugin at build time
  apiKey: (typeof FIREBASE_API_KEY !== 'undefined' && FIREBASE_API_KEY !== 'undefined') ? FIREBASE_API_KEY : process.env.REACT_APP_FIREBASE_API_KEY,
  messagingSenderId: (typeof FIREBASE_MESSAGING_SENDER_ID !== 'undefined' && FIREBASE_MESSAGING_SENDER_ID !== 'undefined') ? FIREBASE_MESSAGING_SENDER_ID : process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: (typeof FIREBASE_APP_ID !== 'undefined' && FIREBASE_APP_ID !== 'undefined') ? FIREBASE_APP_ID : process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: (typeof FIREBASE_MEASUREMENT_ID !== 'undefined' && FIREBASE_MEASUREMENT_ID !== 'undefined') ? FIREBASE_MEASUREMENT_ID : process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

console.log('Final Firebase config:', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;