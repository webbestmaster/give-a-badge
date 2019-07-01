// @flow

/* global window */

import {appConst, serverApi} from '../../app/const';

/*
export type BadgeType = {
    +id: number,
    +name: string,
    +description?: string,
    +category: string,
    +imageUrl: string,
/!*
    +settings?: {
        +countLeft?: number,
        +toUsersMax?: number,
        +special: boolean,
    },
*!/
};
*/

export type BadgeType = {
    +id: number,
    +name: string,
    +description: string | null,
    +category: string,
    +imageUrl: string,
    +settings: {
        +countLeft: number | null,
        +toUsersMax: number | null,
        +special: boolean,
    } | null,
};

export type BadgeCategoryListType = {[key: string]: Array<BadgeType>};

export async function getBadgeCategoryList(): Promise<BadgeCategoryListType | Error> {
    const getBadgeCategoryListUrl = appConst.api.getBadgeCategoryList;

    return window
        .fetch(getBadgeCategoryListUrl, serverApi.request.paramMap.get)
        .then((response: Response): Promise<BadgeCategoryListType> => response.json())
        .catch((error: Error): Error => {
            console.log('can not get category list');
            console.error(error);
            return error;
        });
}
