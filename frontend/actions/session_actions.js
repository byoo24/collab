import * as APIUtil from '../util/session_api_util';

export const RECEIVE_SIGNUP = "RECEIVE_SIGNUP";

export const receiveSignup = (data) => {
    debugger
    return {
        type: RECEIVE_SIGNUP,
        user: data
    }
}


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
        (data) => (dispatch(receiveSignup(data))), 
        err => (dispatch(receiveErrors()))
    )
)