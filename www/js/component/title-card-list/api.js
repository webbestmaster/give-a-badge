// @flow

/* global window */

import appConst from '../../app-const';
import {defaultFetchProps} from '../auth/api';

export type NewsTypeType = 'BADGE_ASSIGNMENT';
export type NewsUserType = {|
    +id: number,
    +name: string,
    +imageUrl: string
|};

export type NewsType = {|
    +author: NewsUserType,
    +comment: string,
    +id: number,
    +date: number,
    +entityId: number,
    +newsType: NewsTypeType,
    +reason: {|
        id: number,
        imageUrl: string,
        name: string
    |},
    +toUsers: Array<NewsUserType>,
    +tags: []
|};

export type GetNewsListType = {|
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
        +nullHandling: 'NATIVE'
    |}>,
    +totalPages: number,
    +totalElements: number
|};

export async function getNewsList(pageIndex: number, pageSize: number): Promise<GetNewsListType | null> {
    const getNewUrl = appConst.api.getNews
        .replace('{pageIndex}', String(pageIndex))
        .replace('{pageSize}', String(pageSize));

    const response: Response = await window.fetch(getNewUrl, defaultFetchProps);

    if (response.ok) {
        return await response.json();
    }

    return null;
}
