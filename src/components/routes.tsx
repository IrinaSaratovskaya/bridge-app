import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact={true} path="/login" component={Login} />
                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path="*" component={Home} />
            </Switch>
        </div>
    )
}

export default Routes;