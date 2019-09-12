import { 
    RECEIVE_SESSION,
    SESSION_LOGOUT
} from '../../actions/session_actions';


const sessionReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_SESSION:
            return Object.assign({}, state, {currentUser: action.user});
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}


export default sessionReducer;