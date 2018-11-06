// @flow

/* global window, fetch */

/* eslint consistent-this: ["error", "view"] */

import type {Node, ComponentType} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {SetPopupStateType, SetUserType} from './action';
import {openLoginPopup, setUser} from './action';
import type {AuthType, UserType} from './reducer';
import type {GlobalStateType} from '../../app/reducer';
import {getMe} from './api';

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

type StateType = {|
    +isAllPopupLoaded: boolean,
|};

type PropsType = $Exact<{...PassedPropsType, ...ReduxPropsType, ...ReduxActionType}>;

type PopupStoreType = {|
    LoginPopup: null | Component,
|};

const popupStore: PopupStoreType = {
    LoginPopup: null,
};

class Auth extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            isAllPopupLoaded: false,
        };
    }

    async loadAllPopup(): Promise<void> {
        const view = this;
        const {state} = view;

        if (state.isAllPopupLoaded) {
            return;
        }

        const {LoginPopup} = await import('./popup/login/c-login-popup');

        popupStore.LoginPopup = LoginPopup;

        view.setState({isAllPopupLoaded: true});
    }

    async loginCheck(): Promise<void> {
        const view = this;
        const {props} = view;
        const {setUser: setUserAction, openLoginPopup: openLoginPopupAction} = props;

        const getMeResult = await getMe();

        if (getMeResult.hasError === true) {
            await view.loadAllPopup();
            openLoginPopupAction();
            return;
        }

        setUserAction(getMeResult.userData);
    }

    async componentDidMount(): Promise<void> {
        const view = this;

        await view.loginCheck();
    }

    render(): Array<Node> {
        const view = this;
        const {state} = view;

        if (state.isAllPopupLoaded === false) {
            return [null];
        }

        const componentList = [];

        const {LoginPopup} = popupStore;

        if (LoginPopup !== null) {
            componentList.push(<LoginPopup key="login-popup"/>);
        }

        return componentList;
    }
}

const ConnectedComponent = connect<ComponentType<Auth>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType): ReduxPropsType => ({
        auth: state.auth,
    }),
    reduxAction
)(Auth);

export {ConnectedComponent as Auth};
