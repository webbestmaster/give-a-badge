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
import type {BadgeType} from '../badge-category-list/api';
import {getBadgeCategoryList} from '../badge-category-list/api';
import {routes} from '../app/routes';

import {BadgeInfo} from './badge-info/c-badge-info';
import {BadgeForm} from './badge-form/c-badge-form';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {
    // +passedProp: string
};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    ...$Exact<ContextRouterType>,
    +children: Node,
}>;

type StateType = {|
    +badgeInfo: BadgeType | null,
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class GiveTheBadgePanel extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            badgeInfo: null,
        };
    }

    state: StateType;

    async componentDidMount() {
        const view = this;
        const {props, state} = view;

        const badgeId = isString(props.match.params.badgeId) ? props.match.params.badgeId : null;

        console.log('badge id:', badgeId);

        await view.fetchBadgeInfo();
    }

    props: PropsType;

    async fetchBadgeInfo(): Promise<BadgeType | null> {
        const view = this;
        const {props, state} = view;
        const badgeId = isString(props.match.params.badgeId) ? props.match.params.badgeId : null;

        const badgeCategoryList = await getBadgeCategoryList();

        if (badgeCategoryList instanceof Error) {
            console.error('can not get getBadgeCategoryList', badgeCategoryList);
            return null;
        }

        const allBadgeList = [];

        Object.keys(badgeCategoryList).forEach((key: string) => {
            allBadgeList.push(...badgeCategoryList[key]);
        });

        const badgeInfo
            = allBadgeList.find(
                (badgeCategoryInList: BadgeType): boolean => String(badgeCategoryInList.id) === badgeId
            ) || null;

        if (badgeInfo === null) {
            console.error('can not find badgeInfo');
            console.error('move to home page');
            props.history.push(routes.index.index);
            return null;
        }

        view.setState({badgeInfo});

        return badgeInfo;
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeInfo} = state;

        const badgeId = isString(props.match.params.badgeId) ? props.match.params.badgeId : null;

        if (badgeId === null) {
            console.error('badgeId is not defined, props', props);
            return null;
        }

        if (badgeInfo === null) {
            return (
                <HalfPopup key="popup">
                    <HalfPopupHeader key="header">
                        <Locale stringKey="GIVE_THE_BADGE__PEOPLE"/>
                    </HalfPopupHeader>
                </HalfPopup>
            );
        }

        return (
            <HalfPopup key="popup">
                <HalfPopupHeader key="header">
                    <Locale stringKey="GIVE_THE_BADGE__PEOPLE"/>
                </HalfPopupHeader>

                <BadgeInfo badgeInfo={badgeInfo}/>
                <BadgeForm badgeInfo={badgeInfo}/>
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
