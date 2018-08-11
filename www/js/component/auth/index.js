// @flow

/* global window, fetch */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {SetUserType, SetPopupStateType} from './action';
import {setUser, openLoginPopup} from './action';
import type {AuthType, UserType} from './reducer';
import type {GlobalStateType} from '../../app-reducer';
import LoginPopup from './popup/login';
import {isBoolean} from '../../lib/is';
import {getMe as apiGetMe} from './api';

type ReduxPropsType = {|
    +auth: AuthType
|};

type ReduxActionType = {|
    +setUser: (userState: UserType) => SetUserType,
    +openLoginPopup: () => SetPopupStateType
|};

type PassedPropsType = {||};

const reduxAction: ReduxActionType = {
    setUser,
    openLoginPopup
};

type StateType = null;

class Auth extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: $Exact<{...PassedPropsType, ...ReduxPropsType, ...ReduxActionType}>;
    state: StateType;

    async loginCheck(): Promise<void> {
        const view = this;
        const {props} = view;
        const {setUser: setUserAction, openLoginPopup: openLoginPopupAction} = props;

        const getMeResult = await apiGetMe();

        console.log('getMeResult:', getMeResult);

        if (getMeResult.hasError === true) {
            openLoginPopupAction();
        }
    }

    async componentDidMount(): Promise<void> {
        const view = this;

        await view.loginCheck();
    }

    render(): Array<Node> {
        return [<LoginPopup key="login-popup"/>];
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth
    }),
    reduxAction
)(Auth);
