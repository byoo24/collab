import {
    NAV_INDEX,
    NAV_CREATE,
    NAV_USER,
    NAV_CLEAR
} from '../../actions/nav_actions';



const listsReducer = (state = null, action) => {
    Object.freeze(state);

    switch (action.type) {
        case NAV_INDEX:
            return NAV_INDEX;
        case NAV_CREATE:
            return NAV_CREATE;
        case NAV_USER:
            return NAV_USER;
        case NAV_CLEAR:
            return null;
        default:
            return state;
    }
}


export default listsReducer;