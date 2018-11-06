// @flow

/* eslint-disable react/jsx-no-bind */

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
    // eslint-disable-next-line id-match
    props: $Exact<{...ReduxPropsType, ...PassedPropsType}>;
    state: StateType;

    constructor() {
        super();
        const view = this;

        view.state = {
            isActive: false,
        };
    }

    renderDesktop(): Node {
        const view = this;

        return (
            <div>
                <input
                    key="input"
                    onFocus={(): void => view.setState({isActive: true})}
                    onBlur={(): void => view.setState({isActive: false})}
                    type="text"
                />
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
