// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app/reducer';
import style from './style.scss';
import CloseButton from './close-button/c-close-button';
import type {OnSetIsScrollEnableType} from '../../system/action';
import {setIsScrollEnable} from '../../system/action';
import {isString} from '../../../lib/is';
import classNames from 'classnames';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    setIsScrollEnable: (isEnable: boolean, disableId: string) => OnSetIsScrollEnableType
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {
    +className?: {|
        +containerPosition?: string,
        +container?: string
    |}
    // +passedProp: string
};

// eslint-disable-next-line id-match
type PropsType = $Exact<{
    // eslint-disable-next-line id-match
    ...$Exact<PassedPropsType>,
    // eslint-disable-next-line id-match
    ...$Exact<ReduxPropsType>,
    // eslint-disable-next-line id-match
    ...$Exact<ReduxActionType>,
    children: Node | Array<Node>
}>;

type StateType = {
    +state: number,
    +disableScrollId: string
};

const reduxAction: ReduxActionType = {
    setIsScrollEnable
};

class HalfPopup extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
            disableScrollId: 'half-popup--' + Math.random()
        };
    }

    componentDidMount() {
        const view = this;
        const {state, props} = view;

        props.setIsScrollEnable(false, state.disableScrollId);
    }

    componentWillUnmount() {
        const view = this;
        const {state, props} = view;

        props.setIsScrollEnable(true, state.disableScrollId);
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        const containerPositionClassName =
            props.className && isString(props.className.containerPosition) ? props.className.containerPosition : '';
        const containerClassName =
            props.className && isString(props.className.container) ? props.className.container : '';

        return (
            <div className={style.half_popup__wrapper}>
                <div className={style.half_popup__fade}/>
                <div className={classNames(style.half_popup__set_container_position, containerPositionClassName)}>
                    <CloseButton/>
                    <div className={classNames(style.half_popup__container, containerClassName)}>{props.children}</div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(HalfPopup);
