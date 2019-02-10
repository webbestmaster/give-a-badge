// @flow

/* global window */

import {appConst, serverApi} from '../../app/const';

export const newsInfo = {
    type: {
        badgeAssignment: 'BADGE_ASSIGNMENT',
        campaignResults: 'CAMPAIGN_RESULTS',
    },
};

export type NewsTypeType = 'BADGE_ASSIGNMENT' | 'CAMPAIGN_RESULTS';
export type NewsUserType = {|
    +id: number,
    +name: string,
    +imageUrl: string,
|};

export type NewsType = {|
    +author: NewsUserType | null,
    +date: number,
    +comment: string,
    +entityId: number,
    +id: number,
    +newsType: NewsTypeType,
    +reason: {|
        +id: number,
        +imageUrl: string,
        +name: string,
    |},
    +totalToUsers: number,
    +toUsers: Array<NewsUserType>,
    +tags: [],
|};

export type NewsAchtungType = {|
    +actionRequired: 'ASSIGN_BADGE' | 'LOOK_AT_CAMPAIGN_RESULTS',
    +comment: string,
    +entityId: number,
    +id: number | null,
    +imageUrl: string,
    +name: string | null,
    +toUsers: Array<NewsUserType> | null,
|};

export type GetNewsListType = {
    +content: Array<NewsType>,
    +first: boolean,
    +last: boolean,
    +number: number,
    +numberOfElements: number,
    +size: number,
    +sort: Array<{|
        +ascending: boolean,
        +descending: boolean,
        +direction: 'DESC' | 'ASC',
        +ignoreCase: boolean,
        +property: string,
        +nullHandling: 'NATIVE',
    |}>,
    +totalPages: number,
    +totalElements: number,
};

export type GetNewsAchtungListType = {
    ...GetNewsListType,
    +content: Array<NewsAchtungType>,
};

export async function getNewsList(pageIndex: number, pageSize: number): Promise<GetNewsListType | null> {
    const getNewUrl = appConst.api.getNews
        .replace('{pageIndex}', String(pageIndex))
        .replace('{pageSize}', String(pageSize));

    const response: Response = await window.fetch(getNewUrl, serverApi.request.paramMap.get);

    if (response.ok) {
        return await response.json();
    }

    return null;
}

export async function getNewsAchtungList(pageIndex: number, pageSize: number): Promise<GetNewsAchtungListType | null> {
    const getNewUrl = appConst.api.getNewsAchtung
        .replace('{pageIndex}', String(pageIndex))
        .replace('{pageSize}', String(pageSize));

    const response: Response = await window.fetch(getNewUrl, serverApi.request.paramMap.get);

    if (response.ok) {
        return await response.json();
    }

    return null;
}
