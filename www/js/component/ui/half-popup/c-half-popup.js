// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import withRouter from 'react-router-dom/withRouter';

import type {GlobalStateType} from '../../../app/reducer';
import type {OnSetIsScrollEnableType} from '../../system/action';
import {setIsScrollEnable} from '../../system/action';
import {isString} from '../../../lib/is';
import type {ContextRouterType} from '../../../../type/react-router-dom-v4';

import errorImage from './i/error.svg';
import {CloseButton} from './close-button/c-close-button';
import style from './style.scss';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    setIsScrollEnable: (isEnable: boolean, disableId: string) => OnSetIsScrollEnableType,
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {
    +className?: {|
        +containerPosition?: string,
        +container?: string,
    |},
    +closeOnClickBackground?: boolean,
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
    ...$Exact<ContextRouterType>,
    children: Node | Array<Node>,
}>;

type StateType = {
    +disableScrollId: string,
    +error: Error | null,
};

const reduxAction: ReduxActionType = {
    setIsScrollEnable,
};

class HalfPopup extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            disableScrollId: 'half-popup--' + Math.random(),
            error: null,
        };
    }

    state: StateType;

    componentDidMount() {
        const view = this;
        const {state, props} = view;

        props.setIsScrollEnable(false, state.disableScrollId);
    }

    componentDidCatch(error: Error, info: mixed) {
        const view = this;

        view.setState({error});
    }

    componentWillUnmount() {
        const view = this;
        const {state, props} = view;

        props.setIsScrollEnable(true, state.disableScrollId);
    }

    props: PropsType;

    renderContent(): Node {
        const view = this;
        const {props, state} = view;
        const {error} = state;

        const containerClassName
            = props.className && isString(props.className.container) ? props.className.container : '';

        if (error instanceof Error) {
            return (
                <div className={style.half_popup__container}>
                    <img alt="error" className={style.error_image} src={errorImage}/>
                    <p className={style.error_text}>{error.message}</p>
                </div>
            );
        }

        return <div className={classNames(style.half_popup__container, containerClassName)}>{props.children}</div>;
    }

    handleOnClickBackground = (evt: SyntheticEvent<HTMLDivElement>) => {
        // eslint-disable-next-line no-invalid-this
        const view = this;
        const {props} = view;
        const {closeOnClickBackground, history} = props;

        if (evt.currentTarget !== evt.target || closeOnClickBackground !== true) {
            return;
        }

        history.goBack();
    };

    render(): Node {
        const view = this;
        const {props} = view;

        const containerPositionClassName
            = props.className && isString(props.className.containerPosition) ? props.className.containerPosition : '';

        /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        return (
            <div className={style.half_popup__wrapper}>
                <div className={style.half_popup__fade}/>
                <div
                    className={classNames(style.half_popup__set_container_position, containerPositionClassName)}
                    onClick={view.handleOnClickBackground}
                >
                    <CloseButton/>
                    {view.renderContent()}
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    }
}

const ConnectedComponent = connect<ComponentType<HalfPopup>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(withRouter(HalfPopup));

export {ConnectedComponent as HalfPopup};
