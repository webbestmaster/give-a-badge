// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
// import style from './style.scss';
import Header from '../../component/header';
import TitleCardList from '../../component/title-card-list';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, void> {
    render(): Array<Node> {
        return [<Header key="header"/>, <TitleCardList key="title-card-list"/>];
    }
}
