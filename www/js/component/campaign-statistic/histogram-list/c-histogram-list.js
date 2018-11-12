// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import type {CampaignStatisticDataListType, DataType} from '../api';
import {Scroll} from '../../ui/scroll/c-scroll';
import {extractUserList, getBadgeListOfUser, getBadgeListSum} from './helper';
import type {BadgeOfUserType} from './helper';
import {histogramListConst} from './histogram-list-const';

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
    +selectedBadgeIdList: Array<number | string>,
|};

type ColumnDataType = {
    +user: DataType,
    +badgeList: Array<BadgeOfUserType>,
};

type PropsType = PassedPropsType;

type StateType = {};

export class HistogramList extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {};
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

    renderItem = (columnData: ColumnDataType): Node => {
        const view = this;

        return (
            <button className={style.histogram_item_wrapper} type="button" key={columnData.user.id}>
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
