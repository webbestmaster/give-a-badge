// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import type {SystemType} from '../system/reducer';

type ReduxPropsType = {|
    system: SystemType
|};
type PassedPropsType = {||};
type StateType = {};

class Header extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: $Exact<{...ReduxPropsType, ...PassedPropsType}>;
    state: StateType;

    constructor() {
        super();

        const view = this;

        view.state = {};
    }

    renderDesktop(): Node {
        return <header className={style.header}>desktop</header>;
    }

    renderMobile(): Node {
        return <header className={style.header}>mobile</header>;
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        if (props.system.screen.isMobile) {
            return view.renderMobile();
        }

        return view.renderDesktop();
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system
    }),
    {}
)(Header);
