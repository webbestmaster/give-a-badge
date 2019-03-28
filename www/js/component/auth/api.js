// @flow

/* global window, fetch */

import {appConst, serverApi} from '../../app/const';

import type {UserType} from './reducer';

type GetMeResponseType = {+hasError: true} | {+hasError: false, +userData: UserType};

export async function getMe(): Promise<GetMeResponseType> {
    return await window
        .fetch(appConst.api.getMe, serverApi.request.paramMap.get)
        .then(
            async (response: Response): Promise<GetMeResponseType> => {
                if (response.ok) {
                    const userData = await response.json();

                    return {
                        hasError: false,
                        userData,
                    };
                }

                return {hasError: true};
            }
        )
        .catch(
            (error: Error): GetMeResponseType => {
                console.error('login error');
                console.error(error);
                return {hasError: true};
            }
        );
}

type LoginMeResponseType = {|
    +hasErrorLogin: boolean,
|};

export async function login(username: string, password: string): Promise<GetMeResponseType> {
    return await window
        .fetch(appConst.api.login, {
            ...serverApi.request.paramMap.postForm,
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        })
        .then(getMe);
}

export async function logout(): Promise<void> {
    return await window
        .fetch(appConst.api.logout, serverApi.request.paramMap.get)
        .then((): void => console.log('---> logout'))
        .catch(
            (error: Error): Error => {
                console.error('can not logout');
                console.error(error);
                return error;
            }
        );
}
