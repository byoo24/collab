import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Home from './static/home';
import Dashboard from './dashboard/dashboard';


const App = () => {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
    )
}


export default App;