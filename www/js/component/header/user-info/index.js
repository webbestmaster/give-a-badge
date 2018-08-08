// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app-reducer';
import style from './style.scss';
import type {SystemType} from '../../system/reducer';

type ReduxPropsType = {|
    // eslint-disable-next-line id-match
    +system: SystemType
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

    renderDesktop(): Node {
        const view = this;

        return (
            <div className={style.user_info__desktop}>
                <div className={style.logout_button}/>
                <h5 className={style.user_name}>Hello, Michael!</h5>
                <img className={style.user_avatar} src="http://via.placeholder.com/50x50" alt=""/>
            </div>
        );
    }

    renderMobile(): Node {
        const view = this;

        return view.renderDesktop();
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return props.system.screen.isDesktop ? view.renderDesktop() : view.renderMobile();
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system
    }),
    {}
)(UserInfo);
