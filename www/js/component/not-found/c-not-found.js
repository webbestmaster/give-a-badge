// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';

import type {ContextRouterType} from '../../../type/react-router-dom-v4';

type PassedPropsType = {
    // +passedProp: string
};

type PropsType = {
    ...PassedPropsType,
    // eslint-disable-next-line id-match
    ...$Exact<ContextRouterType>,
};

type StateType = {|
    +state: number,
|};

export class NotFound extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    state: StateType;
    props: PropsType;

    render(): Node {
        return (
            <div>
                <h1>You shall no path!</h1>
                <h2>404 - page not found</h2>
            </div>
        );
    }
}
