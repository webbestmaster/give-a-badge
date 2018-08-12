// @flow

import {combineReducers} from 'redux';
import {titleCardListConst} from './const';
import type {ActionDataType} from '../../app-reducer-type';
import type {NewsType, GetNewsListType} from './api';

export type TitleNewsListType = {|
    +newsResponseList: Array<GetNewsListType>
|};

export default combineReducers({
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

        return [...newsResponseList, actionData.payload.getNewsListResponse];
    }
});
