import {
    MODAL_NEW_BOARD,
    MODAL_CLEAR
} from '../../actions/modals_action';


const modalsReducer = (state = null, action) => {
    Object.freeze(state);

    switch (action.type) {
        case MODAL_NEW_BOARD:
            return action.type;
        case MODAL_CLEAR:
            return null;
        default:
            return state;
    }
}


export default modalsReducer;