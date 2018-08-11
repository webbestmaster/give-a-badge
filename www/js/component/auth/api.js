// @flow

/* global window, fetch */

import appConst from '../../app-const';
import type {UserType} from './reducer';
// import {AddNewsResponseType} from '.';

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

export type NewsTypeType = 'BADGE_ASSIGNMENT';
export type NewsUserType = {|
    +id: number,
    +name: string,
    +imageUrl: string
|};

export type NewsType = {|
    +id: number,
    +entityId: number,
    +newsType: NewsTypeType,
    +comment: string,
    +toUsers: Array<NewsUserType>,
    +author: NewsUserType,
    +tags: [],
    +date: number
|};

export type GetNewsListType = {|
    +content: Array<NewsType>,
    +last: boolean,
    +totalPages: number,
    +totalElements: number,
    +sort: Array<{|
        +direction: 'DESC' | 'ASC',
        +property: string,
        +ignoreCase: boolean,
        +nullHandling: 'NATIVE',
        +descending: boolean,
        +ascending: boolean
    |}>,
    +numberOfElements: number,
    +first: boolean,
    +size: number,
    +number: number
|};

export async function getNewsList(
    pageIndex: number,
    pageSize: number,
    userId: number
): Promise<GetNewsListType | null> {
    const getNewUrl = appConst.api.getNews
        .replace('{pageIndex}', String(pageIndex))
        .replace('{pageSize}', String(pageSize))
        .replace('{userId}', String(userId));

    return await window.fetch(getNewUrl, defaultFetchProps).then(
        async (response: Response): Promise<GetNewsListType | null> => {
            if (response.ok) {
                return await response.json();
            }
            return null;
        }
    );
}
