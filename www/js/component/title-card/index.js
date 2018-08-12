// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import serviceStyle from '../../../css/service.scss';
import helperStyle from '../../../css/helper.scss';
import style from './style.scss';
import classnames from 'classnames';
import Locale from '../locale';
import moment from 'moment';
import type {NewsType, NewsUserType} from '../title-card-list/api';

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
        const peopleFaceClassName = classnames(style.people_face, {
            [style.people_face__single]: userList.length === 1
        });

        return (
            <div className={classnames(serviceStyle.clear_self, style.people_list)}>
                {userList.map(
                    (userInList: NewsUserType): Node =>
                        <img key={userInList.id} className={peopleFaceClassName} src={userInList.imageUrl} alt=""/>

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
            <div className={style.card}>
                <img className={style.badge_icon} src={newsData.reason.imageUrl} alt=""/>

                {view.renderFaceList()}

                <div className={style.review}>
                    <p className={classnames(helperStyle.line_cap_3, style.review__text)}>{newsData.comment}</p>
                </div>
                <div className={classnames(serviceStyle.clear_self, style.bottom_data_wrapper)}>
                    <img className={style.bottom_face} src={newsData.author.imageUrl} alt=""/>
                    <p className={style.bottom_date}>{moment(newsData.date).format('DD.MM.YYYY')}</p>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({}),
    {}
)(TitleCard);
