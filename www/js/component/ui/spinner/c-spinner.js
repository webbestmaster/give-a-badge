// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './style.scss';
import classNames from 'classnames';

type PassedPropsType = {
    +isFullSize?: boolean,
};

// eslint-disable-next-line react/prefer-stateless-function
export class Spinner extends Component<PassedPropsType, void> {
    render(): Node {
        const view = this;
        const {props} = view;

        return (
            <div className={classNames(style.spinner_wrapper, {[style.spinner_wrapper__full_size]: props.isFullSize})}>
                <div className={style.spinner}>
                    <CircularProgress size={50}/>
                </div>
            </div>
        );
    }
}
