// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import classNames from 'classnames';

import {HalfPopupSubHeader} from '../../ui/half-popup/sub-header/c-sub-header';
import type {BadgeType} from '../api';
import type {GlobalStateType} from '../../../app/reducer';
import serviceStyle from '../../../../css/service.scss';
import {getBadgePath} from '../../app/routes';

import style from './style.scss';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    +name: string,
    +categoryList: Array<BadgeType>,
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{
    // eslint-disable-next-line id-match
    ...$Exact<PassedPropsType>,
    // eslint-disable-next-line id-match
    ...$Exact<ReduxPropsType>,
    // eslint-disable-next-line id-match
    ...$Exact<ReduxActionType>,
    +children?: Node,
}>;

type StateType = null;

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeCategoryListItem extends Component<ReduxPropsType, PassedPropsType, StateType> {
    static renderItemLeft(badgeCategory: BadgeType): Node {
        const {settings} = badgeCategory;

        if (!settings) {
            return null;
        }

        const {countLeft} = settings;

        if (countLeft === null) {
            return null;
        }

        return <span className={style.badge_left}>{countLeft}</span>;
    }

    state: StateType;
    props: PropsType;

    renderBadgeList(): Node {
        const view = this;
        const {props, state} = view;
        const {categoryList} = props;

        return (
            <div className={style.badge_item_list}>
                {categoryList.map(
                    (badgeCategory: BadgeType): Node => {
                        return (
                            <Link
                                className={style.badge_item}
                                key={badgeCategory.id}
                                title={badgeCategory.name}
                                to={getBadgePath(badgeCategory.id)}
                            >
                                <div
                                    className={style.badge_image}
                                    style={{backgroundImage: `url('${badgeCategory.imageUrl}')`}}
                                />
                                <h5 className={style.badge_name}>{badgeCategory.name}</h5>
                                {BadgeCategoryListItem.renderItemLeft(badgeCategory)}
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

const ConnectedComponent = connect<
    ComponentType<BadgeCategoryListItem>,
    PassedPropsType,
    ReduxPropsType,
    ReduxActionType
>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(BadgeCategoryListItem);

export {ConnectedComponent as BadgeCategoryListItem};
