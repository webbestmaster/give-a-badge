// @flow

/* global window */

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import type {GlobalStateType} from '../../app/reducer';
import type {LocaleType} from '../locale/reducer';
import {localeNameReference} from '../locale/const';

import type {OnResizeType} from './action';
import {onResize} from './action';
import type {SystemType} from './reducer/root';
import style from './style.css';
import {screenNameReference} from './reducer/screen';
import {setIsGlobalScrollEnable} from './helper';

type ReduxPropsType = {|
    +system: SystemType,
    +locale: LocaleType,
|};

type ReduxActionType = {|
    +onResize: (width: number, height: number) => OnResizeType,
|};

const reduxAction: ReduxActionType = {
    onResize, // imported from actions
};

type PassedPropsType = {|
    +children: Node,
|};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    +children: Node,
}>;

type StateType = null;

class System extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = null;
    }

    state: StateType;

    componentDidMount() {
        const view = this;
        const {props, state} = view;

        window.addEventListener(
            'resize',
            () => {
                const {documentElement} = window.document;
                const width = documentElement.clientWidth;
                const height = documentElement.clientHeight;

                props.onResize(width, height);
            },
            false
        );
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        const view = this;
        const {props, state} = view;

        if (props.system.scroll.isEnable !== prevProps.system.scroll.isEnable) {
            setIsGlobalScrollEnable(props.system.scroll.isEnable);
        }
    }

    props: PropsType;

    getClassName(): string {
        const view = this;
        const {props, state} = view;

        const screenProps = props.system.screen;
        const littleThenList = screenProps.littleThen;
        const localeName = props.locale.name;

        return classNames({
            [style.landscape]: screenProps.isLandscape,
            [style.portrait]: screenProps.isPortrait,
            [style.desktop]: screenProps.isDesktop,
            [style.tablet]: screenProps.isTablet,
            [style.mobile]: screenProps.isMobile,
            [style.lt_desktop_width]: littleThenList.includes(screenNameReference.desktop),
            [style.lt_tablet_width]: littleThenList.includes(screenNameReference.tablet),
            [style.locale__en_us]: localeName === localeNameReference.enUs,
            [style.locale__ru_ru]: localeName === localeNameReference.ruRu,
            [style.locale__zh_ch]: localeName === localeNameReference.zhCN,
            [style.locale__zh_tw]: localeName === localeNameReference.zhTW,
        });
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return <div className={view.getClassName()}>{props.children}</div>;
    }
}

const ConnectedComponent = connect<ComponentType<System>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType): ReduxPropsType => ({
        system: state.system,
        locale: state.locale,
    }),
    reduxAction
)(System);

export {ConnectedComponent as System};
