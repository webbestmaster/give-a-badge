// @flow

import type {Node} from 'react';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import System from './../component/system';
import Auth from './../component/auth';

import Home from './../page/home';
import routes from './routes';

export default function App(): Node[] {
    return [
        <Auth key="auth"/>,
        <System key="system"/>,
        <Switch key="switch">
            <Route component={Home} path={routes.index} exact/>
        </Switch>
    ];
}
