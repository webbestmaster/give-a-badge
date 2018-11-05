// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import style from './style.scss';
import serviceStyle from '../../../css/service.scss';
import withRouter from 'react-router-dom/withRouter';
import Link from 'react-router-dom/Link';
import routes from '../app/routes';
import classNames from 'classnames';
// import Search from './search';
import UserInfo from './user-info/c-user-info';
import type {SystemType} from '../system/reducer/root';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';

type ReduxPropsType = {|
    +system: SystemType,
|};
type PassedPropsType = {};
type StateType = {};

// eslint-disable-next-line id-match
type PropsType = {...PassedPropsType, ...$Exact<ContextRouterType>, ...ReduxPropsType};

class Header extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;

    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {};
    }

    isButtonActive(): boolean {
        const view = this;
        const {props, state} = view;

        return routes.index.index !== props.location.pathname;
    }

    renderDesktop(): Node {
        const view = this;

        return (
            <header className={style.header}>
                <div className={serviceStyle.max_width}>
                    <Link
                        to={routes.index.badgeCategoryList}
                        className={classNames(style.give_a_badge, {
                            [style.give_a_badge__active]: view.isButtonActive(),
                        })}
                    >
                        Give
                        <div />A Badge
                    </Link>
                    <UserInfo />
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

export default withRouter(
    connect(
        (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
            system: state.system,
        }),
        {}
    )(Header)
);
