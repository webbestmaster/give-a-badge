// @flow
/* global window */

import React from 'react';
import {render} from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import muiTheme from './component/ui/mui-theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import App from './app';

import * as reducers from './app-reducer';

const reducer = combineReducers({
    ...reducers
});

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

/* eslint-disable react/jsx-max-depth */
render(
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    window.document.querySelector('.js-app-wrapper')
);
/* eslint-enable react/jsx-max-depth */
