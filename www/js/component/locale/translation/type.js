// @flow

export type LangDataType = {|
    /* eslint-disable id-match */
    +LANGUAGE: string,

    // spec symbols
    +SPACE: ' '
    /* eslint-enable id-match */
|};

// eslint-disable-next-line id-match
export type LangKeyType = $Keys<LangDataType>;
