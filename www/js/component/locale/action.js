// @flow

/* global window */

import {localeConst} from './const';
import type {LocaleNameType} from './const';

export type SetLocaleType = {|
    +type: 'locale__set-locale',
    +payload: {|
        +localeName: LocaleNameType
    |}
|};

export function setLocale(localeName: LocaleNameType): SetLocaleType {
    console.log('---> write to localStorage', localeConst.key.localStorage.localeName, localeName);
    window.localStorage.setItem(localeConst.key.localStorage.localeName, localeName);

    return {
        type: localeConst.action.type.setLocale,
        payload: {
            localeName
        }
    };
}
