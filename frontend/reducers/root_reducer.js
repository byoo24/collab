import { combineReducers } from 'redux';

import session from './session/session_reducer';
import boards from './board/board_reducer';

export default combineReducers({
    session,
    boards
});