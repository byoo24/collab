import { 
    RECEIVE_BOARD,
    RECEIVE_BOARDS
} from '../../actions/board_actions';

import {
    SESSION_LOGOUT
} from '../../actions/session_actions';



const boardsReducer = (state = {}, action) => {
    Object.freeze(state);
    const { board } = action;

    switch (action.type) {
        case RECEIVE_BOARD:
            return Object.assign({}, state, { [board.id]: board });
        case RECEIVE_BOARDS:
            return Object.assign({}, state, action.boards);
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default boardsReducer;