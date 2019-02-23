// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import withRouter from 'react-router-dom/withRouter';
import {connect} from 'react-redux';

import {Header} from '../../component/header/c-header';
import {TitleCardList} from '../../component/title-card-list/c-title-card-list';
import {BadgeCategoryList} from '../../component/badge-category-list/c-badge-category-list';
import {GiveTheBadgePanel} from '../../component/give-the-badge-panel/c-give-the-badge-panel';
import {BadgeWon} from '../../component/badge-won/c-badge-won';
import type {GlobalStateType} from '../../app/reducer';
import {routes} from '../../component/app/routes';
import {LoadComponent} from '../../lib/c-load-component';
import {Spinner} from '../../component/ui/spinner/c-spinner';
import {NotFound} from '../../component/not-found/c-not-found';

type ReduxPropsType = {
    // +system: SystemType,
    // +auth: AuthType,
};

type ReduxActionType = {};
type PassedPropsType = {};
type StateType = null;

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    +children: Node,
}>;

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component<ReduxPropsType, PassedPropsType, StateType> {
    static async loadCampaignStatisticComponent(): Promise<Node> {
        const {CampaignStatistic} = await import('../../component/campaign-statistic/c-campaign-statistic');

        return <CampaignStatistic/>;
    }

    static campaignStatistic(): Node {
        return (
            <LoadComponent load={Home.loadCampaignStatisticComponent}>
                <Spinner isFullSize/>
            </LoadComponent>
        );
    }

    // need to show TitleCardList on index page
    static index(): null {
        return null;
    }

    state: StateType;
    props: PropsType;

    render(): Node {
        return (
            <>
                <Header key="header"/>
                <TitleCardList key="title-card-list"/>
                <Switch key="home-switch">
                    <Route component={Home.index} exact path={routes.index.index}/>
                    <Route component={BadgeCategoryList} exact path={routes.index.badgeCategoryList}/>
                    <Route component={GiveTheBadgePanel} exact path={routes.index.giveTheBadge}/>
                    <Route component={BadgeWon} exact path={routes.index.badgeWon}/>
                    <Route component={Home.campaignStatistic} exact path={routes.index.statistic}/>
                    <Route component={NotFound}/>
                </Switch>
            </>
        );
    }
}

const ConnectedComponent = withRouter(
    connect(
        (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
            // system: state.system,
            // auth: state.auth,
        }),
        {}
    )(Home)
);

export {ConnectedComponent as Home};
