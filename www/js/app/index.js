// @flow

import type {Node} from 'react';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import System from '../component/system';
import Auth from '../component/auth';

import Home from '../page/home';
import routes from './routes';
import BrowserRouter from 'react-router-dom/BrowserRouter';

export default function App(): Array<Node> {
    return [
        <Auth key="auth"/>,
        <System key="system"/>,
        <BrowserRouter key="router">
            <Switch>
                <Route component={Home} path={routes.index} exact/>
            </Switch>
        </BrowserRouter>
    ];
}
