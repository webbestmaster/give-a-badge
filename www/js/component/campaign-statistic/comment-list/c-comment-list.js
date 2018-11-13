// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import {Locale} from '../../locale/c-locale';
import type {CampaignStatisticDataListType, CampaignStatisticDataType} from '../api';
import {getCommentListAboutUser} from './helper';

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
    +histogramListActiveUserId: number | string,
    +activeBadgeIdList: Array<string | number>,
|};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    +children: Node,
}>;

type StateType = {|
    +state: number,
|};

export class CommentList extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    getCommentList(): CampaignStatisticDataListType {
        const view = this;
        const {props} = view;
        const {campaignStatisticDataList, histogramListActiveUserId, activeBadgeIdList} = props;

        return getCommentListAboutUser(campaignStatisticDataList, histogramListActiveUserId, activeBadgeIdList);
    }

    renderComment = (campaignStatisticData: CampaignStatisticDataType): Node => {
        return (
            <div className={style.comment_item} key={campaignStatisticData.date}>
                <div
                    className={style.comment_item_face}
                    style={{backgroundImage: `url(${campaignStatisticData.assigner.imageUrl})`}}
                />
                <div className={style.comment_item_text_cloud}>
                    <p className={style.comment_item_text}>{campaignStatisticData.comment}</p>
                </div>
            </div>
        );
    };

    render(): Node {
        const view = this;

        const commentList = view.getCommentList();

        return (
            <div className={style.comment_list}>
                <h3 className={style.comment_list__header}>
                    <Locale stringKey="CAMPAIGN__STATISTIC__COMMENT"/>
                </h3>
                <div className={style.comment_list_wrapper}>{commentList.map(view.renderComment)}</div>
            </div>
        );
    }
}
