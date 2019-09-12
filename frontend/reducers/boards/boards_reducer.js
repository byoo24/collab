import { 
    RECEIVE_BOARD,
} from '../../actions/board_actions';

import {
    SESSION_LOGOUT
} from '../../actions/session_actions';



const sessionReducer = (state = {}, action) => {
    Object.freeze(state);
    const { board } = action;

    switch (action.type) {
        case RECEIVE_BOARD:
            return Object.assign({}, state, { [board.id]: board });
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default sessionReducer;