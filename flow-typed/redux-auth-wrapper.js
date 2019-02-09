// @flow

import type {GlobalStateType} from '../www/js/app/reducer';

declare module 'redux-auth-wrapper/history4/redirect' {
    declare type ConnectedRouterRedirectParamsType = {|
        +wrapperDisplayName: string,
        +redirectPath: (state: GlobalStateType, ownProps: mixed) => string,
        +allowRedirectBack: boolean,
        +authenticatedSelector: (state: GlobalStateType) => boolean,
    |}

    declare export function connectedRouterRedirect(params: ConnectedRouterRedirectParamsType): <T>(reactClass: T) => T
}

declare module 'redux-auth-wrapper/history4/locationHelper' {
    declare class LocationHelper {
        getRedirectQueryParam(ownProps: mixed): string,
    }

    declare export default function locationHelperBuilder(params: {}): LocationHelper
}

