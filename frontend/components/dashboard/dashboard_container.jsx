import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { logoutUser } from '../../utils/auth';

const msp = state => ({
    currentUser: state.session.currentUser
});

const mdp = dispatch => ({
    logout: async () => {
        try {
            await logoutUser();
            dispatch({ type: 'LOGOUT_CURRENT_USER' });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
});

export default connect(msp, mdp)(Dashboard); 