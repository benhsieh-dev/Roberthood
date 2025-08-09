import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from './firebase';

// Create a new user account
export const createUser = async (userData) => {
  try {
    const { first_name, last_name, username, password } = userData;
    const email = `${username}@roberthood.local`; // Use username as email
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, {
      displayName: `${first_name} ${last_name}`
    });
    
    // Store additional user data in Realtime Database
    await set(ref(database, 'users/' + user.uid), {
      username: username,
      firstName: first_name,
      lastName: last_name,
      email: email,
      createdAt: new Date().toISOString()
    });
    
    return {
      id: user.uid,
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign in user
export const loginUser = async (username, password) => {
  try {
    const email = `${username}@roberthood.local`;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get additional user data from database
    const userDataRef = ref(database, 'users/' + user.uid);
    const snapshot = await get(userDataRef);
    const userData = snapshot.val();
    
    return {
      id: user.uid,
      username: userData?.username || username,
      first_name: userData?.firstName || '',
      last_name: userData?.lastName || '',
      email: user.email
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign out user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Listen for authentication state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const userDataRef = ref(database, 'users/' + user.uid);
      const snapshot = await get(userDataRef);
      const userData = snapshot.val();
      
      const currentUser = {
        id: user.uid,
        username: userData?.username || user.email.split('@')[0],
        first_name: userData?.firstName || '',
        last_name: userData?.lastName || '',
        email: user.email
      };
      
      callback(currentUser);
    } else {
      // User is signed out
      callback(null);
    }
  });
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};