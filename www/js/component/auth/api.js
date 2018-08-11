// @flow

/* global window, fetch */

import appConst from '../../app-const';

type GetMeResponseType = {|
    +hasGetMeError: boolean
|};

const defaultFetchProps = {
    credentials: 'include',
    headers: {
        'Access-Control-Allow-Headers': '*',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    mode: 'no-cors'
};

export async function getMe(): Promise<GetMeResponseType> {
    return await window
        .fetch(appConst.api.getMe, {
            ...defaultFetchProps,
            method: 'GET'
        })
        .then(
            async (response: Response): Promise<GetMeResponseType> => {
                if (response.ok) {
                    console.log(await response.json());
                    return {hasGetMeError: false};
                    // return response.json();
                }

                return {hasGetMeError: true};
            }
        );
}

type LoginMeResponseType = {|
    +hasErrorLogin: boolean
|};

export async function login(username: string, password: string): Promise<LoginMeResponseType> {
    return await window
        .fetch(appConst.api.login, {
            ...defaultFetchProps,
            method: 'POST',
            body: `username=${username}&password=${password}`
        })
        .then(
            async (response: Response): Promise<LoginMeResponseType> => {
                if (response.ok) {
                    console.log(await response.json());
                    return {hasErrorLogin: false};
                    // return response.json();
                }
                // console.log(await response.json());

                return {hasErrorLogin: true};
            }
        );
}
