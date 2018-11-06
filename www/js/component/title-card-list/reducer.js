// @flow

import {combineReducers} from 'redux';
import {titleCardListConst} from './const';
import type {ActionDataType} from '../../app/reducer-type';
import type {GetNewsListType} from './api';

export type TitleNewsListType = {|
    +newsResponseList: Array<GetNewsListType>,
|};

type ReduceMapType = {|
    +newsResponseList: (newsResponseList: Array<GetNewsListType>, actionData: ActionDataType) => Array<GetNewsListType>,
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
});

export {titleNewsList};
