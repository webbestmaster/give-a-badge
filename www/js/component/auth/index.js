// @flow

/* global window */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from './../../app-reducer';

type PropsType = {||};

type StateType = {||};

class Auth extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    render(): Node {
        return null;
    }
}

export default connect(
    (state: GlobalStateType): {} => ({
        // auth: state.auth
    }),
    {}
)(Auth);
