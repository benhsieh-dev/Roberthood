import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Debug: Check if environment variables are available
console.log('Environment variables check:', {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? 'SET' : 'MISSING',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? 'SET' : 'MISSING',
  appId: process.env.REACT_APP_FIREBASE_APP_ID ? 'SET' : 'MISSING',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ? 'SET' : 'MISSING'
});

// Firebase configuration - using environment variables
const firebaseConfig = {
  databaseURL: "https://roberthood-edcdd.firebaseio.com",
  projectId: "roberthood-edcdd",
  authDomain: "roberthood-edcdd.firebaseapp.com",
  storageBucket: "roberthood-edcdd.firebasestorage.app",
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

console.log('Final Firebase config:', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;