// @flow

/* global window */

import {combineReducers} from 'redux';
import {localeConst, localeNameReference, allLangCodes} from './const';
import type {LocaleNameType} from './const';
import type {ActionDataType} from '../../app-reducer-type';

function defineLocaleByUrl(): LocaleNameType | null {
    const localeName = window.location.pathname
        .replace(/^\/|\/$/g, '')
        .split('/')
        .shift();

    let locale = null;

    switch (localeName) {
        case allLangCodes[localeNameReference.enUs]:
            locale = localeNameReference.enUs;
            break;
        case allLangCodes[localeNameReference.ruRu]:
            locale = localeNameReference.ruRu;
            break;
        case allLangCodes[localeNameReference.zhCn]:
            locale = localeNameReference.zhCn;
            break;
        case allLangCodes[localeNameReference.zhTw]:
            locale = localeNameReference.zhTw;
            break;

        default:
            console.log('---> can not detect locale');
    }

    return locale;
}

function getLocaleName(): LocaleNameType {
    const localeByUrl = defineLocaleByUrl();
    const savedLocaleName = window.localStorage.getItem(localeConst.key.localStorage.localeName);
    const localeFromAll = localeByUrl || savedLocaleName;
    const localeNameList: Array<LocaleNameType> = localeConst.localeNameList;

    if (localeNameList.includes(localeFromAll)) {
        return localeFromAll;
    }

    const navigatorLanguages = window.navigator.languages;

    if (!Array.isArray(navigatorLanguages)) {
        return localeConst.defaults.localeName;
    }

    let localeName = localeConst.defaults.localeName;

    navigatorLanguages.every(
        (deviceLocaleName: string): boolean => {
            if (localeNameList.includes(deviceLocaleName)) {
                localeName = deviceLocaleName;
                return false;
            }

            return true;
        }
    );

    return localeName;
}

const initialLocaleName = getLocaleName();

window.localStorage.setItem(localeConst.key.localStorage.localeName, initialLocaleName);

export type LocaleType = {|
    +name: LocaleNameType
|};

export default combineReducers({
    name: (localeName: LocaleNameType = initialLocaleName, actionData: ActionDataType): LocaleNameType => {
        if (actionData.type !== localeConst.action.type.setLocale) {
            return localeName;
        }

        if (typeof actionData.payload === 'undefined') {
            return localeName;
        }

        return actionData.payload.localeName;
    }
});
