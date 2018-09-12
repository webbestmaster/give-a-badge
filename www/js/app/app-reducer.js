// @flow

import type {TitleNewsListType} from '../component/title-card-list/reducer';
import titleNewsList from '../component/title-card-list/reducer';

import type {AuthType} from '../component/auth/reducer';
import auth from '../component/auth/reducer';

import type {SystemType} from '../component/system/reducer';
import system from '../component/system/reducer';

import type {LocaleType} from '../component/locale/reducer';
import locale from '../component/locale/reducer';

export {titleNewsList, auth, system, locale};

export type GlobalStateType = {|
    +titleNewsList: TitleNewsListType,
    +auth: AuthType,
    +system: SystemType,
    +locale: LocaleType
|};
