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
type PassedPropsType = {};
type StateType = {};

class Header extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: ReduxPropsType & PassedPropsType;
    state: StateType;

    constructor() {
        super();

        const view = this;

        view.state = {};
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <header className={style.header}>
                the header {props.system.screen.name}
                {'\u00A0'}
                {'\u2026'}
            </header>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system
    }),
    {}
)(Header);
