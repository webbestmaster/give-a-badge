// @flow

import type {Node} from 'react';
import React, {Fragment} from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import muiTheme from '../ui/mui-theme/mui-theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import System from '../system/c-system';
import Auth from '../auth/c-auth';
import GoogleAnalytics from '../google-analytics/c-google-analytics';

import Home from '../../page/home/c-home';
import routes from './routes';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import NotFound from '../not-found/c-not-found';
import ReduxStoreProvider from '../../app/provider';
import appConst from '../../app/const';

export default function App(): Node {
    return (
        /* eslint-disable react/jsx-max-depth */
        <ReduxStoreProvider>
            <MuiThemeProvider theme={muiTheme}>
                <Auth key="auth" />
                <System key="system">
                    <BrowserRouter>
                        <Fragment>
                            <GoogleAnalytics trackingId={appConst.analytic.google.trackingId} key="google-analytics" />
                            <Switch>
                                <Route component={Home} path={routes.index.index} exact />
                                <Route component={Home} path={routes.index.badgeCategoryList} exact />
                                <Route component={Home} path={routes.index.giveTheBadge} exact />
                                <Route component={Home} path={routes.index.badgeWon} exact />
                                <Route component={NotFound} />
                            </Switch>
                        </Fragment>
                    </BrowserRouter>
                </System>
            </MuiThemeProvider>
        </ReduxStoreProvider>
        /* eslint-enable react/jsx-max-depth */
    );
}
