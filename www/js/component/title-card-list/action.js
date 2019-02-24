// @flow

import type {GetNewsAchtungListType, GetNewsListType} from './api';
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

export type ApplyGetNewAchtungListResponseType = {|
    +type: 'title-card-list__apply-get-new-achtung-list-response',
    +payload: {|
        +getNewsAchtungListResponse: GetNewsAchtungListType,
        +inBegin: boolean,
    |},
|};

export function applyGetNewAchtungListResponse(
    getNewsAchtungListResponse: GetNewsAchtungListType,
    inBegin: boolean
): ApplyGetNewAchtungListResponseType {
    return {
        type: titleCardListConst.action.type.applyGetNewAchtungListResponse,
        payload: {
            getNewsAchtungListResponse,
            inBegin,
        },
    };
}
