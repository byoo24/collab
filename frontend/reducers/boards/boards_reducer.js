import { 
    RECEIVE_BOARD
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
        case RECEIVE_BOARD:
            return Object.assign({}, state, { [action.board.id]: action.board });
        case RECEIVE_SESSION_DATA:
            return Object.assign({}, state, action.boards);
        case RECEIVE_LIST:
            const newState = Object.assign({}, state);
            const boardId = action.board.id;
            const listIds = action.board.listIds;
            newState[boardId].listIds = listIds;
            
            return newState;
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default boardsReducer;