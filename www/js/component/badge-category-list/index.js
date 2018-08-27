// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import BadgeCategoryListItem from './item';
import HalfPopup from '../ui/half-popup';
import HalfPopupHeader from '../ui/half-popup/header';
import type {ContextRouter} from 'react-router-dom';
import {getBadgeCategoryList} from './api';
import type {BadgeCategoryListType, BadgeCategoryType} from './api';
import {extractCategoryList} from './helper';
import type {ExtractedCategoryType} from './helper';
import Locale from '../locale';

type ReduxPropsType = {};

type ReduxActionType = {};

type PassedPropsType = {};

// eslint-disable-next-line id-match
type PropsType = $ReadOnly<{
    // eslint-disable-next-line id-match
    ...$Exact<ContextRouter>,
    // eslint-disable-next-line id-match
    ...$Exact<ReduxPropsType>,
    // eslint-disable-next-line id-match
    ...$Exact<ReduxActionType>,
    // eslint-disable-next-line id-match
    ...$Exact<PassedPropsType>,
    +children?: Array<Node>
}>;

type StateType = {|
    +state: number,
    +badgeCategoryList: BadgeCategoryListType | null
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

    async componentDidMount(): Promise<void> {
        const view = this;

        const badgeCategoryList = await getBadgeCategoryList();

        if (badgeCategoryList === null) {
            console.error('can not get badge category list');
            return;
        }

        view.setState({badgeCategoryList});
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        const extractedCategoryList = extractCategoryList(state.badgeCategoryList || []);

        return (
            <HalfPopup>
                <HalfPopupHeader>
                    <Locale stringKey="CATEGORY_LIST__CATEGORIES"/>
                </HalfPopupHeader>

                {extractedCategoryList.map(
                    (extractedCategory: ExtractedCategoryType): Node =>
                        <BadgeCategoryListItem key={extractedCategory.name} category={extractedCategory}/>

                )}

                {JSON.stringify(extractedCategoryList)}
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
