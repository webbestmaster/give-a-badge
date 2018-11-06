// @flow

/* global window */

import {appConst} from '../../app/const';

export type BadgeWonServerDataType = {
    +author: {
        +id: string | number,
        +imageUrl: string,
        +name: string,
    },
    +comment: string,
    +date: number,
    +reason: {
        +id: string | number,
        +imageUrl: string,
        +name: string,
    },
    +toUsers: Array<{
        +id: string | number,
        +imageUrl: string,
        +name: string,
    }>,
};

export async function getBadgeWonServerData(badgeId: string | number): Promise<BadgeWonServerDataType | Error> {
    const getBadgeWonUrl = appConst.api.getBadgeWon.replace('{badgeId}', String(badgeId));

    return window
        .fetch(getBadgeWonUrl)
        .then((response: Response): Promise<BadgeWonServerDataType> => response.json())
        .catch(
            (error: Error): Error => {
                console.error('can not get badge won');
                console.error(error);
                return error;
            }
        );
}
