// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app-reducer';
import style from './style.scss';
import CloseButton from './close-button';
import {setIsScrollEnable} from '../../system/action';
import type {OnSetIsScrollEnableType} from '../../system/action';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    setIsScrollEnable: (isEnable: boolean, disableId: string) => OnSetIsScrollEnableType
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {
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

        return (
            <div className={style.half_popup__wrapper}>
                <div className={style.half_popup__fade}/>
                <div className={style.half_popup__set_container_position}>
                    <CloseButton/>
                    <div className={style.half_popup__container}>{props.children}</div>
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
