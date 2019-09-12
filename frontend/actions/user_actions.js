import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";


export const receiveUser = (board) => {
    return {
        type: RECEIVE_USER,
        board
    }
}


export const getUserInfo = userId => dispatch => (
    APIUtil.getUserInfo(userId).then(user => {
        debugger
    })
)
