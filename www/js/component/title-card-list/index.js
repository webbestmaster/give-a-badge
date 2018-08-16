// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import type {AuthType} from '../auth/reducer';
import TitleCard from '../title-card';
import type {ApplyGetNewListResponseType} from './action';
import {applyGetNewListResponse} from './action';
import * as api from './api';
import type {GetNewsListType, NewsType} from './api';
import type {TitleNewsListType} from './reducer';
import {extractNewsList} from './helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../ui/spinner';

type ReduxPropsType = {|
    +auth: AuthType,
    +titleNewsList: TitleNewsListType
|};

type ReduxActionType = {|
    +applyGetNewListResponse: (getNewsListResponse: GetNewsListType) => ApplyGetNewListResponseType
|};

type PassedPropsType = {
    // +passedProp: string
};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...PassedPropsType, ...ReduxActionType, ...ReduxPropsType, +children?: Node}>;

type StateType = null;

const reduxAction: ReduxActionType = {
    applyGetNewListResponse
};

const pageSize = 1;

class TitleCardList extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    async fetchNews(): Promise<void> {
        const view = this;
        const {props} = view;
        const {auth, applyGetNewListResponse: applyGetNewListResponseAction, titleNewsList} = props;
        const {newsResponseList} = titleNewsList;

        const pageIndex = newsResponseList.length;

        const getNewsListResponse = await api.getNewsList(pageIndex, pageSize, auth.user.id);

        if (getNewsListResponse === null) {
            console.error('can not get news list');
            return;
        }

        applyGetNewListResponseAction(getNewsListResponse);
    }

    async componentDidUpdate(prevProps: PropsType, prevState: StateType, snapshot?: mixed): Promise<void> {
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

    renderCardList(): Node {
        const view = this;
        const {props} = view;
        const {titleNewsList} = props;

        const newsList = extractNewsList(titleNewsList);
        const {newsResponseList} = titleNewsList;
        const newsResponseListLength = newsResponseList.length;

        if (newsResponseListLength === 0) {
            return null;
        }

        const lastNewsResponse = newsResponseList[newsResponseListLength - 1];

        return (
            <InfiniteScroll
                dataLength={newsList.length} // This is important field to render the next data
                next={(): Promise<void> => view.fetchNews()}
                hasMore={!lastNewsResponse.last}
                loader={<Spinner/>}
            >
                <div className={style.card_list}>
                    {newsList.map(
                        (newsInList: NewsType): Node =>
                            <TitleCard key={newsInList.id} newsData={newsInList}/>

                    )}
                </div>
            </InfiniteScroll>
        );
    }

    render(): Node {
        const view = this;

        return view.renderCardList();
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth,
        titleNewsList: state.titleNewsList
    }),
    reduxAction
)(TitleCardList);
