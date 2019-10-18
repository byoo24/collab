import {
    MODAL_NEW_BOARD,
    MODAL_UPDATE_CARD,
    MODAL_UPDATE_LIST,
    MODAL_CLEAR
} from '../../actions/modals_action';


const modalsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case MODAL_UPDATE_CARD:
        case MODAL_UPDATE_LIST:
        case MODAL_NEW_BOARD:
            return action;
        case MODAL_CLEAR:
            return {};
        default:
            return state;
    }
}


export default modalsReducer;