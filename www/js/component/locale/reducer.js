// @flow

/* global window */

import {combineReducers} from 'redux';
import {localeConst} from './const';
import type {LocaleNameType, SetLocaleType} from './action';
import type {ActionDataType} from '../../app-reducer-type';

export const localeNameReference: {[key: string]: LocaleNameType} = {
    enUs: 'en-US',
    ruRu: 'ru-RU'
};

function getLocaleName(): LocaleNameType {
    const savedLocaleName = window.localStorage.getItem(localeConst.key.localStorage.localeName);
    const localeNameList: Array<LocaleNameType> = localeConst.localeNameList;

    if (localeNameList.includes(savedLocaleName)) {
        return savedLocaleName;
    }

    return localeConst.defaults.localeName;
}

const initialLocaleName = getLocaleName();

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
