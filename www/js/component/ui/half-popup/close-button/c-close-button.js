// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import withRouter from 'react-router-dom/withRouter';

import type {ContextRouterType} from '../../../../../type/react-router-dom-v4';
import {routes} from '../../../app/routes';

import style from './style.scss';

type PassedPropsType = {|
    // +passedProp: string
|};

type PropsType = {
    ...PassedPropsType,
    // eslint-disable-next-line id-match
    ...$Exact<ContextRouterType>,
};

type StateType = {|
    +state: number,
|};

class CloseButton extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    state: StateType;
    props: PropsType;

    onClick() {
        const view = this;
        const {props} = view;

        // move user to home page if user arrived from direct lint
        if (props.history.length > 2) {
            props.history.goBack();
            return;
        }

        props.history.push(routes.index.index);
    }

    handleOnClick = () => {
        const view = this;

        view.onClick();
    };

    render(): Node {
        const view = this;

        return (
            <button
                className={style.close_button__wrapper}
                onClick={view.handleOnClick}
                onKeyPress={view.handleOnClick}
                type="button"
            />
        );
    }
}

const ConnectedComponent = withRouter(CloseButton);

export {ConnectedComponent as CloseButton};
