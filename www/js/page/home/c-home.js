// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
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
import {routes} from '../../component/app/routes';
import {LoadComponent} from '../../lib/c-load-component';
import {Spinner} from '../../component/ui/spinner/c-spinner';
import {NotFound} from '../../component/not-found/c-not-found';
import {defaultShowEventName, showSnackBar} from '../../component/ui/notification/action';

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
    props: PropsType;
    state: StateType;

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

    componentDidMount() {
        setTimeout((): mixed => showSnackBar('Queue of snack bars, item - 1', {}, defaultShowEventName), 1e3);
    }

    render(): Node {
        return (
            <>
                <Header key="header"/>
                <TitleCardList key="title-card-list"/>
                <Switch key="home-switch">
                    <Route component={() => null} path={routes.index.index} exact/>
                    <Route component={BadgeCategoryList} path={routes.index.badgeCategoryList} exact/>
                    <Route component={GiveTheBadgePanel} path={routes.index.giveTheBadge} exact/>
                    <Route component={BadgeWon} path={routes.index.badgeWon} exact/>
                    <Route component={Home.campaignStatistic} path={routes.index.statistic} exact/>
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
