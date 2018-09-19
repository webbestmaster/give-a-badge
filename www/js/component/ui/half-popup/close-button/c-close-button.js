// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import type {ContextRouterType} from '../../../../../type/react-router-dom-v4';
import withRouter from 'react-router-dom/withRouter';
import style from './style.scss';

type PassedPropsType = {|
    // +passedProp: string
|};

type PropsType = {
    ...PassedPropsType,
    // eslint-disable-next-line id-match
    ...$Exact<ContextRouterType>
};

type StateType = {|
    +state: number
|};

class CloseButton extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0
        };
    }

    onClick() {
        const view = this;
        const {props} = view;

        props.history.goBack();
    }

    render(): Node {
        const view = this;

        return (
            <button
                type="button"
                onKeyPress={(): void => view.onClick()}
                onClick={(): void => view.onClick()}
                className={style.close_button__wrapper}
            />
        );
    }
}

export default withRouter(CloseButton);
