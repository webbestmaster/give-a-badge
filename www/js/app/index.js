// @flow

import type {Node} from 'react';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Home from './../page/home';
import routes from './routes';

export default function App(): Node {
    return (
        <Switch key="switch">
            <Route component={Home} path={routes.index} exact/>
        </Switch>
    );
}
