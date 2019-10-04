import { 
    RECEIVE_BOARD,
    RECEIVE_UPDATED_BOARD
} from '../../actions/board_actions';

import {
    RECEIVE_SESSION_DATA,
    SESSION_LOGOUT
} from '../../actions/session_actions';

import {
    RECEIVE_LIST
} from '../../actions/list_actions';



const boardsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_LIST:
        case RECEIVE_BOARD:
        case RECEIVE_UPDATED_BOARD:
            return Object.assign({}, state, { [action.board.id]: action.board });
        case RECEIVE_SESSION_DATA:
            return Object.assign({}, state, action.boards);
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default boardsReducer;