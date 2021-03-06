// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Link from 'react-router-dom/Link';

import type {GlobalStateType} from '../../app/reducer';
import serviceStyle from '../../../css/service.scss';
import helperStyle from '../../../css/helper.scss';
import type {NewsType, NewsUserType} from '../title-card-list/api';
import {newsInfo} from '../title-card-list/api';
import {getBadgeCampaignPath, getBadgeWonPath} from '../app/routes';
import {formatTimeDMY} from '../../lib/time';

import style from './style.scss';

type ReduxPropsType = {};

type PassedPropsType = {|
    +newsData: NewsType,
|};

type StateType = {|
    +state: number,
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...ReduxPropsType, ...PassedPropsType}>;

class TitleCard extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    state: StateType;
    props: PropsType;

    renderFaceList(): Node {
        const view = this;
        const {props, state} = view;
        const {newsData} = props;
        const userList = newsData.toUsers;
        const isSingleItem = userList.length === 1;
        const peopleFaceClassName = classNames(style.people_face, {
            [style.people_face__single]: isSingleItem,
        });

        const maxVisibleFace = 6;

        const isMoreThenMax = userList.length > maxVisibleFace;

        return (
            <div
                className={classNames(serviceStyle.clear_self, style.people_list, {
                    [style.people_list__single_item]: isSingleItem,
                })}
            >
                {userList.map((userInList: NewsUserType, faceIndex: number): Node => {
                    if (!isMoreThenMax || faceIndex < maxVisibleFace - 1) {
                        return (
                            <div
                                className={peopleFaceClassName}
                                key={userInList.id}
                                style={{backgroundImage: `url('${userInList.imageUrl}')`}}
                                title={userInList.name}
                            />
                        );
                    }

                    if (faceIndex === maxVisibleFace - 1) {
                        return (
                            <div className={style.people_face__number} key="face-number">
                                +{newsData.totalToUsers - maxVisibleFace + 1}
                                &nbsp;
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        );
    }

    renderAuthor(): Node {
        const view = this;
        const {props, state} = view;
        const {newsData} = props;

        if (newsData.author === null) {
            return null;
        }

        return <div className={style.bottom_face} style={{backgroundImage: `url('${newsData.author.imageUrl}')`}}/>;
    }

    getLinkPath(): string {
        const view = this;
        const {props} = view;
        const {newsData} = props;

        if (newsData.newsType === newsInfo.type.campaignResults) {
            return getBadgeCampaignPath(newsData.entityId);
        }

        return getBadgeWonPath(newsData.id);
    }

    render(): Node {
        const view = this;
        const {props} = view;
        const {newsData} = props;

        return (
            <Link className={style.card} to={view.getLinkPath()}>
                <div className={style.badge_icon} style={{backgroundImage: `url('${newsData.reason.imageUrl}')`}}/>

                {view.renderFaceList()}

                <div className={style.review}>
                    <p className={classNames(helperStyle.line_cap_3, style.review__text)}>{newsData.comment}</p>
                </div>
                <div className={classNames(serviceStyle.clear_self, style.bottom_data_wrapper)}>
                    {view.renderAuthor()}
                    <p className={style.bottom_date}>{formatTimeDMY(newsData.date)}</p>
                </div>
            </Link>
        );
    }
}

const ConnectedComponent = connect<ComponentType<TitleCard>, PassedPropsType, ReduxPropsType, {}>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({}),
    {}
)(TitleCard);

export {ConnectedComponent as TitleCard};
