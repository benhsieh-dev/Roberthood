import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../utils/auth";
import Portfolio from "./portfolio";

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: async () => {
    try {
      await logoutUser();
      dispatch({ type: 'LOGOUT_CURRENT_USER' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);