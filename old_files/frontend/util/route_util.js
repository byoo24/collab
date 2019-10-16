import React from 'react';
// import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { isEmpty } from '../libs/helper_methods';

// <AuthRoute path="" component={} />
export const AuthRoute = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            loggedIn ? <Redirect to="/dashboard" /> : <Component {...props} {...rest} />
        )} />
);


export const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            loggedIn ? <Component {...props} {...rest} /> : <Redirect to="/login" />
        )} />
);


export const CustomRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => <Component {...props} {...rest} />}
    />
);


// const msp = state => ({
//     loggedIn: !isEmpty(state.session.currentUser),
// });

// export const AuthRoute = withRouter(connect(msp)(Auth));
// export const ProtectedRoute = withRouter(connect(msp)(Protected));

