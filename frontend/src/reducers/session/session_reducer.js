import { 
    RECEIVE_SESSION,
    RECEIVE_SESSION_DATA,
    SESSION_LOGOUT
} from '../../actions/session_actions';

import {
    RECEIVE_BOARD,
    REMOVE_BOARD
} from '../../actions/board_actions';


const sessionReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_BOARD:
        case RECEIVE_SESSION:
        case RECEIVE_SESSION_DATA:
            return Object.assign({}, state, action.user);
        case REMOVE_BOARD:
            const newUser = Object.assign({}, state);
            const boardIndex = newUser.personalBoardIds.indexOf(action.boardId);
            if (boardIndex > -1){
                newUser.personalBoardIds.splice(boardIndex, 1);
            }
            return newUser;
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default sessionReducer;