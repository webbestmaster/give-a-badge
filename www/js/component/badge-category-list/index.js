// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import HalfPopup from '../half-popup';
import type {ContextRouter} from 'react-router-dom';

type ReduxPropsType = {};

type ReduxActionType = {};

type PassedPropsType = {};

// eslint-disable-next-line id-match
type PropsType = $ReadOnly<{
    // eslint-disable-next-line id-match
    ...$Exact<ContextRouter>,
    +children?: Array<Node>,
    ...ReduxPropsType,
    ...ReduxActionType,
    ...PassedPropsType
}>;

type StateType = {|
    +state: number
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeCategoryList extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0
        };
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div>
                <HalfPopup>
                    <h1>badge category</h1>
                </HalfPopup>
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(BadgeCategoryList);
