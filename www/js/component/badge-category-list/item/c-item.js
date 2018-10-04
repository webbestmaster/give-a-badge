// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app/reducer';
import style from './style.scss';
import HalfPopupSubHeader from '../../ui/half-popup/sub-header/c-sub-header';
import type {BadgeCategoryType} from '../api';
import Link from 'react-router-dom/Link';
import classNames from 'classnames';
import serviceStyle from '../../../../css/service.scss';
import {getBadgePath} from '../../app/routes';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    +name: string,
    +categoryList: Array<BadgeCategoryType>
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

type StateType = null;

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeCategoryListItem extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    renderBadgeList(): Node {
        const view = this;
        const {props, state} = view;
        const {categoryList} = props;

        return (
            <div className={style.badge_item_list}>
                {categoryList.map(
                    (badgeCategory: BadgeCategoryType): Node => {
                        return (
                            <Link
                                key={badgeCategory.id}
                                to={getBadgePath(badgeCategory.id)}
                                className={style.badge_item}
                            >
                                <div
                                    className={style.badge_image}
                                    style={{backgroundImage: `url('${badgeCategory.imageUrl}')`}}
                                />
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
        const {name} = props;

        return (
            <div className={classNames(serviceStyle.clear_self, style.badge_category_list)}>
                <HalfPopupSubHeader>{name}</HalfPopupSubHeader>
                {view.renderBadgeList()}
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(BadgeCategoryListItem);
