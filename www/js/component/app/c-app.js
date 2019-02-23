// @flow

import type {Node} from 'react';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import {Home} from '../../page/home/c-home';
import {GoogleAnalytics} from '../google-analytics/c-google-analytics';
import {Auth} from '../auth/c-auth';
import {System} from '../system/c-system';
import {muiTheme} from '../ui/mui-theme/mui-theme';
import {ReduxStoreProvider} from '../../app/provider';
import {appConst} from '../../app/const';
import {userIsAuthenticated, userIsNotAuthenticated} from '../auth/auth-helper';
import {Login} from '../../page/login/c-login';
import {Notification} from '../ui/notification/c-notification';
import {defaultShowEventName} from '../ui/notification/action';

import {routes} from './routes';

export function App(): Node {
    return (
        /* eslint-disable react/jsx-max-depth */
        <ReduxStoreProvider>
            <MuiThemeProvider theme={muiTheme}>
                <Notification eventName={defaultShowEventName}/>
                <Auth key="auth"/>
                <System key="system">
                    <BrowserRouter>
                        <>
                            <GoogleAnalytics key="google-analytics" trackingId={appConst.analytic.google.trackingId}/>
                            <Switch>
                                <Route component={userIsNotAuthenticated(Login)} exact path={routes.login}/>
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
