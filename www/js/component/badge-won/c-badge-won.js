// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';
import HalfPopup from '../ui/half-popup/c-half-popup';
import HalfPopupHeader from '../ui/half-popup/header/c-header';
import {getBadgeWonServerData} from './api';
import type {BadgeWonServerDataType} from './api';
import moment from 'moment';
import {isString} from '../../lib/is';
import routes from '../app/routes';

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
            <HalfPopupHeader>
                <img src={imageUrl} alt={name}/>
                <span>{name}</span>
            </HalfPopupHeader>
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
            <div>
                <img src={imageUrl} alt={name}/>
                <h3>{name}</h3>
                <p>{moment(date).format('DD.MM.YYYY')}</p>
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

        return <p>{badgeWonServerData.comment}</p>;
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
            <div>
                {toUsers.map(
                    (userData: {+id: string | number, +imageUrl: string, +name: string}): Node => {
                        return (
                            <div key={userData.id}>
                                <img src={userData.imageUrl} alt={userData.name}/>
                            </div>
                        );
                    }
                )}

                <button
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
            <HalfPopup>
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
