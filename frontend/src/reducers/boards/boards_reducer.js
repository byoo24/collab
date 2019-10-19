import { 
    RECEIVE_BOARD,
    RECEIVE_UPDATED_BOARD,
    REMOVE_BOARD
} from '../../actions/board_actions';

import {
    RECEIVE_SESSION_DATA,
    SESSION_LOGOUT
} from '../../actions/session_actions';

import {
    RECEIVE_LIST,
    REMOVE_LIST
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

        case REMOVE_BOARD:
            const newState = Object.assign({}, state);
            delete newState[action.boardId];
            return newState;

        case REMOVE_LIST:
            const newBoard = state[action.boardId];
            const listIndex = newBoard.listIds.indexOf(action.listId);
            if (listIndex > -1) {
                newBoard.listIds.splice(listIndex, 1);
            }
            return Object.assign({}, state, {[newBoard.id]: newBoard});

        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default boardsReducer;