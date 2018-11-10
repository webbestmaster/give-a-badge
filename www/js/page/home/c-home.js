// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
// import style from './style.scss';
import {Header} from '../../component/header/c-header';
import {TitleCardList} from '../../component/title-card-list/c-title-card-list';
import Route from 'react-router-dom/Route';
import {BadgeCategoryList} from '../../component/badge-category-list/c-badge-category-list';
import {GiveTheBadgePanel} from '../../component/give-the-badge-panel/c-give-the-badge-panel';
import {BadgeWon} from '../../component/badge-won/c-badge-won';
import Switch from 'react-router-dom/Switch';
import withRouter from 'react-router-dom/withRouter';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import type {SystemType} from '../../component/system/reducer/root';
import {routes} from '../../component/app/routes';
import type {AuthType} from '../../component/auth/reducer';
import {defaultUserState} from '../../component/auth/reducer';
import {CampaignStatistic} from '../../component/campaign-statistic/c-campaign-statistic';

type ReduxPropsType = {|
    +system: SystemType,
    +auth: AuthType,
|};

type ReduxActionType = {};
type PassedPropsType = {};
type StateType = null;

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        +children: Node,
    }>>;

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    render(): Array<Node> {
        const view = this;
        const {props} = view;
        const {auth} = props;

        const defaultUserName = defaultUserState.name;

        return [
            defaultUserName === auth.user.name ? null : <Header key="header"/>,
            <TitleCardList key="title-card-list"/>,
            <Switch key="home-switch">
                <Route component={BadgeCategoryList} path={routes.index.badgeCategoryList} exact/>
                <Route component={GiveTheBadgePanel} path={routes.index.giveTheBadge} exact/>
                <Route component={BadgeWon} path={routes.index.badgeWon} exact/>
                <Route component={CampaignStatistic} path={routes.index.statistic} exact/>
            </Switch>,
        ];
    }
}

const ConnectedComponent = withRouter(
    connect(
        (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
            system: state.system,
            auth: state.auth,
        }),
        {}
    )(Home)
);

export {ConnectedComponent as Home};
