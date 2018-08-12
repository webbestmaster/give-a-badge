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
    +id: number,
    +entityId: number,
    +newsType: NewsTypeType,
    +comment: string,
    +toUsers: Array<NewsUserType>,
    +author: NewsUserType,
    +tags: [],
    +date: number
|};

export type GetNewsListType = {|
    +content: Array<NewsType>,
    +last: boolean,
    +totalPages: number,
    +totalElements: number,
    +sort: Array<{|
        +direction: 'DESC' | 'ASC',
        +property: string,
        +ignoreCase: boolean,
        +nullHandling: 'NATIVE',
        +descending: boolean,
        +ascending: boolean
    |}>,
    +numberOfElements: number,
    +first: boolean,
    +size: number,
    +number: number
|};

export async function getNewsList(
    pageIndex: number,
    pageSize: number,
    userId: number
): Promise<GetNewsListType | null> {
    const getNewUrl = appConst.api.getNews
        .replace('{pageIndex}', String(pageIndex))
        .replace('{pageSize}', String(pageSize))
        .replace('{userId}', String(userId));

    return await window.fetch(getNewUrl, defaultFetchProps).then(
        async (response: Response): Promise<GetNewsListType | null> => {
            if (response.ok) {
                return await response.json();
            }
            return null;
        }
    );
}
