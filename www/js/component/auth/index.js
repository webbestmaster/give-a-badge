// @flow

/* global window, fetch */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {SetUserType} from './action';
import {setUser} from './action';
import type {AuthType, UserType} from './reducer';
import type {GlobalStateType} from '../../app-reducer';
import appConst from '../../app-const';

type ReduxPropsType = {|
    +auth: AuthType
|};

type ReduxActionType = {|
    +setUser: (userState: UserType) => SetUserType
|};

type PassedPropsType = {||};

type StateType = null;

class Auth extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: $Exact<{...PassedPropsType, ...ReduxPropsType, ...ReduxActionType}>;
    state: StateType;

    async getMe(): Promise<mixed> {
        return await fetch(appConst.api.url + appConst.api.getMe, {
            credentials: 'include',
            method: 'GET',
            mode: 'no-cors'
        }).then(
            (response: Response): Promise<mixed> => {
                if (response.ok) {
                    return response.json();
                }

                return Promise.resolve({hasError: true});
            }
        );
    }

    async componentDidMount(): Promise<void> {
        const view = this;
        const {props} = view;
        const {setUser: setUserAction} = props;

        const getMeResult = await view.getMe();

        console.log('getMeResult:', getMeResult);

        setUserAction({id: 'default-user-id'});
    }

    render(): Node {
        return null;
    }
}

const reduxAction: ReduxActionType = {
    setUser
};

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth
    }),
    reduxAction
)(Auth);
