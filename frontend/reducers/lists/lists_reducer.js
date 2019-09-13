import {
    RECEIVE_LIST,
} from '../../actions/board_actions';

import {
    SESSION_LOGOUT
} from '../../actions/session_actions';



const listsReducer = (state = {}, action) => {
    Object.freeze(state);
    const { list } = action;

    switch (action.type) {
        case RECEIVE_LIST:
            return Object.assign({}, state, { [list.id]: list });
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default listsReducer;