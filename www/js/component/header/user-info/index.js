// @flow

/* global window */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app-reducer';
import style from './style.scss';
import serviceStyle from '../../../../css/service.scss';
import type {SystemType} from '../../system/reducer';
import type {AuthType} from '../../auth/reducer';
import Locale from '../../locale';
import * as authApi from '../../auth/api';

type ReduxPropsType = {|
    // eslint-disable-next-line id-match
    +system: SystemType,
    +auth: AuthType
|};

type PassedPropsType = {|
    // passedProp: string
|};

type StateType = {|
    +state: number
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...ReduxPropsType, ...PassedPropsType}>;

class UserInfo extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);
        const view = this;

        view.state = {
            state: 0
        };
    }

    async logout(): Promise<void> {
        await authApi.logout();
        window.location.reload();
    }

    renderDesktop(): Node {
        const view = this;
        const {props} = view;
        const {auth} = props;

        return (
            <div className={style.user_info__desktop}>
                <div className={style.logout_button} onClick={async (): Promise<void> => await view.logout()}/>
                <h5 className={style.user_name}>
                    <span className={serviceStyle.ellipsis}>
                        {/* <Locale stringKey="SPACE"/>*/}
                        {'Hello, '}
                        {auth.user.name}!
                    </span>
                </h5>
                <img className={style.user_avatar} src={auth.user.imageUrl} alt=""/>
            </div>
        );
    }

    renderMobile(): Node {
        const view = this;
        const {props} = view;
        const {auth} = props;

        return (
            <div className={style.user_info__mobile}>
                <div className={style.logout_button} onClick={async (): Promise<void> => await view.logout()}/>
                <img className={style.user_avatar} src={auth.user.imageUrl} alt=""/>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return props.system.screen.isDesktop ? view.renderDesktop() : view.renderMobile();
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system,
        auth: state.auth
    }),
    {}
)(UserInfo);
