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
import type {NewsAchtungType, NewsUserType} from '../title-card-list/api';
import {getBadgeCampaignPath, getBadgePath} from '../app/routes';
import {actionRequireName} from '../title-card-list/api';

import style from './style.scss';

type ReduxPropsType = {};

type PassedPropsType = {|
    +newsData: NewsAchtungType,
|};

type StateType = {|
    +state: number,
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...ReduxPropsType, ...PassedPropsType}>;

class TitleAchtungCard extends Component<ReduxPropsType, PassedPropsType, StateType> {
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
        const userList = newsData.toUsers || [];

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
                {userList.map(
                    (userInList: NewsUserType, faceIndex: number): Node => {
                        if (!isMoreThenMax || faceIndex < maxVisibleFace - 1) {
                            return (
                                <div
                                    className={peopleFaceClassName}
                                    key={userInList.id}
                                    style={{backgroundImage: `url('${userInList.imageUrl}')`}}
                                />
                            );
                        }

                        if (faceIndex === maxVisibleFace - 1) {
                            return (
                                <div className={style.people_face__number} key="face-number">
                                    +{userList.length - maxVisibleFace + 1}
                                    &nbsp;
                                </div>
                            );
                        }

                        return null;
                    }
                )}
            </div>
        );
    }

    getLinkValue(): string {
        const view = this;
        const {props} = view;
        const {newsData} = props;

        if (newsData.actionRequired === actionRequireName.lookAtCampaignResults) {
            return getBadgeCampaignPath(newsData.entityId);
        }

        if (newsData.actionRequired === actionRequireName.assignBadge) {
            return getBadgePath(newsData.entityId);
        }

        console.error('unsupported actionRequire type', newsData);

        return '#';
    }

    render(): Node {
        const view = this;
        const {props} = view;
        const {newsData} = props;

        return (
            <Link className={classNames(style.card, style.card__achtung)} to={view.getLinkValue()}>
                <div className={style.badge_icon} style={{backgroundImage: `url('${newsData.imageUrl}')`}}/>

                {view.renderFaceList()}

                <div className={style.review}>
                    <p className={classNames(helperStyle.line_cap_3, style.review__text)}>{newsData.comment}</p>
                </div>
            </Link>
        );
    }
}

const ConnectedComponent = connect<ComponentType<TitleAchtungCard>, PassedPropsType, ReduxPropsType, {}>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({}),
    {}
)(TitleAchtungCard);

export {ConnectedComponent as TitleAchtungCard};
