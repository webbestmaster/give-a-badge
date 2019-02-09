// @flow

/* eslint consistent-this: ["error", "view"] */

/* global window */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import style from './style.scss';
import type {AuthType} from '../auth/reducer';
import {TitleCard} from '../title-card/c-title-card';
import type {ApplyGetNewListResponseType} from './action';
import {applyGetNewListResponse} from './action';
import type {GetNewsListType, NewsType} from './api';
import * as api from './api';
import type {TitleNewsListType} from './reducer';
import {extractNewsList} from './helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Spinner} from '../ui/spinner/c-spinner';

type ReduxPropsType = {|
    +auth: AuthType,
    +titleNewsList: TitleNewsListType,
|};

type ReduxActionType = {|
    +applyGetNewListResponse: (getNewsListResponse: GetNewsListType, inBegin: boolean) => ApplyGetNewListResponseType,
|};

type PassedPropsType = {
    // +passedProp: string
};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...PassedPropsType, ...ReduxActionType, ...ReduxPropsType, +children?: Node}>;

type StateType = null;

const reduxAction: ReduxActionType = {
    applyGetNewListResponse,
};

export const pageSize = 20;

class TitleCardList extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

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

    componentDidMount() {
        const view = this;

        view.fetchNews();
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
        const {newsResponseList} = titleNewsList;
        const newsResponseListLength = newsResponseList.length;

        if (newsResponseListLength === 0) {
            return null;
        }

        const lastNewsResponse = newsResponseList[newsResponseListLength - 1];

        return (
            <InfiniteScroll
                dataLength={newsList.length} // This is important field to render the next data
                next={view.infiniteScrollNext}
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

const ConnectedComponent = connect<ComponentType<TitleCardList>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth,
        titleNewsList: state.titleNewsList,
    }),
    reduxAction
)(TitleCardList);

export {ConnectedComponent as TitleCardList};
