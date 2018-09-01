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
import NotFound from '../component/not-found';

export default function App(): Array<Node> {
    return [
        <Auth key="auth"/>,
        <System key="system">
            <BrowserRouter>
                <Switch>
                    <Route component={Home} path={routes.index.index} exact/>
                    <Route component={Home} path={routes.index.badgeCategoryList} exact/>
                    <Route component={Home} path={routes.index.giveTheBadge} exact/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </System>
    ];
}
