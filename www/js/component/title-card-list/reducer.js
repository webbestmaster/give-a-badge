// @flow

import {combineReducers} from 'redux';

import type {ActionDataType} from '../../app/reducer-type';

import {titleCardListConst} from './const';
import type {GetNewsListType, GetNewsAchtungListType} from './api';

export type TitleNewsListType = {|
    +newsResponseList: Array<GetNewsListType>,
    +newsAchtungResponseList: Array<GetNewsAchtungListType>,
|};

type ReduceMapType = {|
    +newsResponseList: (newsResponseList: Array<GetNewsListType>, actionData: ActionDataType) => Array<GetNewsListType>,
    +newsAchtungResponseList: (
        newsResponseList: Array<GetNewsAchtungListType>,
        actionData: ActionDataType
    ) => Array<GetNewsAchtungListType>,
|};

const titleNewsList = combineReducers<ReduceMapType, TitleNewsListType>({
    newsResponseList: (
        newsResponseList: Array<GetNewsListType> = [],
        actionData: ActionDataType
    ): Array<GetNewsListType> => {
        if (actionData.type !== titleCardListConst.action.type.applyGetNewListResponse) {
            return newsResponseList;
        }

        if (typeof actionData.payload === 'undefined') {
            return newsResponseList;
        }

        const {getNewsListResponse} = actionData.payload;

        return actionData.payload.inBegin ?
            [getNewsListResponse, ...newsResponseList] :
            [...newsResponseList, getNewsListResponse];
    },
    newsAchtungResponseList: (
        newsResponseList: Array<GetNewsAchtungListType> = [],
        actionData: ActionDataType
    ): Array<GetNewsAchtungListType> => {
        if (actionData.type !== titleCardListConst.action.type.applyGetNewAchtungListResponse) {
            return newsResponseList;
        }

        if (typeof actionData.payload === 'undefined') {
            return newsResponseList;
        }

        const {getNewsAchtungListResponse} = actionData.payload;

        return actionData.payload.inBegin ?
            [getNewsAchtungListResponse, ...newsResponseList] :
            [...newsResponseList, getNewsAchtungListResponse];
    },
});

export {titleNewsList};
