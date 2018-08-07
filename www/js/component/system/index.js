// @flow

/* global window */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {OnResizeType} from './action';
import {onResize} from './action';
import type {GlobalStateType} from '../../app-reducer';
import type {SystemType} from './reducer';
import classnames from 'classnames';
import style from './style.css';
import {screenNameReference} from './reducer/screen';
import type {LocaleType} from '../locale/reducer';
import {localeNameReference} from '../locale/const';

type ReduxPropsType = {|
    +system: SystemType,
    +locale: LocaleType
|};

type ReduxActionType = {|
    +onResize: (width: number, height: number) => OnResizeType
|};

const reduxAction: ReduxActionType = {
    onResize // imported from actions
};

type PassedPropsType = {|
    // +passedProp: string
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...PassedPropsType, ...ReduxPropsType, ...ReduxActionType, +children: Node}>;

type StateType = null;

class System extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = null;
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;

        window.addEventListener(
            'resize',
            () => {
                const {documentElement} = window.document;
                const width: number = documentElement.clientWidth;
                const height: number = documentElement.clientHeight;

                props.onResize(width, height);
            },
            false
        );
    }

    getClassName(): string {
        const view = this;
        const {props, state} = view;

        const screenProps = props.system.screen;
        const littleThenList = screenProps.littleThen;
        const localeName = props.locale.name;

        return classnames({
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
            [style.locale__zh_tw]: localeName === localeNameReference.zhTW
        });
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return <div className={view.getClassName()}>{props.children}</div>;
    }
}

export default connect(
    (state: GlobalStateType): ReduxPropsType => ({
        system: state.system,
        locale: state.locale
    }),
    reduxAction
)(System);
