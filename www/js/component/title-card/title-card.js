// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import serviceStyle from '../../../css/service.scss';
import helperStyle from '../../../css/helper.scss';
import style from './style.scss';
import classnames from 'classnames';
import moment from 'moment';
import type {NewsType, NewsUserType} from '../title-card-list/api';
import Link from 'react-router-dom/Link';
import {getBadgeWonPath} from '../app/routes';

type ReduxPropsType = {};

type PassedPropsType = {|
    newsData: NewsType
    // +passedProp: string
|};

type StateType = {|
    +state: number
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...ReduxPropsType, ...PassedPropsType}>;

class TitleCard extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0
        };
    }

    renderFaceList(): Node {
        const view = this;
        const {props, state} = view;
        const {newsData} = props;
        const userList = newsData.toUsers;
        const isSingleItem = userList.length === 1;
        const peopleFaceClassName = classnames(style.people_face, {
            [style.people_face__single]: isSingleItem
        });

        const maxVisibleFace = 6;

        const isMoreThenMax = userList.length > maxVisibleFace;

        return (
            <div
                className={classnames(serviceStyle.clear_self, style.people_list, {
                    [style.people_list__single_item]: isSingleItem
                })}
            >
                {userList.map(
                    (userInList: NewsUserType, faceIndex: number): Node => {
                        if (!isMoreThenMax || faceIndex < maxVisibleFace - 1) {
                            return (
                                <div
                                    key={userInList.id}
                                    className={peopleFaceClassName}
                                    style={{backgroundImage: `url('${userInList.imageUrl}')`}}
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
                    }
                )}
                {/*
                    <p className={style.people_face_counter}>
                        and 252 people
                         <Locale stringKey="SPACE"/>
                    </p>
                */}
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {newsData} = props;

        return (
            <Link to={getBadgeWonPath(newsData.reason.id)} className={style.card}>
                <div className={style.badge_icon} style={{backgroundImage: `url('${newsData.reason.imageUrl}')`}}/>

                {view.renderFaceList()}

                <div className={style.review}>
                    <p className={classnames(helperStyle.line_cap_3, style.review__text)}>{newsData.comment}</p>
                </div>
                <div className={classnames(serviceStyle.clear_self, style.bottom_data_wrapper)}>
                    <div
                        className={style.bottom_face}
                        style={{backgroundImage: `url('${newsData.author.imageUrl}')`}}
                    />

                    <p className={style.bottom_date}>{moment(newsData.date).format('DD.MM.YYYY')}</p>
                </div>
            </Link>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({}),
    {}
)(TitleCard);
