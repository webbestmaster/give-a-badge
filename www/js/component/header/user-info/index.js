// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app-reducer';
import style from './style.scss';

type ReduxPropsType = {|
    // eslint-disable-next-line id-match
    +system: $PropertyType<GlobalStateType, 'system'>
|};

type PassedPropsType = {|
    // passedProp: string
|};

type StateType = {|
    +state: number
|};

class UserInfo extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: $Exact<{...ReduxPropsType, ...PassedPropsType}>;
    state: StateType;

    constructor() {
        super();
        const view = this;

        view.state = {
            state: 0
        };
    }

    renderDesktop(): Node {
        const view = this;

        return (
            <div>
                <h3>photo</h3>
                <h3>name</h3>
                <h3>logout button</h3>
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
