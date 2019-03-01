// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import type {GlobalStateType} from '../../../../app/reducer';
import type {FoundedUserType} from '../api';
import {isString} from '../../../../lib/is';

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
    +isActive: boolean,
    +className?: string,
|};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    +children: Node,
}>;

type StateType = void;

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class FoundedUser extends Component<ReduxPropsType, PassedPropsType, StateType> {
    state: StateType;
    props: PropsType;

    handleClick = (evt: SyntheticEvent<EventTarget>) => {
        const view = this;
        const {props} = view;
        const {onClick} = props;

        evt.preventDefault();
        onClick();
    };

    render(): Node {
        const view = this;
        const {props} = view;
        const {foundedUser} = props;
        const {name, imageUrl} = foundedUser;
        const additionalClassName = isString(props.className) ? props.className : '';

        // <a/> with href="#/..." added for i11y only
        return (
            <a
                className={classNames(style.founded_user_wrapper, additionalClassName)}
                href="/#/add-user-in-result"
                onClick={view.handleClick}
                onKeyPress={view.handleClick}
                title={name}
            >
                <div className={style.founded_user_image} style={{backgroundImage: `url('${imageUrl}')`}}/>
                <div className={style.founded_user_name_wrapper}>
                    <div className={style.founded_user_name}>{name}</div>
                </div>
            </a>
        );
    }
}

const ConnectedComponent = connect<ComponentType<FoundedUser>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(FoundedUser);

export {ConnectedComponent as FoundedUser};
