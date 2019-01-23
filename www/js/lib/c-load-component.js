// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';

type PassedPropsType = {|
    +load: () => Promise<Node | Array<Node>>,
|};

type PropsType = {|
    ...PassedPropsType,
    +children?: Node | Array<Node>,
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

    async load() {
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

    async componentDidMount() {
        const view = this;

        await view.load();
    }

    render(): Node | Array<Node> {
        const view = this;
        const {state, props} = view;

        if (state.component !== null) {
            return state.component;
        }

        if (typeof props.children !== 'undefined') {
            return props.children;
        }

        return null;
    }
}
