// @flow

/* global BUILD_DATE */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, void> {
    render(): Node {
        return (
            <div>
                <h1 className={style.logo}>GaB</h1>
            </div>
        );
    }
}
