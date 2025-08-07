import { api } from './api';

export const postUser = user => 
    api.post('/api/users', {user});

export const postSession = user => 
    api.post('/api/session', {user});

export const deleteSession = () => 
    api.delete('/api/session')
        .then(response => {
            console.log(response.data);
            return response;
        })
        .catch(error => {
            console.log((error.response && error.response.data) || error.message);
            throw error;
        });


//testing

// export const fetchUser = (usertId) => (
//     $.ajax({
//         url: `/api/users/${userId}`
//     })
// ); 