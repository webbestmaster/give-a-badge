// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';
import {HalfPopup} from '../ui/half-popup/c-half-popup';
import {HalfPopupHeader} from '../ui/half-popup/header/c-header';
import {Locale} from '../locale/c-locale';
import style from './style.scss';
import {BadgeList} from './badge-list/c-badge-list';
import {HistogramList} from './histogram-list/c-histogram-list';
import {CommentList} from './comment-list/c-comment-list';

type ReduxPropsType = {|
    +reduxProp: boolean,
|};

type ReduxActionType = {};

const reduxAction: ReduxActionType = {};

type PassedPropsType = {};

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

class CampaignStatistic extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <HalfPopup closeOnClickBackground>
                <HalfPopupHeader>
                    <Locale stringKey="CAMPAIGN__STATISTIC"/>
                </HalfPopupHeader>

                <div className={style.statistic_wrapper}>
                    <div className={style.badge_list__wrapper}>
                        <BadgeList/>
                    </div>
                    <div className={style.histogram_list__wrapper}>
                        <HistogramList/>
                    </div>
                </div>
                <div className={style.comment_list__wrapper}>
                    <CommentList/>
                </div>
            </HalfPopup>
        );
    }
}

const ConnectedComponent = connect<ComponentType<CampaignStatistic>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        reduxProp: true,
    }),
    reduxAction
)(CampaignStatistic);

export {ConnectedComponent as CampaignStatistic};
