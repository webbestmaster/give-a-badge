// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';
import HalfPopup from '../ui/half-popup';
import HalfPopupHeader from '../ui/half-popup/header';
import Locale from '../locale';
import BadgeInfo from '../give-the-badge-panel/badge-info';
import BadgeForm from '../give-the-badge-panel/badge-form';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        ...$Exact<ContextRouterType>,
        +children: Node
    }>>;

type StateType = {
    // +state: number
};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeWon extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            // state: 0
        };
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <HalfPopup>
                <HalfPopupHeader>
                    <h1>badge name here</h1>
                </HalfPopupHeader>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </HalfPopup>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(BadgeWon);
