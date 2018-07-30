// @flow

/* global window */

import type {OnResizeType} from '../action';
import {systemConst} from '../const';

const screenNameMap = {
    // key and value have to be the same,
    // $Value<typeof screenNameMap> - translate 'desktop', 'tablet', 'mobile' to type string
    desktop: 'desktop',
    tablet: 'tablet',
    mobile: 'mobile'
};

// eslint-disable-next-line id-match
type ScreenWidthNameType = $Keys<typeof screenNameMap>;

const screenMinWidth: {[key: ScreenWidthNameType]: number} = {
    [screenNameMap.desktop]: 1280,
    [screenNameMap.tablet]: 768,
    [screenNameMap.mobile]: 320
};

export type ScreenType = {|
    width: number,
    height: number,
    isDesktop: boolean,
    isTablet: boolean,
    isMobile: boolean,
    name: ScreenWidthNameType,
    ltThen: Array<ScreenWidthNameType>
|};

function getScreenName(screenWidth: number): ScreenWidthNameType {
    let screenName = screenNameMap.mobile;

    Object.keys(screenMinWidth)
        .sort(
            (screenNameA: ScreenWidthNameType, screenNameB: ScreenWidthNameType): number => {
                return screenMinWidth[screenNameB] - screenMinWidth[screenNameA];
            }
        )
        .every(
            (screenNameInList: ScreenWidthNameType): boolean => {
                if (screenWidth >= screenMinWidth[screenNameInList]) {
                    screenName = screenNameInList;
                    return false;
                }

                return true;
            }
        );

    return screenName;
}

function getLtThen(screenWidth: number): Array<ScreenWidthNameType> {
    const ltThenList = [];

    Object.keys(screenMinWidth).forEach((screenName: ScreenWidthNameType) => {
        if (screenWidth < screenMinWidth[screenName]) {
            ltThenList.push(screenName);
        }
    });

    return ltThenList;
}

function getScreenState(width: number, height: number): ScreenType {
    const screenName = getScreenName(width);

    return {
        width,
        height,
        isDesktop: screenName === screenNameMap.desktop,
        isTablet: screenName === screenNameMap.tablet,
        isMobile: screenName === screenNameMap.mobile,
        name: screenName,
        ltThen: getLtThen(width)
    };
}

const {clientWidth, clientHeight} = window.document.documentElement;

const defaultScreenState = getScreenState(clientWidth, clientHeight);

export default (screenState: ScreenType = defaultScreenState, {type, payload}: OnResizeType): ScreenType => {
    if (type !== systemConst.action.type.resize) {
        return screenState;
    }

    const {width, height} = payload;

    if (screenState.width === width && screenState.height === height) {
        return screenState;
    }

    return getScreenState(width, height);
};
