// @flow

import appConst from '../../../app-const';
import {defaultFetchProps} from '../../auth/api';
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

    const response = await fetchX<FoundedUserListType>(searchUserUrl.replace('{userName}', query), defaultFetchProps);

    if (response instanceof Error) {
        console.error('searchPeople: can not get badge category list', query, searchUserUrl);
        console.error(response);
        return null;
    }

    return response;
}
