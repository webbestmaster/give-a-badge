// @flow

/* global window, IS_PRODUCTION */

// eslint-disable-next-line id-match
const bodyNormalScroll = IS_PRODUCTION ? '' : 'scroll';

export function setIsGlobalScrollEnable(isEnable: boolean) {
    const {body} = window.document;

    body.style.overflow = isEnable ? bodyNormalScroll : 'hidden';
}
