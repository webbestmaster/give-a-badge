// @flow

import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {routes} from '../app/routes';
import type {GlobalStateType} from '../../app/reducer';

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    // A nice display name for this check
    wrapperDisplayName: 'UserIsAuthenticated',
    // The url to redirect user to if they fail
    redirectPath: (state: GlobalStateType, ownProps: mixed): string => {
        return locationHelper.getRedirectQueryParam(ownProps) || routes.login;
    },

    allowRedirectBack: true,
    // If selector is true, wrapper will not redirect
    // For example let's check that state contains user state
    authenticatedSelector: (state: GlobalStateType): boolean => state.auth.user.email !== null,
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // A nice display name for this check
    wrapperDisplayName: 'UserIsNotAuthenticated',
    // The url to redirect user to if they fail
    redirectPath: (state: GlobalStateType, ownProps: mixed): string => {
        const redirectPath = locationHelper.getRedirectQueryParam(ownProps);

        return redirectPath && redirectPath !== '/' ? redirectPath : `${routes.index.index}`; // or add your default path here
    },

    allowRedirectBack: false,
    // If selector is true, wrapper will not redirect
    // For example let's check that state contains user state
    authenticatedSelector: (state: GlobalStateType): boolean => state.auth.user.email === null,
});
