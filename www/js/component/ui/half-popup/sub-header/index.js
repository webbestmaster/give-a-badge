// @flow
import React from 'react';
import type {Node} from 'react';
import style from './style.scss';

type PropsType = {|
    +children: Node
|};

export default function HalfPopupSubHeader(props: PropsType): Node {
    const {children} = props;

    return <h3 className={style.half_popup__sub_header}>{children}</h3>;
}
