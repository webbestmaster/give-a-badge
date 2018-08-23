// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
// import style from './style.scss';
import Header from '../../component/header';
import TitleCardList from '../../component/title-card-list';
import Route from 'react-router-dom/Route';
import BadgeCategoryList from '../../component/badge-category-list';
import Switch from 'react-router-dom/Switch';
import BrowserRouter from 'react-router-dom/BrowserRouter';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, void> {
    render(): Array<Node> {
        return [
            <Header key="header"/>,
            <TitleCardList key="title-card-list"/>,
            <BrowserRouter basename="/" key="home-switch">
                <Switch key="home-switch">
                    <Route component={BadgeCategoryList} path="/badge-category-list" exact/>
                </Switch>
            </BrowserRouter>
        ];
    }
}
