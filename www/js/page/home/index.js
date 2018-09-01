// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
// import style from './style.scss';
import Header from '../../component/header';
import TitleCardList from '../../component/title-card-list';
import Route from 'react-router-dom/Route';
import BadgeCategoryList from '../../component/badge-category-list';
import GiveTheBadgePanel from '../../component/give-the-badge-panel';
import Switch from 'react-router-dom/Switch';
// import BrowserRouter from 'react-router-dom/BrowserRouter';
import withRouter from 'react-router-dom/withRouter';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import type {SystemType} from '../../component/system/reducer';
import routes from '../../app/routes';
// import type {ContextRouterType} from '../../../type/react-router-dom-v4';

type ReduxPropsType = {|
    +system: SystemType
|};

type ReduxActionType = {};
type PassedPropsType = {};
type StateType = null;

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        +children: Node
    }>>;

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    render(): Array<Node> {
        return [
            <Header key="header"/>,
            <TitleCardList key="title-card-list"/>,
            <Switch key="home-switch">
                <Route component={BadgeCategoryList} path={routes.index.badgeCategoryList} exact/>
                <Route component={GiveTheBadgePanel} path={routes.index.giveTheBadge} exact/>
            </Switch>
        ];
    }
}

export default withRouter(
    connect(
        (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
            system: state.system
        }),
        {}
    )(Home)
);
