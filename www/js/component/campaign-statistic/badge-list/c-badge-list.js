// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
import style from './style.scss';
import type {DataType} from '../api';

type PassedPropsType = {|
    +badgeList: Array<DataType>,
|};

type PropsType = $Exact<{
    ...PassedPropsType,
}>;

type StateType = {|
    +selectedBadgeId: number | string,
|};

export class BadgeList extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            selectedBadgeId: 0,
        };
    }

    render(): Node {
        return <div>badge list</div>;
    }
}
