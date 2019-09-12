import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_SESSION = "RECEIVE_SESSION";
export const SESSION_LOGOUT = "SESSION_LOGOUT";
export const SESSION_ERRORS = "SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";


export const receiveSession = (data) => {
    return {
        type: RECEIVE_SESSION,
        user: data
    }
}


export const receiveLogout = () => ({
    type: SESSION_LOGOUT
});


export const sessionErrors = (errors) => ({
    type: SESSION_ERRORS,
    errors
});


export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})


// export const signup = input => dispatch => (
//     APIUtil.signup(input).then(user => {
//         const { data, errors } = user.data;
//         debugger
//         if(errors) {
//             console.log(errors);
//         } else {
//             dispatch(receiveSignup(data.signup));
//         }
//     })
// );



export const signup = input => dispatch => (
    APIUtil.signup(input).then(
        (user) => {
            const { data } = user;
            dispatch(receiveSession(data));
        }, 
        err => {
            const { data } = err.response;
            dispatch(sessionErrors(data))
        }
    )
);


export const login = input => dispatch => (
    APIUtil.login(input).then(
        (user) => {
            const { token } = user.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveSession(decoded));
        },
        err => {
            const { data } = err.response;
            dispatch(sessionErrors(data));
        }
    )
);




export const logout = () => dispatch => {
    // Remove the token from local storage
    localStorage.removeItem('jwtToken');

    // Remove the token from the common axios header
    APIUtil.setAuthToken(false);

    // Dispatch a logout action
    dispatch(receiveLogout());
}