// @flow

/* global window, fetch */

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {SetPopupStateType, SetUserType} from './action';
import {openLoginPopup, setUser} from './action';
import type {AuthType, UserType} from './reducer';
import type {GlobalStateType} from '../../app/reducer';
import {getMe} from './api';
import {LoadComponent} from '../../lib/c-load-component';
import {authConst} from './const';

type ReduxPropsType = {|
    +auth: AuthType,
|};

type ReduxActionType = {|
    +setUser: (userState: UserType) => SetUserType,
    +openLoginPopup: () => SetPopupStateType,
|};

type PassedPropsType = {||};

const reduxAction: ReduxActionType = {
    setUser,
    openLoginPopup,
};

type StateType = {};

type PropsType = $Exact<{...PassedPropsType, ...ReduxPropsType, ...ReduxActionType}>;

class Auth extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {};
    }

    async loginCheck(): Promise<void> {
        const view = this;
        const {props} = view;
        const {setUser: setUserAction, openLoginPopup: openLoginPopupAction} = props;

        const getMeResult = await getMe();

        if (getMeResult.hasError === true) {
            openLoginPopupAction();
            return;
        }

        setUserAction(getMeResult.userData);
    }

    async componentDidMount(): Promise<void> {
        const view = this;

        await view.loginCheck();
    }

    loadLoginPopup = async (): Promise<Node> => {
        const {LoginPopup} = await import('./popup/login/c-login-popup');

        return <LoginPopup/>;
    };

    render(): Array<Node> {
        const view = this;
        const {props} = view;
        const {auth} = props;
        const {isOpen: isLoginPopupOpen} = auth.popup[authConst.popupName.login];

        return [isLoginPopupOpen ? <LoadComponent key="login-popup" load={view.loadLoginPopup}/> : null];
    }
}

const ConnectedComponent = connect<ComponentType<Auth>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType): ReduxPropsType => ({
        auth: state.auth,
    }),
    reduxAction
)(Auth);

export {ConnectedComponent as Auth};
