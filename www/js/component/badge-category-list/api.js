// @flow

/* global window */

import appConst from '../../app/const';
import {defaultFetchGetProps} from '../auth/api';
import {fetchX} from '../../lib/fetch-x';

export type BadgeCategoryType = {|
    +id: number,
    +name: string,
    +description: string,
    +category: string,
    +imageUrl: string
|};

export type BadgeCategoryListType = Array<BadgeCategoryType>;

export async function getBadgeCategoryList(): Promise<BadgeCategoryListType | null> {
    const getBadgeCategoryListUrl = appConst.api.getBadgeCategoryList;

    const response = await fetchX<BadgeCategoryListType>(getBadgeCategoryListUrl, defaultFetchGetProps);

    if (response instanceof Error) {
        console.error('getBadgeCategoryList: can not get badge category list', getBadgeCategoryListUrl);
        console.error(response);
        return null;
    }

    return response;
}
