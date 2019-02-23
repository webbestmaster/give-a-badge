// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import type {GlobalStateType} from '../../../app/reducer';
import type {SystemType} from '../../system/reducer/root';

type ReduxPropsType = {|
    +system: SystemType,
|};

type ReduxActionType = {};

type PassedPropsType = {|
    // passedProp: string
|};

type StateType = {|
    isActive: boolean,
|};

class Search extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor() {
        super();
        const view = this;

        view.state = {
            isActive: false,
        };
    }

    state: StateType;
    props: $Exact<{...ReduxPropsType, ...PassedPropsType}>;

    handleInputFocus = () => {
        const view = this;

        view.setState({isActive: true});
    };

    handleInputBlur = () => {
        const view = this;

        view.setState({isActive: false});
    };

    renderDesktop(): Node {
        const view = this;

        return (
            <div>
                <input key="input" onBlur={view.handleInputBlur} onFocus={view.handleInputFocus} type="text"/>
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

const ConnectedComponent = connect<ComponentType<Search>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system,
    }),
    {}
)(Search);

export {ConnectedComponent as Search};
