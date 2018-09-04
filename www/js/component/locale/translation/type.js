// @flow

export type LangDataType = {|
    /* eslint-disable id-match, id-length */
    +LANGUAGE_NAME: string,

    +CATEGORY_LIST__CATEGORIES: string,
    +GIVE_THE_BADGE__PEOPLE: string,

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
    +SPACE: ' '
    /* eslint-enable id-match */
|};

// eslint-disable-next-line id-match
export type LangKeyType = $Keys<LangDataType>;
