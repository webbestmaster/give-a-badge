// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import type {CampaignStatisticDataListType, DataType} from '../api';
import {Scroll} from '../../ui/scroll/c-scroll';
import type {GlobalStateType} from '../../../app/reducer';
import {noHistogramListActiveUserId} from '../c-campaign-statistic';

import style from './style.scss';
import type {BadgeOfUserType} from './helper';
import {extractUserList, getBadgeListOfUser, getBadgeListSum} from './helper';
import {histogramListConst} from './histogram-list-const';

type ReduxPropsType = {
    // +auth: AuthType,
};

type ReduxActionType = {};

const reduxAction: ReduxActionType = {};

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
    +selectedBadgeIdList: Array<number | string>,
    +onChangeActiveUser: (activeUserId: string | number) => void,
|};

type ColumnDataType = {
    +user: DataType,
    +badgeList: Array<BadgeOfUserType>,
};

type PropsType = {|
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
|};

type StateType = {|
    +activeUserId: string | number,
|};

class HistogramList extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            activeUserId: noHistogramListActiveUserId,
        };
    }

    state: StateType;
    props: PropsType;

    renderColumnPart = (badgeOfUser: BadgeOfUserType): Node => {
        const view = this;
        const maxRating = view.getMaxRating();
        const height = badgeOfUser.count / maxRating * histogramListConst.column.height.max;

        return (
            <div className={style.histogram_column_part} key={badgeOfUser.id} style={{height}} title={badgeOfUser.name}>
                <img alt={badgeOfUser.name} className={style.histogram_column_part_image} src={badgeOfUser.imageUrl}/>
            </div>
        );
    };

    setActiveUserId(userId: string | number) {
        const view = this;
        const {props} = view;

        view.setState({activeUserId: userId}, () => {
            props.onChangeActiveUser(userId);
        });
    }

    createHandlerOnHistogramItemClick = (userId: string | number): (() => void) => {
        return () => {
            const view = this;
            const {state} = view;
            const {activeUserId} = state;
            const newActiveUserId = userId === activeUserId ? noHistogramListActiveUserId : userId;

            view.setActiveUserId(newActiveUserId);
        };
    };

    renderItem = (columnData: ColumnDataType): Node => {
        const view = this;
        const {state} = view;
        const {activeUserId} = state;

        const isActiveColumn = activeUserId === columnData.user.id;
        const hasSelectedUser = activeUserId !== noHistogramListActiveUserId;

        return (
            <button
                className={classNames(style.histogram_item_wrapper, {
                    [style.histogram_item_wrapper__active]: isActiveColumn || !hasSelectedUser,
                    [style.histogram_item_wrapper__show_face_select_mask]: isActiveColumn && hasSelectedUser,
                })}
                key={columnData.user.id}
                onClick={view.createHandlerOnHistogramItemClick(columnData.user.id)}
                type="button"
            >
                <div className={style.histogram_item}>
                    <div className={style.histogram_column}>{columnData.badgeList.map(view.renderColumnPart)}</div>
                    <div className={style.histogram_face_wrapper}>
                        <div
                            className={style.histogram_face_image}
                            style={{backgroundImage: `url(${columnData.user.imageUrl})`}}
                        />
                    </div>
                </div>
            </button>
        );
    };

    getItemList(): Array<ColumnDataType> {
        const view = this;
        const {state, props} = view;
        const {campaignStatisticDataList, selectedBadgeIdList} = props;

        return extractUserList(campaignStatisticDataList).map((userData: DataType): ColumnDataType => {
            return {
                user: userData,
                badgeList: getBadgeListOfUser(campaignStatisticDataList, userData, selectedBadgeIdList),
            };
        });
    }

    getMaxRating(): number {
        const view = this;
        const itemList = view.getItemList();

        return Math.max(...itemList.map((columnData: ColumnDataType): number => getBadgeListSum(columnData.badgeList)));
    }

    render(): Node {
        const view = this;
        const itemList = view.getItemList();

        return (
            // 76 - column height, 38 * 2 - left and right padding
            <Scroll direction="horizontal" slideWidth={itemList.length * 76 + 38 * 2}>
                <div className={style.histogram_list_wrapper}>{itemList.map(view.renderItem)}</div>
            </Scroll>
        );
    }
}

const ConnectedComponent = connect<ComponentType<HistogramList>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // auth: state.auth,
    }),
    reduxAction
)(HistogramList);

export {ConnectedComponent as HistogramList};
