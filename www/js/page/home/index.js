// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import Header from '../../component/header';
import TitleCard from '../../component/title-card';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, void> {
    renderCard(): Node {
        return <TitleCard key={Math.random()}/>;
    }

    renderCardList(): Node {
        const view = this;

        return (
            <div key="card-list" className={style.card_list}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((): Node => view.renderCard())}
            </div>
        );
    }

    render(): Array<Node> {
        const view = this;

        return [<Header key="header"/>, view.renderCardList()];
    }
}
