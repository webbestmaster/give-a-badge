// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import type {GlobalStateType} from '../../app/reducer';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';
import {HalfPopup} from '../ui/half-popup/c-half-popup';
import {isString} from '../../lib/is';
import {routes} from '../app/routes';
import type {SystemType} from '../system/reducer/root';
import {triggerResize} from '../ui/helper';
import {Locale} from '../locale/c-locale';
import {formatTimeDMY} from '../../lib/time';

import style from './style.scss';
import type {BadgeWonServerDataType} from './api';
import {getBadgeWonServerData} from './api';

type ReduxPropsType = {|
    +system: SystemType,
|};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    ...$Exact<ContextRouterType>,
    +children: Node,
}>;

type StateType = {|
    +isShowMore: boolean,
    +badgeWonServerData: BadgeWonServerDataType | null,
    // +state: number
|};

type NodeType = {|
    header: {current: HTMLHeadingElement | null},
    faceList: {current: HTMLDivElement | null},
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeWon extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            isShowMore: false,
            badgeWonServerData: null,
        };

        view.node = {
            header: React.createRef(),
            faceList: React.createRef(),
        };
    }

    state: StateType;

    async componentDidMount() {
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

    props: PropsType;
    node: NodeType;

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
            <h3 className={style.header} ref={view.node.header}>
                <div
                    className={style.header__badge_image}
                    style={{
                        backgroundImage: `url('${imageUrl}')`,
                    }}
                />
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
                <div
                    className={style.author_image}
                    style={{
                        backgroundImage: `url('${imageUrl}')`,
                    }}
                />
                <div className={style.author_info_text}>
                    <h3 className={style.author_name}>{name}</h3>
                    <p className={style.badge_date}>{formatTimeDMY(date)}</p>
                </div>
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

        if (header.current === null) {
            console.log('view.node.header is null');
            return 0;
        }

        const topMargin = screen.isDesktop ? topMarginDesktop : topMarginMobile;

        return screen.height - topMargin - header.current.clientHeight;
    }

    getNaturalPeopleListHeight(): number {
        const view = this;
        const {node} = view;
        const {faceList} = node;
        const faceListNode = faceList.current;

        if (faceListNode === null) {
            console.log('view.node.faceList is null');
            return 0;
        }

        const currentStyleHeight = faceListNode.style.height || 'auto';

        faceListNode.style.height = 'auto';

        const currentNaturalHeight = parseInt(faceListNode.clientHeight, 10) || 0;

        faceListNode.style.height = currentStyleHeight;

        return currentNaturalHeight;
    }

    getPeopleListStyle(): {|+height: number | string|} {
        const view = this;
        const {props, state} = view;

        const {isShowMore} = state;

        const availableAreaHeight = view.getAvailableAreaHeight();

        const isNeedToShowButton = view.getNaturalPeopleListHeight() > availableAreaHeight;

        if (isNeedToShowButton === false) {
            return {
                height: 'auto',
            };
        }

        if (isShowMore) {
            return {
                height: availableAreaHeight,
            };
        }

        return {
            height: availableAreaHeight / 2,
        };
    }

    handleShowMore = () => {
        const view = this;

        view.toggleIsShowMore();
    };

    renderShowMoreButton(): Node {
        const view = this;
        const {props, state} = view;

        const {badgeWonServerData, isShowMore} = state;

        if (badgeWonServerData === null) {
            return null;
        }

        const isNeedToShowButton = view.getNaturalPeopleListHeight() > view.getAvailableAreaHeight();

        if (isNeedToShowButton === false) {
            return null;
        }

        if (isShowMore) {
            return (
                <button
                    className={classNames(style.show_more_less_button, style.show_more_less_button__open)}
                    onClick={view.handleShowMore}
                    onKeyPress={view.handleShowMore}
                    type="button"
                >
                    <Locale stringKey="BADGE_WON_LIST__SHOW_LESS"/>
                    <span className={style.show_more_less_button__arrow}>‹</span>
                </button>
            );
        }

        const {toUsers} = badgeWonServerData;

        return (
            <button
                className={style.show_more_less_button}
                onClick={view.handleShowMore}
                onKeyPress={view.handleShowMore}
                type="button"
            >
                <Locale stringKey="BADGE_WON_LIST__SHOW_ALL"/>
                {': '}
                {toUsers.length}
                <span className={style.show_more_less_button__arrow}>‹</span>
            </button>
        );
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
            <>
                <div
                    className={classNames(style.people_list, {[style.people_list__open]: isShowMore})}
                    ref={view.node.faceList}
                    style={view.getPeopleListStyle()}
                >
                    {toUsers.map((userData: {+id: string | number, +imageUrl: string, +name: string}): Node => {
                        return (
                            <div className={style.won_badge_face} key={userData.id}>
                                <div
                                    className={style.won_badge_face_image}
                                    style={{
                                        backgroundImage: `url('${userData.imageUrl}')`,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
                {view.renderShowMoreButton()}
            </>
        );
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <HalfPopup
                className={{
                    containerPosition: style.half_popup__container_position__extra,
                    container: style.half_popup__container__extra,
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

const ConnectedComponent = connect<ComponentType<BadgeWon>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system,
    }),
    reduxAction
)(BadgeWon);

export {ConnectedComponent as BadgeWon};
