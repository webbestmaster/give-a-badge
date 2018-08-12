// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import type {AuthType} from '../auth/reducer';
import TitleCard from '../title-card';

type ReduxPropsType = {|
    +auth: AuthType
|};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {
    // +passedProp: string
};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...PassedPropsType, ...ReduxActionType, ...ReduxPropsType, +children?: Node}>;

type StateType = null;

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class TitleCardList extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    async fetchNews(): Promise<void> {}

    async componentDidUpdate(prevProps: PropsType, prevState: StateType): Promise<void> {
        const view = this;
        const {props} = view;
        const {auth} = props;
        const prevAuth = prevProps.auth;

        if (auth.user.id !== prevAuth.user.id) {
            console.log('login detected, fetch news');
            await view.fetchNews();
            return;
        }
    }

    renderCard(): Node {
        return <TitleCard key={Math.random()}/>;
    }

    renderCardList(): Node {
        const view = this;

        return (
            <div key="card-list" className={style.card_list}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((): Node => view.renderCard())}
            </div>
        );
    }

    render(): Node {
        const view = this;

        return <div className={style.card_list}>{view.renderCardList()}</div>;
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth
    }),
    reduxAction
)(TitleCardList);
