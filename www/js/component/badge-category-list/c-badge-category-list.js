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

import type {BadgeCategoryListType} from './api';
import {getBadgeCategoryList} from './api';
import {BadgeCategoryListItem} from './item/c-item';

type ReduxPropsType = {};

type ReduxActionType = {};

type PassedPropsType = {};

type PropsType = {
    ...$Exact<ContextRouterType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    ...$Exact<PassedPropsType>,
    +children?: Array<Node>,
};

type StateType = {|
    +state: number,
    +badgeCategoryList: ?BadgeCategoryListType,
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeCategoryList extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
            badgeCategoryList: null,
        };
    }

    state: StateType;

    async componentDidMount() {
        const view = this;

        await view.fetchBadgeCategoryList();
    }

    props: PropsType;

    async fetchBadgeCategoryList(): Promise<BadgeCategoryListType | null> {
        const view = this;

        const badgeCategoryList = await getBadgeCategoryList();

        if (badgeCategoryList instanceof Error) {
            console.error('can not get badge category list');
            return null;
        }

        view.setState({badgeCategoryList});

        return badgeCategoryList;
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeCategoryList} = state;

        return (
            <HalfPopup closeOnClickBackground>
                <HalfPopupHeader>
                    <Locale stringKey="CATEGORY_LIST__CATEGORIES"/>
                </HalfPopupHeader>
                {badgeCategoryList ?
                    Object.keys(badgeCategoryList).map(
                        (key: string): Node => {
                            return (
                                <BadgeCategoryListItem categoryList={badgeCategoryList[key]} key={key} name={key}/>
                            );
                        }
                    ) :
                    null}
            </HalfPopup>
        );
    }
}

const ConnectedComponent = connect<ComponentType<BadgeCategoryList>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(BadgeCategoryList);

export {ConnectedComponent as BadgeCategoryList};
