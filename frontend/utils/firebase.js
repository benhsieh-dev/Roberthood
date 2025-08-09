import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration - using your existing Firebase project
const firebaseConfig = {
  databaseURL: "https://roberthood-edcdd.firebaseio.com",
  projectId: "roberthood-edcdd",
  authDomain: "roberthood-edcdd.firebaseapp.com",
  storageBucket: "roberthood-edcdd.firebasestorage.app",
  // Use environment variables with fallbacks for production
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAMA9JOw0a0lQNMIYF2C2CGkLbCyyNttGQ",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "850872946828",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:850872946828:web:b2253907963dfd98f2aba9",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-Q00ZBKRYQD",
};

// Debug logging to check if env vars are loaded
console.log('Firebase config debug:', {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? 'loaded' : 'missing',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? 'loaded' : 'missing',
  appId: process.env.REACT_APP_FIREBASE_APP_ID ? 'loaded' : 'missing',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ? 'loaded' : 'missing'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;