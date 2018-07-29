// @flow

import type {SystemType} from './component/system/reducer';
import system from './component/system/reducer';

// import type {AuthType} from './component/auth/reducer';
// import auth from './component/auth/reducer';

import type {LocaleType} from './component/locale/reducer';
import locale from './component/locale/reducer';

// export {auth, system, locale};
export {system, locale};

export type GlobalStateType = {|
    // +auth: AuthType,
    +system: SystemType,
    +locale: LocaleType
|};
