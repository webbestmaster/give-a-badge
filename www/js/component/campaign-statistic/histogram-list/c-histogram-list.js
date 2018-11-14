// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import type {CampaignStatisticDataListType, DataType} from '../api';
import {Scroll} from '../../ui/scroll/c-scroll';
import type {BadgeOfUserType} from './helper';
import {extractUserList, getBadgeListOfUser, getBadgeListSum} from './helper';
import {histogramListConst} from './histogram-list-const';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app/reducer';
import classNames from 'classnames';
import {noHistogramListActiveUserId} from '../c-campaign-statistic';

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
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            activeUserId: noHistogramListActiveUserId,
        };
    }

    renderColumnPart = (badgeOfUser: BadgeOfUserType): Node => {
        const view = this;
        const maxRating = view.getMaxRating();
        const height = badgeOfUser.count / maxRating * histogramListConst.column.height.max;

        return (
            <div title={badgeOfUser.name} key={badgeOfUser.id} style={{height}} className={style.histogram_column_part}>
                <img src={badgeOfUser.imageUrl} className={style.histogram_column_part_image} alt={badgeOfUser.name}/>
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

            view.setActiveUserId(userId);
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
                onClick={view.createHandlerOnHistogramItemClick(columnData.user.id)}
                className={classNames(style.histogram_item_wrapper, {
                    [style.histogram_item_wrapper__active]: isActiveColumn || !hasSelectedUser,
                    [style.histogram_item_wrapper__show_face_select_mask]: isActiveColumn && hasSelectedUser,
                })}
                type="button"
                key={columnData.user.id}
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

        return extractUserList(campaignStatisticDataList).map(
            (userData: DataType): ColumnDataType => {
                return {
                    user: userData,
                    badgeList: getBadgeListOfUser(campaignStatisticDataList, userData, selectedBadgeIdList),
                };
            }
        );
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
            <Scroll slideWidth={itemList.length * 76 + 38 * 2} direction="horizontal">
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
