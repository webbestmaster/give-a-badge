// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import type {ContextRouter} from 'react-router-dom';
import style from './style.scss';

type PassedPropsType = {|
    +passedProp: string
|};

type PropsType = {
    ...PassedPropsType,
    // eslint-disable-next-line id-match
    ...$Exact<ContextRouter>
};

type StateType = {|
    +state: number
|};

export default class MyReactComponent extends Component<PropsType, StateType> {
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
        return (
            <div>
                {'\u00A0'}
                {'\u2026'}
            </div>
        );
    }
}
