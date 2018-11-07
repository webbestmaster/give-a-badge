// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';
import {HalfPopup} from '../ui/half-popup/c-half-popup';
import {HalfPopupHeader} from '../ui/half-popup/header/c-header';
import {Locale} from '../locale/c-locale';

type ReduxPropsType = {|
    +reduxProp: boolean,
|};

type ReduxActionType = {};

const reduxAction: ReduxActionType = {};

type PassedPropsType = {};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        ...$Exact<ContextRouterType>,
        +children: Node,
    }>>;

type StateType = {|
    +state: number,
|};

class Statistic extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <HalfPopup closeOnClickBackground>
                <HalfPopupHeader>
                    <Locale stringKey="STATISTIC_LIST__STATISTIC"/>
                </HalfPopupHeader>

                <h1>Statistic is here</h1>
            </HalfPopup>
        );
    }
}

const ConnectedComponent = connect<ComponentType<Statistic>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        reduxProp: true,
    }),
    reduxAction
)(Statistic);

export {ConnectedComponent as Statistic};
