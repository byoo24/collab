import {
    RECEIVE_LIST,
    RECEIVE_UPDATED_LIST,
    RECEIVE_UPDATED_LISTS,
    REMOVE_LIST
} from '../../actions/list_actions';

import {
    RECEIVE_CARD,
    REMOVE_CARD
} from '../../actions/card_actions';

import {
    RECEIVE_SESSION_DATA,
    SESSION_LOGOUT
} from '../../actions/session_actions';



const listsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_UPDATED_LIST:
        case RECEIVE_CARD:
        case RECEIVE_LIST:
            return Object.assign({}, state, { [action.list.id]: action.list });

        case RECEIVE_SESSION_DATA:
            return Object.assign({}, state, action.lists);

        case RECEIVE_UPDATED_LISTS:
            const newState = Object.assign({}, state);
            const newLists = action.lists;
            newLists.forEach(list => newState[list.id] = list);
            return newState;

        case REMOVE_LIST:
            const newState2 = Object.assign({}, state);
            delete newState2[action.listId];
            return newState2;

        case REMOVE_CARD:
            const newList = state[action.listId];
            const cardIndex = newList.cardIds.indexOf(action.cardId);
            if (cardIndex > -1) {
                newList.cardIds.splice(cardIndex, 1);
            }
            return Object.assign({}, state, {[newList.id]: newList});

        case SESSION_LOGOUT:
            return {};
            
        default:
            return state;
    }
}


export default listsReducer;