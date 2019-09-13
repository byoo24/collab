import { combineReducers } from 'redux';

import session from './session/session_reducer';
import boards from './boards/boards_reducer';
import lists from './lists/lists_reducer';
import users from './users/users_reducer';
import errors from './errors/errors_reducer';

export default combineReducers({
    session,
    users,
    boards,
    lists,
    errors
});