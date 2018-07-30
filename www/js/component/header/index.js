// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import serviceStyle from '../../../css/service.scss';
// import Search from './search';
import UserInfo from './user-info';

type ReduxPropsType = {|
    // eslint-disable-next-line id-match
    +system: $PropertyType<GlobalStateType, 'system'>
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
        return (
            <header className={style.header}>
                <div className={serviceStyle.max_width}>
                    <div className={style.give_a_badge}>
                        Give
                        <div/>A Badge
                    </div>
                    <UserInfo/>
                </div>
            </header>
        );
    }

    renderMobile(): Node {
        const view = this;

        return view.renderDesktop();
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
