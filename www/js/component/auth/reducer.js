// @flow

import {combineReducers} from 'redux';
import type {SetUserType} from './action';
import {authConst} from './const';
import type {ActionDataType} from '../../app-reducer-type';
import {isUndefined} from '../../lib/is';

export type UserType = {|
    +id: string
|};

const defaultUserState: UserType = {
    id: ''
};

// module
export type AuthType = {|
    +user: UserType
|};

export default combineReducers({
    user: (userState: UserType = defaultUserState, actionData: ActionDataType): UserType => {
        if (actionData.type !== authConst.action.type.setUserState) {
            return userState;
        }

        if (typeof actionData.payload === 'undefined') {
            return userState;
        }

        return actionData.payload;
    }
});
