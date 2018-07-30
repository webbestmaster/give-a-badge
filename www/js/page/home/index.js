// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import Locale from '../../component/locale';
import Header from '../../component/header';
import TitleCard from '../../component/title-card';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, void> {
    renderCard(): Node {
        return <TitleCard key={Math.random()}/>;
    }

    renderCardList(): Array<Node> {
        const view = this;

        return [1, 2, 3].map((): Node => view.renderCard());
    }

    render(): Array<Node> {
        const view = this;

        return [
            <Header key="header"/>,
            <div key="other">
                <Locale stringKey="SPACE"/>
                <h1 className={style.logo}>GaB</h1>
                {view.renderCardList()}
            </div>
        ];
    }
}
