// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../../app/app-reducer';
import type {FoundedUserType} from '../api';
import style from './style.scss';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    +foundedUser: FoundedUserType,
    +onClick: () => void,
    +isActive: boolean
|};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        +children: Node
    }>>;

type StateType = {
    // +state: number
};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class FoundedUser extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            // state: 0
        };
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {foundedUser, onClick, isActive} = props;
        const {name, imageUrl} = foundedUser;

        return (
            <button type="button" onClick={onClick} onKeyPress={onClick}>
                <h1>is in selected: {isActive ? 'y' : 'n'}</h1>
                <img src={imageUrl} alt={name}/>
                <h1>{name}</h1>
                <hr/>
            </button>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(FoundedUser);
