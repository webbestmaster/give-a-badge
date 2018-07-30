// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app-reducer';
import style from './style.scss';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import type {AuthType} from './../reducer';

type ReduxPropsType = {|
    // eslint-disable-next-line id-match
    +auth: $PropertyType<GlobalStateType, 'auth'>
|};

type PassedPropsType = {|
    +isOpen: boolean
|};

type StateType = {};

class Login extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: $Exact<{...ReduxPropsType, ...PassedPropsType}>;
    state: StateType;

    constructor() {
        super();

        const view = this;

        view.state = {};
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <Dialog
                open={props.isOpen}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form action="#">
                    <TextField autoComplete="username" label="%Login%" type="text" margin="normal"/>
                    <TextField autoComplete="current-password" label="%Password%" type="password" margin="normal"/>
                    <Button>Login</Button>
                </form>
            </Dialog>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth
    }),
    {}
)(Login);
