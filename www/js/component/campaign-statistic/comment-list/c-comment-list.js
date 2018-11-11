// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
import style from './style.scss';
import {Scroll} from '../../ui/scroll/c-scroll';
import {Locale} from '../../locale/c-locale';
import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from '../api';
import classNames from 'classnames';

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
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

    getCommentList(): Array<DataType> {
        const view = this;
        const {props} = view;
        const {campaignStatisticDataList} = props;

        return campaignStatisticDataList.map(
            (campaignStatisticData: CampaignStatisticDataType): DataType => {
                return campaignStatisticData.badge;
            }
        );
    }

    renderComment = (badgeData: DataType, index: number): Node => {
        return (
            <div title={badgeData.name} key={`${index}/${badgeData.id}`} className={classNames(style.comment_item)}>
                comment
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
                <div className={style.comment_list_scroll}>
                    <Scroll slideWidth={commentList.length * 465} direction="horizontal">
                        <div className={style.comment_list_wrapper}>{commentList.map(view.renderComment)}</div>
                    </Scroll>
                </div>
            </div>
        );
    }
}
