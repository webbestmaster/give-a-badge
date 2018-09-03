// @flow

/* global window */

import appConst from '../../app-const';
import {defaultFetchProps} from '../auth/api';
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

    const response = await fetchX<BadgeCategoryListType>(getBadgeCategoryListUrl, defaultFetchProps);

    if (response instanceof Error) {
        return null;
    }

    return response;
}
