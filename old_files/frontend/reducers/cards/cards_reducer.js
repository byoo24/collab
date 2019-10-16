import {
    RECEIVE_CARD,
    RECEIVE_UPDATED_CARD
} from '../../actions/card_actions';

import {
    RECEIVE_SESSION_DATA,
    SESSION_LOGOUT
} from '../../actions/session_actions';



const listsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_UPDATED_CARD:
        case RECEIVE_CARD:
            return Object.assign({}, state, { [action.card.id]: action.card });
        case RECEIVE_SESSION_DATA:
            return Object.assign({}, state, action.cards);
        case SESSION_LOGOUT:
            return {};
        default:
            return state;
    }
}  


export default listsReducer;