// @flow

import React from 'react';
import type {Node} from 'react';
import style from './snack-bar-wrapper.style.scss';

export function SnackBarWrapper({children}: {children: Node | Array<Node>}): Node {
    return <div className={style.snack_bar_wrapper}>{children}</div>;
}
