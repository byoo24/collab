import React from 'react';
import { Redirect, Route } from 'react-router-dom';

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
            loggedIn ? <Component {...props} {...rest} /> : <Redirect to="/" />
        )} />
);


export const CustomRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => <Component {...props} {...rest} />}
    />
);

