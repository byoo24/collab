import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Home from './static/home';
import Signup from './static/signup';
import Login from './static/login';
import Dashboard from './dashboard/dashboard';
import { isEmpty } from '../libs/helper_methods';


const App = ({loggedIn}) => {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/signup" loggedIn={loggedIn} component={Signup} />
            <AuthRoute exact path="/login" loggedIn={loggedIn} component={Login} />
            <ProtectedRoute path="/dashboard" loggedIn={loggedIn} component={Dashboard} />
        </Switch>
    )
}



const msp = state => ({
    loggedIn: !isEmpty(state.session),
})

export default withRouter(connect(msp)(App));