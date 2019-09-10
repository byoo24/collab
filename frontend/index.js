import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import Root from './components/root';


if (process.env.NODE_ENV !== 'production') {
    console.log('Entered development mode!');
}


document.addEventListener('DOMContentLoaded', () => {
    let store;

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);

        const decodedUser = jwt_decode(localStorage.jwtToken);

        let preloadedState = {
            session: {
                currentUser: decodedUser.userId
            }
        }

        console.log(preloadedState);

        store = configureStore(preloadedState);
        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
            // store.dispatch(logout());
            // window.location.href = '/login';
            console.log('session expired');
        }
    } else {
        store = configureStore({});
    }

    

    ReactDOM.render(
        <Root store={ store } />,
        document.getElementById('root')
    )
});