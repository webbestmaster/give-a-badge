// @flow

/* global window, fetch */

import {hasProperty} from './is';

const promiseCache = {};

type OptionsType = {|
    +credentials?: 'include',
    +method?: 'GET' | 'POST',
    +body?: FormData,
    +mode?: 'cors' | 'no-cors',
    +headers?: {|
        +'Access-Control-Allow-Headers'?: '*',
        +Accept?: 'application/json, */*',
        +'Content-Type'?: 'application/x-www-form-urlencoded; charset=UTF-8',
    |},
|};

export function fetchX<ExpectedResponseType>(
    url: string,
    options?: OptionsType
): Promise<ExpectedResponseType | Error> {
    const cacheProperty = url + ' - ' + (JSON.stringify(options) || '');

    if (hasProperty(promiseCache, cacheProperty)) {
        console.log(`fetchX - url: ${url}, options: ${JSON.stringify(options || {})} - get from cache`);
        return promiseCache[cacheProperty];
    }

    promiseCache[cacheProperty] = window
        .fetch(url, options)
        .then((rawResult: Response): Promise<ExpectedResponseType> => rawResult.json())
        .catch((error: Error): Error => {
            console.error('can not fetch url:', url);
            console.error(error);
            return error;
        });

    return promiseCache[cacheProperty];
}
