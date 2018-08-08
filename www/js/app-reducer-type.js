// @flow

import type {SetLocaleType} from './component/locale/action';
import type {OnResizeType} from './component/system/action';
import type {SetUserType, SetPopupStateType} from './component/auth/action';

type DefaultActionDataType = {|type: string|};

export type ActionDataType = DefaultActionDataType | OnResizeType | SetUserType | SetLocaleType | SetPopupStateType;
