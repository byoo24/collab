import {
    RECEIVE_LIST,
} from '../../actions/list_actions';

import {
    RECEIVE_SESSION_DATA,
    SESSION_LOGOUT
} from '../../actions/session_actions';



const listsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_LIST:
            return Object.assign({}, state, { [action.list.id]: action.list });
        case RECEIVE_SESSION_DATA:
            return Object.assign({}, state, action.lists);
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default listsReducer;