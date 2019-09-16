import { 
    RECEIVE_SESSION,
    RECEIVE_SESSION_DATA,
    SESSION_LOGOUT
} from '../../actions/session_actions';

import {
    RECEIVE_BOARD
} from '../../actions/board_actions';


const sessionReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_SESSION:
        case RECEIVE_SESSION_DATA:
            return Object.assign({}, state, action.user);
        case RECEIVE_BOARD:
            const newState = Object.assign({}, state);
            newState.personalBoardIds = action.personalBoardIds;
            return newState;
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default sessionReducer;