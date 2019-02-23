// @flow

/* global window */

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import type {GlobalStateType} from '../../../app/reducer';
import serviceStyle from '../../../../css/service.scss';
import type {SystemType} from '../../system/reducer/root';
import type {AuthType} from '../../auth/reducer';
import * as authApi from '../../auth/api';

import style from './style.scss';

type ReduxPropsType = {|
    // eslint-disable-next-line id-match
    +system: SystemType,
    +auth: AuthType,
|};

type ReduxActionType = {};

type PassedPropsType = {|
    // passedProp: string
|};

type StateType = {|
    +state: number,
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...ReduxPropsType, ...PassedPropsType}>;

class UserInfo extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        const view = this;

        view.state = {
            state: 0,
        };
    }

    state: StateType;
    props: PropsType;

    async logout() {
        await authApi.logout();

        window.location.reload();
    }

    handleLogOut = async () => {
        const view = this;

        await view.logout();
    };

    renderDesktop(): Node {
        const view = this;
        const {props} = view;
        const {auth} = props;

        return (
            <div className={style.user_info__desktop}>
                <button
                    className={style.logout_button}
                    onClick={view.handleLogOut}
                    onKeyPress={view.handleLogOut}
                    type="button"
                />
                <h5 className={style.user_name}>
                    <span className={serviceStyle.ellipsis}>
                        {/* <Locale stringKey="SPACE"/>*/}
                        {'Hello, '}
                        {auth.user.name}!
                    </span>
                </h5>
                <div className={style.user_avatar} style={{backgroundImage: `url('${auth.user.imageUrl}')`}}/>
            </div>
        );
    }

    renderMobile(): Node {
        const view = this;
        const {props} = view;
        const {auth} = props;

        return (
            <div className={style.user_info__mobile}>
                <button
                    className={style.logout_button}
                    onClick={view.handleLogOut}
                    onKeyPress={view.handleLogOut}
                    type="button"
                />
                <div className={style.user_avatar} style={{backgroundImage: `url('${auth.user.imageUrl}')`}}/>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return props.system.screen.isDesktop ? view.renderDesktop() : view.renderMobile();
    }
}

const ConnectedComponent = connect<ComponentType<UserInfo>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system,
        auth: state.auth,
    }),
    {}
)(UserInfo);

export {ConnectedComponent as UserInfo};
