// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';

type ReduxPropsType = {|
    +reduxProp: boolean
|};

type PassedPropsType = {|
    // +passedProp: string
|};

type StateType = {|
    +state: number
|};

class TitleCard extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: $Exact<{...ReduxPropsType, ...PassedPropsType}>;
    state: StateType;

    constructor() {
        super();

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
                <h1>title card</h1>
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        reduxProp: true
    }),
    {}
)(TitleCard);
