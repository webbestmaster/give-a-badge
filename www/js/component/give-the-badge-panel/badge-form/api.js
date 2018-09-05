// @flow

/* global fetch */

import appConst from '../../../app-const';
import {defaultFetchGetProps, defaultFetchPostProps} from '../../auth/api';
import {fetchX} from '../../../lib/fetch-x';

export type FoundedUserType = {|
    +id: number,
    +name: string,
    +email: null,
    +title: string | null,
    +imageUrl: string
|};

export type FoundedUserListType = Array<FoundedUserType>;

export async function searchUser(query: string): Promise<FoundedUserListType | null> {
    const searchUserUrl = appConst.api.searchUser;

    const response = await fetchX<FoundedUserListType>(
        searchUserUrl.replace('{userName}', query),
        defaultFetchGetProps
    );

    if (response instanceof Error) {
        console.error('searchPeople: can not get badge category list', query, searchUserUrl);
        console.error(response);
        return null;
    }

    return response;
}

export type BadgeAssignInputType = {|
    assignerId: number,
    badgeId: number,
    comment: string,
    tags: Array<string>,
    usersIds: Array<number>
|};

export type BadgeAssignResponseType = mixed;

export async function badgeAssign(badgeAssigneeInput: BadgeAssignInputType): Promise<BadgeAssignResponseType | null> {
    const badgeAssignUrl = appConst.api.badgeAssign;

    const response = await fetch(badgeAssignUrl, {
        ...defaultFetchPostProps,
        body: JSON.stringify(badgeAssigneeInput)
    });

    if (response instanceof Error) {
        console.error('badgeAssign: can not give badge', badgeAssignUrl, badgeAssigneeInput);
        console.error(response);
        return null;
    }

    return response;
}
