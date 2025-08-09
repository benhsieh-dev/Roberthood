import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration - using your existing Firebase project
const firebaseConfig = {
  databaseURL: "https://roberthood-edcdd.firebaseio.com",
  projectId: "roberthood-edcdd",
  // TODO: You'll need to get these values from Firebase Console > Project Settings > General > Your Apps
  // Go to https://console.firebase.google.com/project/roberthood-edcdd/settings/general/web
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "roberthood-edcdd.firebaseapp.com",
  storageBucket: "roberthood-edcdd.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;