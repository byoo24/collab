import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Home from './static/home';
import Signup from './static/signup';
import Login from './static/login';
import Dashboard from './dashboard/dashboard';


const App = () => {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/signup" component={Signup} />
            <AuthRoute exact path="/login" component={Login} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
    )
}


export default App;