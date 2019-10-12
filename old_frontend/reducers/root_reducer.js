import { combineReducers } from 'redux';

import users from './users/users_reducer';
import session from './session/session_reducer';
import boards from './boards/boards_reducer';
import lists from './lists/lists_reducer';
import cards from './cards/cards_reducer';
import modal from './modals/modals_reducer';
import errors from './errors/errors_reducer';

export default combineReducers({
    users,
    session,
    boards,
    lists,
    cards,
    modal,
    errors
});