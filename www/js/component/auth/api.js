// @flow

/* global window, fetch */

import appConst from '../../app-const';

type GetMeResponseType = {|
    +hasError: boolean
|};

export async function getMe(): Promise<GetMeResponseType> {
    return await window
        .fetch(appConst.api.getMe, {
            credentials: 'include',
            method: 'GET',
            mode: 'no-cors'
        })
        .then(
            async (response: Response): Promise<{hasError: boolean}> => {
                if (response.ok) {
                    return {hasError: false};
                    // return response.json();
                }

                return {hasError: true};
            }
        );
}
