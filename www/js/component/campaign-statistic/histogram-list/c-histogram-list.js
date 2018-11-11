// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import type {CampaignStatisticDataListType, DataType} from '../api';
import {Scroll} from '../../ui/scroll/c-scroll';
import {extractUserList} from './helper';

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
    +selectedBadgeIdList: Array<number | string>,
|};

type ColumnDataType = {
    +user: DataType,
    +badgeList: Array<{
        id: string | number,
        name: string,
        imageUrl: string,
        count: number,
    }>,
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

    renderItem = (columnData: ColumnDataType): Node => {
        return (
            <button className={style.histogram_item_wrapper} type="button" key={columnData.user.id}>
                <div className={style.histogram_item}>
                    <div className={style.histogram_column}/>
                    <div className={style.histogram_face_wrapper}>
                        <img
                            className={style.histogram_face_image}
                            src={columnData.user.imageUrl}
                            alt={columnData.user.name}
                        />
                    </div>
                </div>
            </button>
        );
    };

    getItemList(): Array<ColumnDataType> {
        const view = this;
        const {state, props} = view;
        const {campaignStatisticDataList} = props;

        return extractUserList(campaignStatisticDataList).map(
            (userData: DataType): ColumnDataType => {
                return {
                    user: userData,
                    badgeList: [],
                };
            }
        );
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
