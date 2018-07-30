// @flow

import {authConst} from './const';

export type ActionOpenLoginPopupType = {|
    +type: 'auth__open_login_popup'
|};

export function openLoginPopup(): ActionOpenLoginPopupType {
    return {
        type: authConst.action.type.openLoginPopup
    };
}

export type ActionCloseLoginPopupType = {|
    +type: 'auth__close_login_popup'
|};

export function closeLoginPopup(): ActionCloseLoginPopupType {
    return {
        type: authConst.action.type.closeLoginPopup
    };
}

export type ActionOpenPopupType = ActionOpenLoginPopupType | ActionCloseLoginPopupType;
