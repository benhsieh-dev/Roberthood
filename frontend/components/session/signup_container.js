import { connect } from 'react-redux';
import { createUser } from '../../utils/auth'; 
import Signup from './signup'; 

const mdp = dispatch => ({
    createNewUser: async (formUser) => {
        try {
            const user = await createUser(formUser);
            // Update Redux store with the new user
            dispatch({ type: 'RECEIVE_CURRENT_USER', currentUser: user });
            return user;
        } catch (error) {
            dispatch({ type: 'RECEIVE_ERRORS', errors: [error.message] });
            throw error;
        }
    }
});

export default connect(null, mdp)(Signup); 