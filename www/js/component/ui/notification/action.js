// @flow

/* global window, CustomEvent */

import React from 'react';
import type {Node} from 'react';
import {SnackBar} from './snack-bar/c-snack-bar';

export const defaultShowEventName = `show-snackbar-event ${Math.random()}`;

// if true then user action required, timer is Infinity, screen is disabled
// if false then no user action required and timer is 6e3 (or default), screen is always active
export type SnackBarOptionsType = {|
    +timer?: number,
    +isModal?: boolean,
    +id?: string | number,
    +isHideAll?: boolean,
|};

const defaultOptions: SnackBarOptionsType = {
    timer: 6e3,
    isModal: false,
    // id: Math.random(),
    isHideAll: false,
};

/*
    if (typeof content === 'string') {
        return showSnackBar(<SnackBar>{content}</SnackBar>, options, customEventName);
    }

    if (!options) {
        return showSnackBar(content, {}, customEventName);
    }

    if (typeof options === 'string') {
        return showSnackBar(content, {id: options}, customEventName);
    }

    if (!customEventName) {
        return showSnackBar(content, options, defaultShowEventName);
    }
*/

export type ShowSnackBarDetailType = {|
    ...SnackBarOptionsType,
    isShow?: boolean,
    content?: Node,
    handleOnHide?: () => void,
|};

export function showSnackBar(content: Node, options: SnackBarOptionsType, customEventName: string): Promise<void> {
    return new Promise((resolve: () => void) => {
        const detail: ShowSnackBarDetailType = {
            ...defaultOptions,
            ...options,
            isShow: true,
            id: options.hasOwnProperty('id') ? options.id : JSON.stringify(content),
            content: <SnackBar type="success">{content}</SnackBar>,
            handleOnHide: () => resolve(),
        };

        const customEvent = new CustomEvent(customEventName, {detail});

        window.dispatchEvent(customEvent);
    });
}

export function hideSnackBar(snackBarId: string | number, customEventName: string) {
    if (!customEventName) {
        hideSnackBar(snackBarId, defaultShowEventName);
        return;
    }

    const detail = {
        isShow: false,
        id: snackBarId,
    };

    const customEvent = new CustomEvent(customEventName, {detail});

    window.dispatchEvent(customEvent);
}

export function hideAllSnackBars(customEventName: string) {
    if (!customEventName) {
        hideAllSnackBars(defaultShowEventName);
        return;
    }

    const detail = {
        isHideAll: true,
    };

    const customEvent = new CustomEvent(customEventName, {detail});

    window.dispatchEvent(customEvent);
}
