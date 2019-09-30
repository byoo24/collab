import { 
    SESSION_ERRORS,
    SESSION_LOGOUT,
    CLEAR_SESSION_ERRORS
} from '../../../actions/session_actions';



const sessionErrorsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case SESSION_ERRORS:
            return action.errors;
        case SESSION_LOGOUT:
        case CLEAR_SESSION_ERRORS:
            return {};
        default:
            return state;
    }
}


export default sessionErrorsReducer;