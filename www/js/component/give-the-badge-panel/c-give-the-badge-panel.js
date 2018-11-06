// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import {HalfPopup} from '../ui/half-popup/c-half-popup';
import {HalfPopupHeader} from '../ui/half-popup/header/c-header';
import {Locale} from '../locale/c-locale';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';
import {isString} from '../../lib/is';
import {BadgeForm} from './badge-form/c-badge-form';
import {BadgeInfo} from './badge-info/c-badge-info';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {
    // +passedProp: string
};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        ...$Exact<ContextRouterType>,
        +children: Node,
    }>>;

type StateType = {|
    +state: number,
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class GiveTheBadgePanel extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;

        const badgeId = isString(props.match.params.badgeId) ? props.match.params.badgeId : null;

        console.log('badge id:', badgeId);
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        const badgeId = isString(props.match.params.badgeId) ? props.match.params.badgeId : null;

        if (badgeId === null) {
            console.error('badgeId is not defined, props', props);
            return null;
        }

        return (
            <HalfPopup>
                <HalfPopupHeader>
                    <Locale stringKey="GIVE_THE_BADGE__PEOPLE"/>
                </HalfPopupHeader>

                <BadgeInfo badgeId={badgeId}/>
                <BadgeForm badgeId={badgeId}/>
            </HalfPopup>
        );
    }
}

const ConnectedComponent = connect<ComponentType<GiveTheBadgePanel>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(GiveTheBadgePanel);

export {ConnectedComponent as GiveTheBadgePanel};
