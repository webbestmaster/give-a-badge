// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import type {GlobalStateType} from '../../app/reducer';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';
import HalfPopup from '../ui/half-popup/c-half-popup';
import {getBadgeWonServerData} from './api';
import type {BadgeWonServerDataType} from './api';
import moment from 'moment';
import {isString} from '../../lib/is';
import routes from '../app/routes';
import style from './style.scss';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        ...$Exact<ContextRouterType>,
        +children: Node
    }>>;

type StateType = {|
    +isShowMore: boolean,
    +badgeWonServerData: BadgeWonServerDataType | null
    // +state: number
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeWon extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            isShowMore: false,
            badgeWonServerData: null
        };
    }

    async componentDidMount(): Promise<void> {
        const view = this;
        const {props, state} = view;

        const {badgeId} = props.match.params;

        if (!isString(badgeId)) {
            console.error('badgeId is not a string', badgeId);
            console.error('navigate to home', badgeId);
            props.history.push(routes.index.index);
            return;
        }

        const badgeWonServerData = await getBadgeWonServerData(badgeId);

        if (badgeWonServerData instanceof Error) {
            console.error('can not get badge won badgeId:', badgeId);
            console.error(badgeWonServerData);
            console.error('navigate to home', badgeId);
            props.history.push(routes.index.index);
            return;
        }

        view.setState({badgeWonServerData});
    }

    toggleIsShowMore() {
        const view = this;
        const {props, state} = view;

        view.setState({isShowMore: !state.isShowMore});
    }

    renderHeader(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeWonServerData} = state;

        if (badgeWonServerData === null) {
            return null;
        }

        const {imageUrl, name} = badgeWonServerData.reason;

        return (
            <h3 className={style.header}>
                <img className={style.header__badge_image} src={imageUrl} alt={name}/>
                <span className={style.header_badge_name}>{name}</span>
            </h3>
        );
    }

    renderAuthor(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeWonServerData, isShowMore} = state;

        if (badgeWonServerData === null || isShowMore === true) {
            return null;
        }

        const {author, date} = badgeWonServerData;
        const {imageUrl, name} = author;

        return (
            <div className={style.author_info}>
                <img className={style.author_image} src={imageUrl} alt={name}/>
                <h3 className={style.author_name}>{name}</h3>
                <p className={style.badge_date}>{moment(date).format('DD.MM.YYYY')}</p>
            </div>
        );
    }

    renderDescription(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeWonServerData, isShowMore} = state;

        if (badgeWonServerData === null || isShowMore === true) {
            return null;
        }

        return <p className={style.badge_description}>{badgeWonServerData.comment}</p>;
    }

    renderPeopleList(): Node {
        const view = this;
        const {props, state} = view;

        const {badgeWonServerData, isShowMore} = state;

        if (badgeWonServerData === null) {
            return null;
        }

        const {toUsers} = badgeWonServerData;

        return (
            <div className={classNames(style.people_list, {[style.people_list__open]: isShowMore})}>
                {toUsers.map(
                    (userData: {+id: string | number, +imageUrl: string, +name: string}): Node => {
                        return (
                            <div className={style.won_badge_face} key={userData.id}>
                                <img
                                    className={style.won_badge_face_image}
                                    src={userData.imageUrl}
                                    alt={userData.name}
                                />
                            </div>
                        );
                    }
                )}

                <button
                    className={classNames(style.show_more_less_button, {
                        [style.show_more_less_button__open]: isShowMore
                    })}
                    type="button"
                    onClick={(): void => view.toggleIsShowMore()}
                    onKeyPress={(): void => view.toggleIsShowMore()}
                >
                    {isShowMore ? '%show less%' : '%show more%'}
                </button>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <HalfPopup
                className={{
                    containerPosition: style.half_popup__container_position__extra,
                    container: style.half_popup__container__extra
                }}
            >
                {view.renderHeader()}
                {view.renderPeopleList()}
                {view.renderDescription()}
                {view.renderAuthor()}
            </HalfPopup>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(BadgeWon);
