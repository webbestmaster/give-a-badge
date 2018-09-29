// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import type {GlobalStateType} from '../../../../app/reducer';
import type {FoundedUserType} from '../api';
import style from './style.scss';
import {isString} from '../../../../lib/is';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    +foundedUser: FoundedUserType,
    +onClick: () => void,
    +isActive: boolean,
    +className?: string
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
        const additionalClassName = isString(props.className) ? props.className : '';

        // <a/> with href="#/..." added for i11y only
        return (
            <a
                href="/#/add-user-in-result"
                className={classNames(style.founded_user_wrapper, additionalClassName)}
                onClick={(evt: SyntheticEvent<EventTarget>) => {
                    evt.preventDefault();
                    onClick();
                }}
                onKeyPress={(evt: SyntheticEvent<EventTarget>) => {
                    evt.preventDefault();
                    onClick();
                }}
            >
                {/*
                    <h5>is in selected: {isActive ? 'y' : 'n'}</h5>
                    */}
                <div
                    className={style.founded_user_image}
                    style={{backgroundImage: `url('${imageUrl}')`}}
                    title={name}
                />
                <div className={style.founded_user_name_wrapper}>
                    <div className={style.founded_user_name}>{name}</div>
                </div>
            </a>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(FoundedUser);
