// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';

import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from '../api';
import {direction, Scroll} from '../../ui/scroll/c-scroll';
import type {GlobalStateType} from '../../../app/reducer';
import type {SystemType} from '../../system/reducer/root';

import style from './style.scss';

type ReduxPropsType = {|
    +system: SystemType,
|};

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
    +onChangeBadgeList: (selectedBadgeIdList: Array<number | string>) => void,
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
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            selectedBadgeIdList: [],
        };
    }

    state: StateType;

    componentDidUpdate() {
        const view = this;
        const {props, state} = view;
        const {selectedBadgeIdList} = state;

        if (selectedBadgeIdList.length === 0 && props.campaignStatisticDataList.length > 0) {
            view.setState(
                {selectedBadgeIdList: view.getBadgeList().map((badge: DataType): number | string => badge.id)},
                view.onChangeBadgeList
            );
        }
    }

    props: PropsType;

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

        return badgeList.sort(
            (badgeA: DataType, badgeB: DataType): number => parseInt(badgeB.id, 10) - parseInt(badgeA.id, 10)
        );
    }

    onChangeBadgeList = () => {
        const view = this;
        const {state, props} = view;
        const {selectedBadgeIdList} = state;

        props.onChangeBadgeList(selectedBadgeIdList);
    };

    activateBadge(badgeId: string | number) {
        const view = this;
        const {state, props} = view;
        const {selectedBadgeIdList} = state;

        if (selectedBadgeIdList.includes(badgeId)) {
            console.log('selectedBadgeIdList already include the', badgeId);
            return;
        }

        view.setState({selectedBadgeIdList: [...selectedBadgeIdList, badgeId]}, view.onChangeBadgeList);
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

        view.setState({selectedBadgeIdList: [...selectedBadgeIdList]}, view.onChangeBadgeList);
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
                className={classNames(style.badge_tem, {
                    [style.badge_item__selected]: selectedBadgeIdList.includes(badgeData.id),
                    [style.badge_item__mobile]: props.system.screen.isMobile,
                })}
                key={badgeData.id}
                onClick={handleOnClick}
                onKeyPress={handleOnClick}
                title={badgeData.name}
                type="button"
            >
                <img alt={badgeData.name} className={style.badge_item_image} src={badgeData.imageUrl}/>
            </button>
        );
    };

    render(): Node {
        const view = this;
        const {props} = view;

        const badgeList = view.getBadgeList();

        if (props.system.screen.isMobile) {
            return (
                <Scroll direction={direction.horizontal} key="mobile-swiper">
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
