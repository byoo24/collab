import * as APIUtil from '../util/user_api_util';
import { receiveBoards } from './board_actions';

export const RECEIVE_USER = "RECEIVE_USER";


export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}


export const getUserCollections = userId => dispatch => (
    APIUtil.getUserCollections(userId).then(res => {
        const {data, errors} = res.data;
        const {id, username, email, boards} = data.user;

        dispatch(receiveUser({
            id,
            username,
            email
        }));

        dispatch(receiveBoards(boards));
    })
)
