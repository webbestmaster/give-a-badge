// @flow

import type {SetLocaleType} from './component/locale/action';
import type {OnResizeType} from './component/system/action';
import type {SetPopupStateType, SetUserType} from './component/auth/action';
import type {ApplyGetNewListResponseType} from './component/title-card-list/action';

type DefaultActionDataType = {|type: string|};

export type ActionDataType =
    | DefaultActionDataType
    | OnResizeType
    | SetUserType
    | SetLocaleType
    | SetPopupStateType
    | ApplyGetNewListResponseType;
