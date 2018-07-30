// @flow

/* global window */

import {combineReducers} from 'redux';
import type {ActionOpenPopupType} from './action';
import {authConst} from './const';

type PopupStateType = {|
    +login: {|
        +isOpen: boolean
    |}
|};

export type AuthType = {|
    popup: PopupStateType
|};

const popupInitialState: PopupStateType = {
    login: {
        isOpen: false
    }
};

export default combineReducers({
    popup: (initialState: PopupStateType = popupInitialState, action: ActionOpenPopupType): PopupStateType => {
        return {
            login: {
                isOpen: action.type === authConst.action.type.openLoginPopup
            }
        };
    }
});
