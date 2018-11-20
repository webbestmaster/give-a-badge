// @flow

/* global window, fetch */

import {appConst, serverApi} from '../../../app/const';
import {fetchX} from '../../../lib/fetch-x';

export type FoundedUserType = {
    +id: number,
    +name: string,
    +imageUrl: string,
};

export type FoundedUserListType = Array<FoundedUserType>;

export async function searchUser(query: string): Promise<FoundedUserListType | null> {
    const searchUserUrl = appConst.api.searchUser;

    const response = await fetchX<FoundedUserListType>(
        searchUserUrl.replace('{userName}', query),
        serverApi.request.paramMap.get
    );

    if (response instanceof Error) {
        console.error('searchPeople: can not get badge category list', query, searchUserUrl);
        console.error(response);
        return null;
    }

    return response;
}

export type BadgeAssignInputType = {|
    +badgeId: number,
    +comment: string,
    +tags: Array<string>,
    +usersIds: Array<number>,
|};

export type BadgeAssignResponseType = mixed;

export async function badgeAssign(badgeAssigneeInput: BadgeAssignInputType): Promise<BadgeAssignResponseType | null> {
    const badgeAssignUrl = appConst.api.badgeAssign;

    const response = await window
        .fetch(badgeAssignUrl, {
            ...serverApi.request.paramMap.postJSON,
            body: JSON.stringify(badgeAssigneeInput),
        })
        .catch(
            (error: Error): Error => {
                console.error('badgeAssign: can not give badge', badgeAssignUrl, badgeAssigneeInput);
                console.error(error);
                return error;
            }
        );

    if (response instanceof Error) {
        console.error('badgeAssign: can not give badge', badgeAssignUrl, badgeAssigneeInput);
        console.error(response);
        return null;
    }

    return true;
}
