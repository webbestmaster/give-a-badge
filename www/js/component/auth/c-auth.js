// @flow

/* global window, fetch */

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import type {GlobalStateType} from '../../app/reducer';
import {LoadComponent} from '../../lib/c-load-component';
import {Spinner} from '../ui/spinner/c-spinner';

import type {SetPopupStateType, SetUserType} from './action';
import {openLoginPopup, setUser} from './action';
import type {AuthType, UserType} from './reducer';
import {getMe} from './api';
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
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {};
    }

    state: StateType;

    async componentDidMount() {
        const view = this;

        await view.loginCheck();
    }

    props: PropsType;

    async loginCheck() {
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

    loadLoginPopup = async (): Promise<Node> => {
        const {LoginPopup} = await import('./popup/login/c-login-popup');

        return <LoginPopup/>;
    };

    renderLoginPopup(): Node {
        const view = this;
        const {props} = view;
        const {auth} = props;
        const {isOpen: isLoginPopupOpen} = auth.popup[authConst.popupName.login];

        if (isLoginPopupOpen === false) {
            return null;
        }

        return (
            <LoadComponent key="login-popup" load={view.loadLoginPopup}>
                <Spinner isFullSize/>
            </LoadComponent>
        );
    }

    render(): Array<Node> {
        const view = this;

        return [view.renderLoginPopup()];
    }
}

const ConnectedComponent = connect<ComponentType<Auth>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType): ReduxPropsType => ({
        auth: state.auth,
    }),
    reduxAction
)(Auth);

export {ConnectedComponent as Auth};
