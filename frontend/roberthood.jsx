import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root'; 
import configureStore from './store/store'; 
import { onAuthChange } from './utils/auth';

document.addEventListener("DOMContentLoaded", () => {
    const store = configureStore(); 
    
    // Listen for Firebase auth state changes
    onAuthChange((user) => {
      if (user) {
        store.dispatch({ type: 'RECEIVE_CURRENT_USER', currentUser: user });
      } else {
        store.dispatch({ type: 'LOGOUT_CURRENT_USER' });
      }
    });

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
})