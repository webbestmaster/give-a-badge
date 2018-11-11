// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
import style from './style.scss';
import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from '../api';
import classNames from 'classnames';
import {Scroll} from '../../ui/scroll/c-scroll';

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
|};

type PropsType = $Exact<{
    ...PassedPropsType,
}>;

type StateType = {|
    +selectedBadgeIdList: Array<string | number>,
|};

export class BadgeList extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            selectedBadgeIdList: [],
        };
    }

    getBadgeList(): Array<DataType> {
        const view = this;
        const {props} = view;
        const {campaignStatisticDataList} = props;

        const badgeList = [];

        campaignStatisticDataList.forEach((campaignStatisticData: CampaignStatisticDataType) => {
            const {badge} = campaignStatisticData;

            const hasBadgeInList = badgeList.some((badgeInList: DataType): boolean => badgeInList.id === badge.id);

            if (hasBadgeInList) {
                return;
            }

            badgeList.push(badge);
        });

        if (badgeList.length > 0) {
            view.activateBadge(badgeList[0].id);
        }

        return badgeList;
    }

    activateBadge(badgeId: string | number) {
        const view = this;
        const {state, props} = view;
        const {selectedBadgeIdList} = state;

        if (selectedBadgeIdList.includes(badgeId)) {
            console.log('selectedBadgeIdList already include the', badgeId);
            return;
        }

        view.setState({selectedBadgeIdList: [...selectedBadgeIdList, badgeId]});
    }

    deactivateBadge(badgeId: string | number) {
        const view = this;
        const {state, props} = view;
        const {selectedBadgeIdList} = state;

        if (!selectedBadgeIdList.includes(badgeId)) {
            console.log('selectedBadgeIdList already NOT include the', badgeId);
            return;
        }

        if (selectedBadgeIdList.length <= 1) {
            console.log('selectedBadgeIdList too short to deactivateBadge', badgeId);
            return;
        }

        selectedBadgeIdList.splice(selectedBadgeIdList.indexOf(badgeId), 1);

        view.setState({selectedBadgeIdList: [...selectedBadgeIdList]});
    }

    toggleBadgeActive(badgeId: string | number) {
        const view = this;
        const {state, props} = view;
        const {selectedBadgeIdList} = state;

        if (selectedBadgeIdList.includes(badgeId)) {
            view.deactivateBadge(badgeId);
            return;
        }

        view.activateBadge(badgeId);
    }

    createOnClickHandler(badgeId: string | number): () => void {
        return () => {
            const view = this;

            view.toggleBadgeActive(badgeId);
        };
    }

    renderBadge = (badgeData: DataType): Node => {
        const view = this;
        const {state, props} = view;
        const {selectedBadgeIdList} = state;
        const handleOnClick = view.createOnClickHandler(badgeData.id);

        return (
            <button
                title={badgeData.name}
                type="button"
                key={badgeData.id}
                onClick={handleOnClick}
                onKeyPress={handleOnClick}
                className={classNames(style.badge_tem, {
                    [style.badge_tem__selected]: selectedBadgeIdList.includes(badgeData.id),
                })}
            >
                <img className={style.badge_tem_image} src={badgeData.imageUrl} alt={badgeData.name}/>
            </button>
        );
    };

    render(): Node {
        const view = this;

        return (
            <Scroll>
                <div className={style.badge_list}>{view.getBadgeList().map(view.renderBadge)}</div>
            </Scroll>
        );
    }
}
