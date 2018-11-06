// @flow

/* global window */

import {appConst} from '../../app/const';
import {defaultFetchGetProps} from '../auth/api';

export type BadgeType = {
    +id: number,
    +name: string,
    +description: string,
    +category: string,
    +imageUrl: string,
};

export type BadgeCategoryListType = {[key: string]: Array<BadgeType>};

export async function getBadgeCategoryList(): Promise<BadgeCategoryListType | Error> {
    const getBadgeCategoryListUrl = appConst.api.getBadgeCategoryList;

    return window
        .fetch(getBadgeCategoryListUrl, defaultFetchGetProps)
        .then((response: Response): Promise<BadgeCategoryListType> => response.json())
        .catch(
            (error: Error): Error => {
                console.log('can not get category list');
                console.error(error);
                return error;
            }
        );
}
