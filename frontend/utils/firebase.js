import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration - using your existing Firebase project
const firebaseConfig = {
  databaseURL: "https://roberthood-edcdd.firebaseio.com",
  projectId: "roberthood-edcdd",
  // TODO: You'll need to get these values from Firebase Console > Project Settings > General > Your Apps
  // Go to https://console.firebase.google.com/project/roberthood-edcdd/settings/general/web
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCRlwXcWC02pF3AjOybon_VELIDf2R2UgU",
  authDomain: "roberthood-edcdd.firebaseapp.com",
  storageBucket: "roberthood-edcdd.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789012:web:abcdefghijklmnop123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;