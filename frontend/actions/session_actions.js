import * as APIUtil from '../util/session_api_util';
import { convertArrayToObjects } from '../libs/helper_methods';
import jwt_decode from 'jwt-decode';

export const RECEIVE_SESSION = "RECEIVE_SESSION";
export const RECEIVE_SESSION_DATA = "RECEIVE_SESSION_DATA";
export const SESSION_LOGOUT = "SESSION_LOGOUT";
export const SESSION_ERRORS = "SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";


export const receiveSession = (data) => {
    
    return {
        type: RECEIVE_SESSION,
        user: data
    }
}


export const receiveSessionData = ({user, boards, lists, cards}) => {
    boards = convertArrayToObjects(boards);
    lists = convertArrayToObjects(lists);
    cards = convertArrayToObjects(cards);
    
    return {
        type: RECEIVE_SESSION_DATA,
        user,
        boards,
        lists,
        cards
    }
}


export const receiveLogout = () => ({
    type: SESSION_LOGOUT
});



export const sessionErrors = (errors) => ({
    type: SESSION_ERRORS,
    errors
});


export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})





const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    return jwt_decode(token);
}


export const signup = input => dispatch => (
    APIUtil.signup(input).then(
        (user) => {
            const { token } = user.data;
            const decoded = setToken(token);
            dispatch(receiveSession(decoded));
        }, 
        err => {
            const { data } = err.response;
            dispatch(sessionErrors(data))
        }
    )
);


export const login = input => dispatch => (
    APIUtil.login(input).then(
        (user) => {
            const { token } = user.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveSession(decoded));
        },
        err => {
            const { data } = err.response;
            dispatch(sessionErrors(data));
        }
    )
);




export const logout = () => dispatch => {
    // Remove the token from local storage
    localStorage.removeItem('jwtToken');

    // Remove the token from the common axios header
    APIUtil.setAuthToken(false);

    // Dispatch a logout action
    dispatch(receiveLogout());
}



export const getSessionData = userId => dispatch => (
    APIUtil.getSessionData(userId).then(res => {
        const { data, errors } = res.data;
        
        if (errors) {
            console.log(errors);
        } else {
            // User
            const { user } = data;

            // Boards
            const { boards } = user;
            delete user.boards;

            // Lists
            let lists = [];
            boards.forEach(board => {
                lists = lists.concat(board.lists);
                delete board.lists;
            });

            // Cards
            let cards = [];
            lists.forEach(list => {
                cards = cards.concat(list.cards);
                delete list.cards;
            })

            dispatch(receiveSessionData({
                user,
                boards,
                lists,
                cards
            }));
        }
    })
)