// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app/reducer';
import style from './style.scss';
import type {ExtractedCategoryType} from '../helper';
import HalfPopupSubHeader from '../../ui/half-popup/sub-header/c-sub-header';
import type {BadgeCategoryType} from '../api';
import Link from 'react-router-dom/Link';
import classNames from 'classnames';
import serviceStyle from '../../../../css/service.scss';
import {getBadgePath} from '../../app/routes';

type ReduxPropsType = {|
    +reduxProp: boolean
|};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    +category: ExtractedCategoryType
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{
    // eslint-disable-next-line id-match
    ...$Exact<PassedPropsType>,
    // eslint-disable-next-line id-match
    ...$Exact<ReduxPropsType>,
    // eslint-disable-next-line id-match
    ...$Exact<ReduxActionType>,
    +children?: Node
}>;

type StateType = {|
    +state: number
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeCategoryListItem extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0
        };
    }

    renderBadgeList(): Node {
        const view = this;
        const {props, state} = view;
        const {category} = props;
        const {list} = category;

        return (
            <div className={style.badge_item_list}>
                {list.map(
                    (badgeCategory: BadgeCategoryType): Node => {
                        return (
                            <Link
                                key={badgeCategory.id}
                                to={getBadgePath(badgeCategory.id)}
                                className={style.badge_item}
                            >
                                <img className={style.badge_image} src={badgeCategory.imageUrl} alt=""/>
                            </Link>
                        );
                    }
                )}
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {category} = props;

        return (
            <div className={classNames(serviceStyle.clear_self, style.badge_category_list)}>
                <HalfPopupSubHeader>{category.name}</HalfPopupSubHeader>
                {view.renderBadgeList()}
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        reduxProp: true
    }),
    reduxAction
)(BadgeCategoryListItem);
