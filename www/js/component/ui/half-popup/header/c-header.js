// @flow

import type {Node} from 'react';
import React from 'react';
import style from './style.scss';

type PropsType = {|
    +children: Node,
|};

export default function HalfPopupHeader(props: PropsType): Node {
    const {children} = props;

    return <h3 className={style.half_popup__header}>{children}</h3>;
}
