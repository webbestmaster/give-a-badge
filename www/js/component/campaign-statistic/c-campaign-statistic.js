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
import {getCampaignStatistic} from './api';
import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from './api';
import {Scroll} from '../ui/scroll/c-scroll';

type ReduxPropsType = {
    // +reduxProp: boolean,
};

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
        const {state} = view;
        const {campaignStatisticDataList} = state;

        return (
            <div className={style.badge_list__wrapper}>
                <Scroll>
                    <BadgeList campaignStatisticDataList={campaignStatisticDataList}/>
                </Scroll>
            </div>
        );
    }

    renderHistogramList(): Node {
        return (
            <div className={style.histogram_list__wrapper}>
                <Scroll slideWidth={1000} direction="horizontal">
                    <HistogramList/>
                </Scroll>
            </div>
        );
    }

    renderCommentList(): Node {
        return (
            <div className={style.comment_list__wrapper}>
                <Scroll slideWidth={1000} direction="horizontal">
                    <CommentList/>
                </Scroll>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {state} = view;
        const {campaignStatisticDataList} = state;

        return (
            <HalfPopup closeOnClickBackground>
                <HalfPopupHeader>
                    <Locale stringKey="CAMPAIGN__STATISTIC"/>
                </HalfPopupHeader>

                <div>{JSON.stringify(campaignStatisticDataList)}</div>

                <div className={style.statistic_wrapper}>
                    {view.renderBadgeList()}
                    {view.renderHistogramList()}
                </div>
                {view.renderCommentList()}
            </HalfPopup>
        );
    }
}

const ConnectedComponent = connect<ComponentType<CampaignStatistic>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({}),
    reduxAction
)(CampaignStatistic);

export {ConnectedComponent as CampaignStatistic};
