// @flow

export type LangDataType = {|
    /* eslint-disable id-match, id-length */
    +META__LANGUAGE_NAME: string,

    +LOGIN_POPUP__HEADER: string,
    +LOGIN_POPUP__LOGIN_PLACEHOLDER: string,
    +LOGIN_POPUP__PASSWORD_PLACEHOLDER: string,
    +LOGIN_POPUP__LOGIN_BUTTON: string,
    +LOGIN_POPUP__LOGIN__SUCCESS: string,
    +LOGIN_POPUP__LOGIN__ERROR: string,
    +SNACK_BAR__GIVE_BADGE__SUCCESS: string,
    +SNACK_BAR__GIVE_BADGE__ERROR: string,

    +CATEGORY_LIST__CATEGORIES: string,
    +GIVE_THE_BADGE__PEOPLE: string,
    +GIVE_THE_BADGE__BADGE_LEFT: string,

    +CAMPAIGN__STATISTIC: string,
    +CAMPAIGN__STATISTIC__COMMENT: string,

    +BADGE_WON_LIST__SHOW_LESS: string,
    +BADGE_WON_LIST__SHOW_ALL: string,

    +SEARCH_PEOPLE__INPUT_PLACEHOLDER: string,
    +SEARCH_PEOPLE__TEXT_AREA_PLACEHOLDER: string,
    +SEARCH_PEOPLE__SUBMIT_BUTTON: string,
    +SEARCH_PEOPLE__NO_RESULT: string,

    +LOGIN_POPUP__PLEASE_LOG_IN_OR_JOIN_NOW: string,
    +LOGIN_POPUP__INPUT_USERNAME: string,
    +LOGIN_POPUP__INPUT_PASSWORD: string,
    +LOGIN_POPUP__BUTTON_LOGIN: string,
    +LOGIN_POPUP__BUTTON_JOIN_NOW: string,
    +LOGIN_POPUP__LINK_LOST_PASSWORD: string,

    // spec symbols
    +SPACE: ' ',
    /* eslint-enable id-match */
|};

// eslint-disable-next-line id-match
export type LangKeyType = $Keys<LangDataType>;
