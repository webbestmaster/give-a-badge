// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
import style from './style.scss';
import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from '../api';
import classNames from 'classnames';

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

        return campaignStatisticDataList.map(
            (campaignStatisticData: CampaignStatisticDataType): DataType => {
                return campaignStatisticData.badge;
            }
        );
    }

    renderBadge = (badgeData: DataType, index: number): Node => {
        const view = this;
        const {state, props} = view;
        const {selectedBadgeIdList} = state;

        return (
            <button
                title={badgeData.name}
                type="button"
                key={`${index}/${badgeData.id}`}
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

        return <div className={style.badge_list}>{view.getBadgeList().map(view.renderBadge)}</div>;
    }
}
