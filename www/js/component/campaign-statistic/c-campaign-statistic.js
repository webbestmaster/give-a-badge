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
import type {CampaignStatisticDataListType} from './api';
import {getCampaignStatistic} from './api';
import type {SystemType} from '../system/reducer/root';
import classNames from 'classnames';

type ReduxPropsType = {|
    +system: SystemType,
|};

type ReduxActionType = {};

const reduxAction: ReduxActionType = {};

type PassedPropsType = {};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    ...$Exact<ContextRouterType>,
    +match: {
        +params: {
            +campaignId: string,
        },
    },
    +children: Node,
}>;

type StateType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
|};

class CampaignStatistic extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            campaignStatisticDataList: [],
        };
    }

    async fetchCampaignStatistic(): Promise<void> {
        const view = this;
        const {props} = view;

        const campaignStatisticDataList = await getCampaignStatistic(props.match.params.campaignId);

        if (campaignStatisticDataList instanceof Error) {
            console.error('can not get statistic for campaign: ', props.match.params.campaignId);
            return;
        }

        view.setState({campaignStatisticDataList});
    }

    componentDidMount() {
        const view = this;

        (async (): Promise<void> => {
            await view.fetchCampaignStatistic();
        })();
    }

    renderBadgeList(): Node {
        const view = this;
        const {state, props} = view;
        const {campaignStatisticDataList} = state;

        return (
            <div
                className={classNames(style.badge_list__wrapper, {
                    [style.badge_list__wrapper__mobile]: props.system.screen.isMobile,
                })}
            >
                <BadgeList campaignStatisticDataList={campaignStatisticDataList}/>
            </div>
        );
    }

    renderHistogramList(): Node {
        const view = this;
        const {state} = view;
        const {campaignStatisticDataList} = state;

        return (
            <div className={style.histogram_list__wrapper}>
                <HistogramList campaignStatisticDataList={campaignStatisticDataList}/>
            </div>
        );
    }

    renderCommentList(): Node {
        const view = this;
        const {state} = view;
        const {campaignStatisticDataList} = state;

        return (
            <div className={style.comment_list__wrapper}>
                <CommentList campaignStatisticDataList={campaignStatisticDataList}/>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return (
            <HalfPopup closeOnClickBackground>
                <HalfPopupHeader>
                    <Locale stringKey="CAMPAIGN__STATISTIC"/>
                </HalfPopupHeader>

                <div
                    className={classNames(style.statistic_wrapper, {
                        [style.statistic_wrapper__mobile]: props.system.screen.isMobile,
                    })}
                >
                    {view.renderBadgeList()}
                    {view.renderHistogramList()}
                    <div className={style.statistic_wrapper_background}/>
                </div>
                {view.renderCommentList()}
            </HalfPopup>
        );
    }
}

const ConnectedComponent = connect<ComponentType<CampaignStatistic>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system,
    }),
    reduxAction
)(CampaignStatistic);

export {ConnectedComponent as CampaignStatistic};