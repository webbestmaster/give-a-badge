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

export async function login(username: string, password: string): Promise<GetMeResponseType> {
    return await window
        .fetch(appConst.api.login, {
            credentials: 'include',
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `username=${username}&password=${password}`
        })
        .then(
            async (response: Response): Promise<{hasError: boolean}> => {
                if (response.ok) {
                    console.log(await response.json());
                    return {hasError: false};
                    // return response.json();
                }
                // console.log(await response.json());

                return {hasError: true};
            }
        );
}
