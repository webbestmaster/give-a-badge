// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';

import {Scroll} from '../../ui/scroll/c-scroll';
import {Locale} from '../../locale/c-locale';
import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from '../api';

import style from './style.scss';

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
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    state: StateType;
    props: PropsType;

    getCommentList(): Array<DataType> {
        const view = this;
        const {props} = view;
        const {campaignStatisticDataList} = props;

        return campaignStatisticDataList.map((campaignStatisticData: CampaignStatisticDataType): DataType => {
            return campaignStatisticData.badge;
        });
    }

    renderComment = (badgeData: DataType, index: number): Node => {
        return (
            <div className={style.comment_item} key={`${index}/${badgeData.id}`} title={badgeData.name}>
                <div
                    className={style.comment_item_face}
                    style={{backgroundImage: `url(${'https://loremflickr.com/108/108'})`}}
                />
                <div className={style.comment_item_text_cloud}>
                    <p className={style.comment_item_text}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias blanditiis, eos est fuga id
                        magnam mollitia nam natus nulla, odit possimus quisquam reiciendis sed soluta sunt vitae? Ad,
                        neque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias blanditiis, eos est
                        fuga id magnam mollitia nam natus nulla, odit possimus quisquam reiciendis sed soluta sunt
                        vitae? Ad, neque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias blanditiis,
                        eos est fuga id magnam mollitia nam natus nulla, odit possimus quisquam reiciendis sed soluta
                        sunt vitae? Ad, neque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias
                        blanditiis, eos est fuga id magnam mollitia nam natus nulla, odit possimus quisquam reiciendis
                        sed soluta sunt vitae? Ad, neque!
                    </p>
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
                <div className={style.comment_list_scroll}>
                    {/* 465 comment width, 17 * 2 - left and right padding */}
                    <Scroll direction="horizontal" slideWidth={commentList.length * 465 + 17 * 2}>
                        <div className={style.comment_list_wrapper}>{commentList.map(view.renderComment)}</div>
                    </Scroll>
                </div>
            </div>
        );
    }
}
