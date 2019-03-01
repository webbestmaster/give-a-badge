// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import withRouter from 'react-router-dom/withRouter';

import type {SystemType} from '../../system/reducer/root';
import type {BadgeType} from '../../badge-category-list/api';
import type {GlobalStateType} from '../../../app/reducer';
import type {ContextRouterType} from '../../../../type/react-router-dom-v4';
import {Locale} from '../../locale/c-locale';
import {isNumber} from '../../../lib/is';

import style from './style.scss';

type ReduxPropsType = {|
    +system: SystemType,
|};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    +badgeInfo: BadgeType,
|};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    ...$Exact<ContextRouterType>,
    +children: Node,
}>;

type StateType = void;

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeInfo extends Component<ReduxPropsType, PassedPropsType, StateType> {
    state: StateType;

    props: PropsType;

    renderBadgeLeft(): Node {
        const view = this;
        const {props} = view;
        const {badgeInfo} = props;
        const {countLeft} = badgeInfo;

        if (!isNumber(countLeft)) {
            return null;
        }

        return (
            <h5 className={style.badge_left}>
                <Locale stringKey="GIVE_THE_BADGE__BADGE_LEFT" valueMap={{left: countLeft}}/>
            </h5>
        );
    }

    renderBadgeImage(): Node {
        const view = this;
        const {props} = view;
        const {badgeInfo} = props;

        return (
            <>
                <div
                    className={style.badge_image}
                    style={{backgroundImage: `url('${badgeInfo.imageUrl}')`}}
                    title={badgeInfo.name}
                />
                {view.renderBadgeLeft()}
            </>
        );
    }

    renderDesktop(): Node {
        const view = this;
        const {props, state} = view;
        const {badgeInfo} = props;

        return (
            <div className={style.badge_info}>
                <div className={style.badge_image__wrapper}>{view.renderBadgeImage()}</div>
                <div className={style.text_block}>
                    <h3 className={style.badge_header}>{badgeInfo.name}</h3>
                    <p className={style.badge_p}>{badgeInfo.description}</p>
                </div>
            </div>
        );
    }

    renderMobile(): Node {
        const view = this;
        const {props} = view;
        const {badgeInfo} = props;

        return (
            <div className={style.badge_info}>
                <div
                    className={style.badge_image}
                    style={{backgroundImage: `url('${badgeInfo.imageUrl}')`}}
                    title={badgeInfo.name}
                />
                <div className={classNames(style.text_block, style.text_block_mobile)}>
                    <h3 className={style.badge_header}>{badgeInfo.name}</h3>
                </div>
                <div className={style.badge_p_mobile_wrapper}>
                    <p className={style.badge_p}>{badgeInfo.description}</p>
                </div>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return props.system.screen.isMobile ? view.renderMobile() : view.renderDesktop();
    }
}

const ConnectedComponent = connect<ComponentType<BadgeInfo>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        system: state.system,
    }),
    reduxAction
)(withRouter(BadgeInfo));

export {ConnectedComponent as BadgeInfo};
