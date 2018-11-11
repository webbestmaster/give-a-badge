// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from '../api';
import classNames from 'classnames';
import {direction, Scroll} from '../../ui/scroll/c-scroll';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app/reducer';
import type {SystemType} from '../../system/reducer/root';

type ReduxPropsType = {|
    +system: SystemType,
|};

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
|};

type ReduxActionType = {};

const reduxAction: ReduxActionType = {};

type PropsType = $Exact<{
    ...ReduxActionType,
    ...PassedPropsType,
    ...ReduxPropsType,
}>;

type StateType = {|
    +selectedBadgeIdList: Array<string | number>,
|};

class BadgeList extends Component<PropsType, StateType> {
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
                    [style.badge_item__selected]: selectedBadgeIdList.includes(badgeData.id),
                    [style.badge_item__mobile]: props.system.screen.isMobile,
                })}
            >
                <img className={style.badge_item_image} src={badgeData.imageUrl} alt={badgeData.name}/>
            </button>
        );
    };

    componentDidUpdate() {
        const view = this;
        const {props, state} = view;
        const {selectedBadgeIdList} = state;

        if (selectedBadgeIdList.length === 0 && props.campaignStatisticDataList.length > 0) {
            view.activateBadge(view.getBadgeList()[0].id);
        }
    }

    render(): Node {
        const view = this;
        const {props} = view;

        const badgeList = view.getBadgeList();

        if (props.system.screen.isMobile) {
            return (
                <Scroll key="mobile-swiper" direction={direction.horizontal}>
                    <div className={style.badge_list__mobile}>{badgeList.map(view.renderBadge)}</div>
                </Scroll>
            );
        }

        return (
            <Scroll key="desctop-swiper">
                <div className={style.badge_list}>{badgeList.map(view.renderBadge)}</div>
            </Scroll>
        );
    }
}

const ConnectedComponent = connect<ComponentType<BadgeList>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system,
    }),
    reduxAction
)(BadgeList);

export {ConnectedComponent as BadgeList};
