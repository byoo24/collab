import { RECEIVE_SIGNUP } from '../../actions/session_actions';

const _nullUser = {
    currentUser: null
}

const sessionReducer = (state = _nullUser, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_SIGNUP:
            return Object.assign({}, state, {currentUser: action.user.id});
        default:
            return state;
    }
}


export default sessionReducer;