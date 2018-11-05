// @flow

import type {GetNewsListType} from './api';
import {titleCardListConst} from './const';

export type ApplyGetNewListResponseType = {|
    +type: 'title-card-list__apply-get-new-list-response',
    +payload: {|
        +getNewsListResponse: GetNewsListType,
        +inBegin: boolean,
    |},
|};

export function applyGetNewListResponse(
    getNewsListResponse: GetNewsListType,
    inBegin: boolean
): ApplyGetNewListResponseType {
    return {
        type: titleCardListConst.action.type.applyGetNewListResponse,
        payload: {
            getNewsListResponse,
            inBegin,
        },
    };
}
