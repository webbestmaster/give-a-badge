// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
// import style from './style.scss';

type PassedPropsType = {|
    +load: () => Promise<Node | Array<Node>>,
|};

type PropsType = {|
    ...PassedPropsType,
    // ...$Exact<ContextRouterType>
    // +children: Node,
|};

type StateType = {|
    +component: Node | Array<Node>,
|};

export class LoadComponent extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            component: null,
        };
    }

    async load(): Promise<void> {
        const view = this;
        const {props} = view;

        const loadComponentResult = await props.load();

        if (loadComponentResult instanceof Error) {
            console.error('can not load component');
            view.setState({component: <span>Error to load component</span>});
            return;
        }

        view.setState({component: loadComponentResult});
    }

    componentDidMount() {
        (async (): Promise<void> => {
            const view = this;

            await view.load();
        })();
    }

    render(): Node | Array<Node> {
        const view = this;
        const {state} = view;

        return state.component;
    }
}
