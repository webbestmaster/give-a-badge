// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class Spinner extends Component<void, void> {
    render(): Node {
        return (
            <div className={style.spinner_wrapper}>
                <div className={style.spinner}>
                    <CircularProgress size={50} />
                </div>
            </div>
        );
    }
}
