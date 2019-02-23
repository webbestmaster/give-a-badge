// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';

import style from './snack-bar.style.scss';

export type SnackBarTypeType = 'error' | 'info' | 'success' | 'warning' | null;

type PassedPropsType = {|
    +type: SnackBarTypeType,
|};

type PropsType = {
    ...$Exact<PassedPropsType>,
    +children: Node,
};

type StateType = void;

export class SnackBar extends Component<PropsType, StateType> {
    state: StateType;
    props: PropsType;

    // eslint-disable-next-line complexity
    renderIcon(): Node {
        const view = this;
        const {props} = view;
        const {type} = props;

        switch (type) {
            case 'error':
                return 'ERROR: ';
            // return <ErrorIcon className={style.icon}/>;
            case 'success':
                return 'SUCCESS: ';
            // return <CheckCircleIcon className={style.icon}/>;
            case 'warning':
                return 'WARNING: ';
            // return <WarningIcon className={style.icon}/>;
            case 'info':
                return 'INFO: ';
            // return <InfoIcon className={style.icon}/>;
            default:
                return null;
        }
    }

    render(): Node {
        const view = this;
        const {props} = view;
        const {children, type} = props;
        const className = type ? `${style.snack_bar} ${style[type]}` : style.snack_bar;

        return (
            <div className={className}>
                {this.renderIcon()}
                <div className={style.message}>{children}</div>
            </div>
        );
    }
}

/*
SnackBar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.string]))
    ]).isRequired,
    type: PropTypes.oneOf([snackBarTypes.error, snackBarTypes.warning, snackBarTypes.info, snackBarTypes.success])
};
*/
