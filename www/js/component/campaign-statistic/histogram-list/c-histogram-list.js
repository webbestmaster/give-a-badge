// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
import style from './style.scss';
import type {CampaignStatisticDataListType, DataType} from '../api';
import {Scroll} from '../../ui/scroll/c-scroll';

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
|};

type PropsType = PassedPropsType;

type StateType = {|
    +state: number,
|};

export class HistogramList extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    renderItem = (itemData: mixed): Node => {
        return (
            <button className={style.histogram_item_wrapper} type="button" key={Math.random()}>
                <div className={style.histogram_item}>
                    <div className={style.histogram_column}/>
                    <div className={style.histogram_face_wrapper}>
                        <img className={style.histogram_face_image} src="https://loremflickr.com/108/108" alt=""/>
                    </div>
                </div>
            </button>
        );
    };

    getItemList(): Array<mixed> {
        return new Array(20).fill(null);
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
