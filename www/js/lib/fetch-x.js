// @flow
/* global fetch, setTimeout */

const promiseCache = {};

type OptionsType = {
    credentials?: 'include',
    method?: 'GET' | 'POST',
    body?: FormData
};

export function fetchX(url: string, options: OptionsType = {}): Promise<mixed> {
    const cacheProperty = url + ' - ' + JSON.stringify(options);

    if (promiseCache.hasOwnProperty(cacheProperty)) {
        return promiseCache[cacheProperty];
    }

    promiseCache[cacheProperty] = fetch(url, {
        credentials: options.credentials || 'include',
        method: options.method || 'GET',
        body: options.body
    }).then((rawResult: Response): mixed => rawResult.json());

    return promiseCache[cacheProperty];
}
