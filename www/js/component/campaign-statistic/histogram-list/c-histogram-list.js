// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
import style from './style.scss';

type PassedPropsType = {|
    // +passedProp: string
|};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    // ...$Exact<ContextRouterType>
    // +children: Node
}>;

type StateType = {|
    +state: number,
|};

export class HistogramList extends Component<PropsType, StateType> {
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
        return (
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est eveniet in perspiciatis reprehenderit
                sint. Aliquam deserunt dolores eos, impedit in libero necessitatibus numquam officia quidem saepe. Ex
                iure quaerat vel?
            </div>
        );
    }
}
