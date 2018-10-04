// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import BadgeCategoryListItem from './item/c-item';
import HalfPopup from '../ui/half-popup/c-half-popup';
import HalfPopupHeader from '../ui/half-popup/header/c-header';
import type {BadgeCategoryListType} from './api';
import {getBadgeCategoryList} from './api';
// import type {ExtractedCategoryType} from './helper';
// import {extractCategoryList} from './helper';
import Locale from '../locale/c-locale';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';

type ReduxPropsType = {};

type ReduxActionType = {};

type PassedPropsType = {};

type PropsType = $ReadOnly<{
    ...$Exact<ContextRouterType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    ...$Exact<PassedPropsType>,
    +children?: Array<Node>
}>;

type StateType = {|
    +state: number,
    +badgeCategoryList: ?BadgeCategoryListType
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeCategoryList extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
            badgeCategoryList: null
        };
    }

    async fetchBadgeCategoryList(): Promise<BadgeCategoryListType | null> {
        const view = this;

        const badgeCategoryList = await getBadgeCategoryList();

        if (badgeCategoryList === null) {
            console.error('can not get badge category list');
            return null;
        }

        view.setState({badgeCategoryList});

        return badgeCategoryList;
    }

    async componentDidMount(): Promise<void> {
        const view = this;

        await view.fetchBadgeCategoryList();
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeCategoryList} = state;

        return (
            <HalfPopup>
                <HalfPopupHeader>
                    <Locale stringKey="CATEGORY_LIST__CATEGORIES"/>
                </HalfPopupHeader>
                {badgeCategoryList ?
                    Object.keys(badgeCategoryList).map(
                        (key: string): Node => {
                            return (
                                <BadgeCategoryListItem key={key} name={key} categoryList={badgeCategoryList[key]}/>
                            );
                        }
                    ) :
                    null}
            </HalfPopup>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(BadgeCategoryList);
