// @flow

/* global window, fetch */

import appConst from '../../app-const';
import type {UserType} from './reducer';

type GetMeResponseType = {|+hasError: true|} | {|+hasError: false, +userData: UserType|};

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
                    const userData: UserType = await response.json();

                    return {
                        hasError: false,
                        userData
                    };
                }

                return {hasError: true};
            }
        );
}

type LoginMeResponseType = {|
    +hasErrorLogin: boolean
|};

export async function login(username: string, password: string): Promise<GetMeResponseType> {
    return await window
        .fetch(appConst.api.login, {
            ...defaultFetchProps,
            method: 'POST',
            body: `username=${username}&password=${password}`
        })
        .then(getMe);
}
