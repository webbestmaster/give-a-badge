// @flow

/* global window */

import appConst from '../../app-const';
import {defaultFetchProps} from '../auth/api';

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

    const response: Response = await window.fetch(getBadgeCategoryListUrl, defaultFetchProps);

    if (response.ok) {
        return await response.json();
    }

    return null;
}
