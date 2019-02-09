// @flow

import type {Node} from 'react';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {muiTheme} from '../ui/mui-theme/mui-theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {System} from '../system/c-system';
import {Auth} from '../auth/c-auth';
import {GoogleAnalytics} from '../google-analytics/c-google-analytics';

import {Home} from '../../page/home/c-home';
import {routes} from './routes';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {ReduxStoreProvider} from '../../app/provider';
import {appConst} from '../../app/const';
import {userIsAuthenticated, userIsNotAuthenticated} from '../auth/auth-helper';
import {Login} from '../../page/login/c-login';

export function App(): Node {
    return (
        /* eslint-disable react/jsx-max-depth */
        <ReduxStoreProvider>
            <MuiThemeProvider theme={muiTheme}>
                <Auth key="auth"/>
                <System key="system">
                    <BrowserRouter>
                        <>
                            <GoogleAnalytics trackingId={appConst.analytic.google.trackingId} key="google-analytics"/>
                            <Switch>
                                <Route component={userIsNotAuthenticated(Login)} path={routes.login} exact/>
                                <Route component={userIsAuthenticated(Home)}/>
                            </Switch>
                        </>
                    </BrowserRouter>
                </System>
            </MuiThemeProvider>
        </ReduxStoreProvider>
        /* eslint-enable react/jsx-max-depth */
    );
}
