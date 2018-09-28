// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
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
import type {SystemType} from '../system/reducer/root';
import {triggerResize} from '../ui/helper';

type ReduxPropsType = {|
    +system: SystemType
|};

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

type NodeType = {|
    header: HTMLElement | null,
    faceList: HTMLElement | null
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeWon extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;
    node: NodeType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            isShowMore: false,
            badgeWonServerData: null
        };

        view.node = {
            header: null,
            faceList: null
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

        view.setState({badgeWonServerData}, triggerResize);
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
            <h3
                ref={(header: HTMLElement | null) => {
                    view.node.header = header;
                }}
                className={style.header}
            >
                <img className={style.header__badge_image} src={imageUrl} alt={name}/>
                <div className={style.header__badge_text_block}>
                    <span className={style.header_badge_name}>{name}</span>
                </div>
            </h3>
        );
    }

    renderAuthor(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeWonServerData, isShowMore} = state;

        const isNeedToShowButton = view.getNaturalPeopleListHeight() > view.getAvailableAreaHeight();

        if (badgeWonServerData === null || isShowMore === true && isNeedToShowButton === true) {
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

        const isNeedToShowButton = view.getNaturalPeopleListHeight() > view.getAvailableAreaHeight();

        if (badgeWonServerData === null || isShowMore === true && isNeedToShowButton === true) {
            return null;
        }

        return <p className={style.badge_description}>{badgeWonServerData.comment}</p>;
    }

    getAvailableAreaHeight(): number {
        const view = this;
        const {props, state, node} = view;
        const {screen} = props.system;
        const topMarginDesktop = 98;
        const topMarginMobile = 32;
        const {header} = node;

        if (header === null) {
            console.error('view.node.header is null');
            return 0;
        }

        const topMargin = screen.isDesktop ? topMarginDesktop : topMarginMobile;

        return screen.height - topMargin - header.clientHeight;
    }

    getNaturalPeopleListHeight(): number {
        const view = this;
        const {node} = view;
        const {faceList} = node;

        if (faceList === null) {
            console.error('view.node.faceList is null');
            return 0;
        }

        const currentStyleHeight = faceList.style.height || 'auto';

        faceList.style.height = 'auto';

        const currentNaturalHeght = parseInt(faceList.clientHeight, 10) || 0;

        faceList.style.height = currentStyleHeight;

        return currentNaturalHeght;
    }

    getPeopleListStyle(): {|+height: number | string|} {
        const view = this;
        const {props, state} = view;

        const {isShowMore} = state;

        const availableAreaHeight = view.getAvailableAreaHeight();

        const isNeedToShowButton = view.getNaturalPeopleListHeight() > availableAreaHeight;

        if (isNeedToShowButton === false) {
            return {
                height: 'auto'
            };
        }

        if (isShowMore) {
            return {
                height: availableAreaHeight
            };
        }

        return {
            height: availableAreaHeight / 2
        };
    }

    renderPeopleList(): Node {
        const view = this;
        const {props, state} = view;

        const {badgeWonServerData, isShowMore} = state;

        if (badgeWonServerData === null) {
            return null;
        }

        const {toUsers} = badgeWonServerData;

        const isNeedToShowButton = view.getNaturalPeopleListHeight() > view.getAvailableAreaHeight();

        return (
            <Fragment>
                <div
                    style={view.getPeopleListStyle()}
                    ref={(faceList: HTMLElement | null) => {
                        view.node.faceList = faceList;
                    }}
                    className={classNames(style.people_list, {[style.people_list__open]: isShowMore})}
                >
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
                </div>
                {isNeedToShowButton ?
                    <button
                        className={classNames(style.show_more_less_button, {
                            [style.show_more_less_button__open]: isShowMore
                        })}
                        type="button"
                        onClick={(): void => view.toggleIsShowMore()}
                        onKeyPress={(): void => view.toggleIsShowMore()}
                    >
                        {isShowMore ? '%show less%' : '%show more%'}
                    </button> :
                    null}
            </Fragment>
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
        system: state.system
    }),
    reduxAction
)(BadgeWon);
