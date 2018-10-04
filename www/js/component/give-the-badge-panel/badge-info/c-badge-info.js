// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app/reducer';
import type {BadgeCategoryType} from '../../badge-category-list/api';
import {getBadgeCategoryList} from '../../badge-category-list/api';
import style from './style.scss';
import type {SystemType} from '../../system/reducer/root';
import classNames from 'classnames';
import withRouter from 'react-router-dom/withRouter';
import routes from '../../app/routes';
import type {ContextRouterType} from '../../../../type/react-router-dom-v4';

type ReduxPropsType = {|
    +system: SystemType
|};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    +badgeId: string
|};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        ...$Exact<ContextRouterType>,
        +children: Node
    }>>;

type StateType = {|
    +badgeInfo: BadgeCategoryType | null
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeInfo extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            badgeInfo: null
        };
    }

    async fetchBadgeInfo(): Promise<BadgeCategoryType | null> {
        const view = this;
        const {props, state} = view;
        const {badgeId} = props;

        const badgeCategoryList = await getBadgeCategoryList();

        if (badgeCategoryList === null) {
            console.error('can not get getBadgeCategoryList', badgeCategoryList);
            return null;
        }

        const allBadgeList = [];

        Object.keys(badgeCategoryList).forEach((key: string) => {
            allBadgeList.push(...badgeCategoryList[key]);
        });

        const badgeInfo =
            allBadgeList.find(
                (badgeCategoryInList: BadgeCategoryType): boolean => String(badgeCategoryInList.id) === badgeId
            ) || null;

        if (badgeInfo === null) {
            console.error('can not find badgeInfo');
            console.error('move to home page');
            props.history.push(routes.index.index);
            return null;
        }

        view.setState({badgeInfo});

        return badgeInfo;
    }

    async componentDidMount(): Promise<void> {
        const view = this;

        await view.fetchBadgeInfo();
    }

    renderDesktop(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeInfo} = state;

        if (badgeInfo === null) {
            return null;
        }

        return (
            <div className={style.badge_info}>
                <div
                    className={style.badge_image}
                    style={{backgroundImage: `url('${badgeInfo.imageUrl}')`}}
                    title={badgeInfo.name}
                />
                <div className={style.text_block}>
                    <h3 className={style.badge_header}>{badgeInfo.name}</h3>
                    <p className={style.badge_p}>{badgeInfo.description}</p>
                </div>
            </div>
        );
    }

    renderMobile(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeInfo} = state;

        if (badgeInfo === null) {
            return null;
        }

        return (
            <div className={style.badge_info}>
                <div
                    className={style.badge_image}
                    style={{backgroundImage: `url('${badgeInfo.imageUrl}')`}}
                    title={badgeInfo.name}
                />
                <div className={classNames(style.text_block, style.text_block_mobile)}>
                    <h3 className={style.badge_header}>{badgeInfo.name}</h3>
                </div>
                <div className={style.badge_p_mobile_wrapper}>
                    <p className={style.badge_p}>{badgeInfo.description}</p>
                </div>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return props.system.screen.isMobile ? view.renderMobile() : view.renderDesktop();
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system
    }),
    reduxAction
)(withRouter(BadgeInfo));
