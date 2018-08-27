// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import type {ContextRouter} from 'react-router-dom';

type PassedPropsType = {
    // +passedProp: string
};

type PropsType = {
    ...PassedPropsType,
    // eslint-disable-next-line id-match
    ...$Exact<ContextRouter>
};

type StateType = {|
    +state: number
|};

export default class NotFound extends Component<PropsType, StateType> {
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
                <h1>You shall no path!</h1>
                <h2>404 - page not found</h2>
            </div>
        );
    }
}