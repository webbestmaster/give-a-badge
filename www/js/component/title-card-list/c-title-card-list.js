// @flow

/* eslint consistent-this: ["error", "view"] */

/* global window */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import type {GlobalStateType} from '../../app/reducer';
import type {AuthType} from '../auth/reducer';
import {TitleCard} from '../title-card/c-title-card';
import {TitleAchtungCard} from '../title-card/c-title-achtung-card';
import {Spinner} from '../ui/spinner/c-spinner';
import {Locale} from '../locale/c-locale';

import style from './style.scss';
import type {ApplyGetNewAchtungListResponseType, ApplyGetNewListResponseType} from './action';
import {applyGetNewAchtungListResponse, applyGetNewListResponse} from './action';
import type {GetNewsAchtungListType, GetNewsListType, NewsAchtungType, NewsType} from './api';
import * as api from './api';
import type {TitleNewsListType} from './reducer';
import {extractNewsAchtungList, extractNewsList} from './helper';

type ReduxPropsType = {|
    +auth: AuthType,
    +titleNewsList: TitleNewsListType,
|};

type ReduxActionType = {|
    +applyGetNewListResponse: (getNewsListResponse: GetNewsListType, inBegin: boolean) => ApplyGetNewListResponseType,
    +applyGetNewAchtungListResponse: (
        getNewsAchtungListResponse: GetNewsAchtungListType,
        inBegin: boolean
    ) => ApplyGetNewAchtungListResponseType,
|};

type PassedPropsType = {
    // +passedProp: string
};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...PassedPropsType, ...ReduxActionType, ...ReduxPropsType, +children?: Node}>;

type StateType = null;

const reduxAction: ReduxActionType = {
    applyGetNewListResponse,
    applyGetNewAchtungListResponse,
};

export const pageSize = 20;

class TitleCardList extends Component<ReduxPropsType, PassedPropsType, StateType> {
    static renderTitleCard(news: NewsType): Node {
        return <TitleCard key={news.id} newsData={news}/>;
    }

    static renderAchtungTitleCard(news: NewsAchtungType): Node {
        return <TitleAchtungCard key={news.entityId} newsData={news}/>;
    }

    state: StateType;

    componentDidMount() {
        const view = this;

        view.fetchNews();
        view.fetchNewsAchtung();
    }

    props: PropsType;

    async fetchNews(): Promise<null | GetNewsListType> {
        const view = this;
        const {props} = view;
        const {auth, applyGetNewListResponse: applyGetNewListResponseAction, titleNewsList} = props;
        const {newsResponseList} = titleNewsList;

        const pageIndex = newsResponseList.length;

        const getNewsListResponse = await api.getNewsList(pageIndex, pageSize);

        if (getNewsListResponse === null) {
            console.error('can not get news list');
            return null;
        }

        applyGetNewListResponseAction(getNewsListResponse, false);

        return getNewsListResponse;
    }

    async fetchNewsAchtung(): Promise<null | GetNewsAchtungListType> {
        const view = this;
        const {props} = view;
        const {auth, applyGetNewAchtungListResponse: applyGetNewAchtungListResponseAction, titleNewsList} = props;
        const {newsAchtungResponseList} = titleNewsList;

        const pageIndex = newsAchtungResponseList.length;

        const getNewsAchtungListResponse = await api.getNewsAchtungList(pageIndex, pageSize);

        if (getNewsAchtungListResponse === null) {
            console.error('can not get news achtung list');
            return null;
        }

        applyGetNewAchtungListResponseAction(getNewsAchtungListResponse, false);

        return getNewsAchtungListResponse;
    }

    /*
    async componentDidUpdate(prevProps: PropsType, prevState: StateType, snapshot?: mixed) {
        const view = this;
        const {props} = view;
        const {auth} = props;
        const prevAuth = prevProps.auth;

        if (auth.user.email !== prevAuth.user.email) {
            console.log('login detected, fetch news');
            await view.fetchNews();
            return;
        }
    }
*/

    infiniteScrollNext = async () => {
        const view = this;

        const fetchNewsKListResult = await view.fetchNews();

        if (fetchNewsKListResult === null) {
            return;
        }

        if (!window.ga) {
            console.error('google analytics is not define');
            return;
        }

        window.ga('send', 'event', 'Badge List Load', fetchNewsKListResult.last === true ? 'Finish' : 'Part');
    };

    renderCardList(): Node {
        const view = this;
        const {props} = view;
        const {titleNewsList} = props;

        const newsList = extractNewsList(titleNewsList);
        const newsAchtungList = extractNewsAchtungList(titleNewsList);
        const {newsResponseList} = titleNewsList;
        const newsResponseListLength = newsResponseList.length;

        if (newsResponseListLength === 0) {
            return null;
        }

        const lastNewsResponse = newsResponseList[newsResponseListLength - 1];

        return (
            <InfiniteScroll
                dataLength={newsList.length} // This is important field to render the next data
                hasMore={!lastNewsResponse.last}
                loader={<Spinner/>}
                next={view.infiniteScrollNext}
            >
                <div className={style.card_list}>
                    <h3 className={style.card_list_container__header}>
                        <Locale stringKey="TITLE_BADGE_LIST__HEADER__ACHTUNG_NEWS"/>
                    </h3>
                    <div className={style.card_list_container}>
                        {newsAchtungList.map(TitleCardList.renderAchtungTitleCard)}
                    </div>
                    <h3 className={style.card_list_container__header}>
                        <Locale stringKey="TITLE_BADGE_LIST__HEADER__MAIN_NEWS"/>
                    </h3>
                    <div className={style.card_list_container}>{newsList.map(TitleCardList.renderTitleCard)}</div>
                </div>
            </InfiniteScroll>
        );
    }

    render(): Node {
        const view = this;

        return view.renderCardList();
    }
}

const ConnectedComponent = connect<ComponentType<TitleCardList>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth,
        titleNewsList: state.titleNewsList,
    }),
    reduxAction
)(TitleCardList);

export {ConnectedComponent as TitleCardList};
