// @flow

/* global window, fetch */

import appConst from '../../app-const';
import type {UserType} from './reducer';
// import {AddNewsResponseType} from '.';

type GetMeResponseType = {|+hasError: true|} | {|+hasError: false, +userData: UserType|};

export const defaultFetchProps = {
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
                    const userData = await response.json();

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

export async function logout(): Promise<void> {
    return await window
        .fetch(appConst.api.logout, defaultFetchProps)
        .then((): void => console.log('---> logout'))
        .catch(
            (error: Error): Error => {
                console.error('can not logout');
                console.error(error);
                return error;
            }
        );
}
