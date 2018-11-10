// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
import style from './style.scss';
import type {DataType} from '../api';
import classNames from 'classnames';

type PassedPropsType = {|
    +badgeList: Array<DataType>,
|};

type PropsType = $Exact<{
    ...PassedPropsType,
}>;

type StateType = {|
    +selectedBadgeIdList: Array<string | number>,
|};

export class BadgeList extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            selectedBadgeIdList: [],
        };
    }

    renderBadge = (badgeData: DataType, index: number): Node => {
        const view = this;
        const {state, props} = view;
        const {selectedBadgeIdList} = state;

        return (
            <button
                title={badgeData.name}
                type="button"
                key={`${index}/${badgeData.id}`}
                className={classNames(style.badge_tem, {
                    [style.badge_tem__selected]: selectedBadgeIdList.includes(badgeData.id),
                })}
            >
                <img className={style.badge_tem_image} src={badgeData.imageUrl} alt={badgeData.name}/>
            </button>
        );
    };

    render(): Node {
        const view = this;
        const {state, props} = view;

        return <div className={style.badge_list}>{props.badgeList.map(view.renderBadge)}</div>;
    }
}
