import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../utils/auth";
import Login from "./login";

const msp = state => ({
  currentUser: state.session.currentUser
})

const mdp = (dispatch) => ({
  login: async (username, password) => {
    try {
      const user = await loginUser(username, password);
      // Update Redux store with the logged in user
      dispatch({ type: 'RECEIVE_CURRENT_USER', currentUser: user });
      return user;
    } catch (error) {
      dispatch({ type: 'RECEIVE_ERRORS', errors: [error.message] });
      throw error;
    }
  },
});

export default connect(msp, mdp)(Login);
