// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import style from './style.scss';
import Locale from '../../component/locale';
import Header from '../../component/header';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, void> {
    render(): Array<Node> {
        return [
            <Header key="header"/>,
            <div key="other">
                <Locale stringKey="SPACE"/>
                <h1 className={style.logo}>GaB</h1>
            </div>
        ];
    }
}
