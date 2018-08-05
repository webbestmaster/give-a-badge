// @flow

import type {UserType} from './reducer';
import {authConst} from './const';

export type SetUserType = {|
    type: 'auth__set-user-state',
    payload: UserType
|};

export function setUser(userState: UserType): SetUserType {
    return {
        type: authConst.action.type.setUserState,
        payload: userState
    };
}
