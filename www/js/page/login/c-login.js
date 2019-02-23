// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import withRouter from 'react-router-dom/withRouter';
import {connect} from 'react-redux';

import type {GlobalStateType} from '../../app/reducer';
import type {SystemType} from '../../component/system/reducer/root';
import type {AuthType} from '../../component/auth/reducer';

type ReduxPropsType = {|
    +system: SystemType,
    +auth: AuthType,
|};

type ReduxActionType = {};
type PassedPropsType = {};
type StateType = null;

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    +children: Node,
}>;

// eslint-disable-next-line react/prefer-stateless-function
class Login extends Component<ReduxPropsType, PassedPropsType, StateType> {
    state: StateType;
    props: PropsType;

    render(): Node {
        return null;
    }
}

const ConnectedComponent = withRouter(
    connect(
        (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
            system: state.system,
            auth: state.auth,
        }),
        {}
    )(Login)
);

export {ConnectedComponent as Login};
