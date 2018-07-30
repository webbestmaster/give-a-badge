// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';

type PassedPropsType = {|
    passedProp: string
|};

type StateType = {|
    state: number
|};

export default class MyReactComponent extends Component<PassedPropsType, StateType> {
    props: PassedPropsType;
    state: StateType;

    constructor() {
        super();

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
