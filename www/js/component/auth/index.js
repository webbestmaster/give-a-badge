// @flow

/* global window */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import Login from './popup/login';

type ReduxPropsType = {|
    // eslint-disable-next-line id-match
    +auth: $PropertyType<GlobalStateType, 'auth'>
|};

type PassedPropsType = {|
    // passedProp: string
|};

type StateType = {|
    +state: number
|};

class Auth extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: $Exact<{...ReduxPropsType, ...PassedPropsType}>;

    state: StateType;

    render(): Array<Node> {
        const view = this;
        const {props} = view;

        return [<Login key="login" isOpen={props.auth.popup.login.isOpen}/>];
    }
}

export default connect(
    (state: GlobalStateType): {} => ({
        auth: state.auth
    }),
    {}
)(Auth);
