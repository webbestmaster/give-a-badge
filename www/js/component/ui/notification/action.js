// @flow

/* global window, CustomEvent */

import type {Node} from 'react';
import React from 'react';
import {SnackBar} from './snack-bar/c-snack-bar';

export const defaultShowEventName = `show-snackbar-event ${Math.random()}`;

export type SnackBarOptionsType = {|
    +timer?: number,
    +isModal?: boolean,
    +id?: string,
|};

const defaultOptions: SnackBarOptionsType = {
    timer: 6e3,
    isModal: false,
};

export type ShowSnackBarDetailType = {|
    +timer: number,
    +isModal: boolean,
    +id: string,
    +isShow: true,
    +content: Node,
    +handleOnHide: () => void,
|};

type HideSnackBarDetailType = {|
    +isShow: false,
    +id: string,
|};

type HideAllSnackBarDetailType = {|
    +isHideAll: true,
|};

export type SnackBarDetailType = ShowSnackBarDetailType | HideSnackBarDetailType | HideAllSnackBarDetailType;

export function showSnackBar(content: Node, options: SnackBarOptionsType, customEventName: string): Promise<void> {
    return new Promise((resolve: () => void) => {
        const detail: ShowSnackBarDetailType = {
            ...defaultOptions,
            ...options,
            isShow: true,
            id: options.hasOwnProperty('id') ? options.id : JSON.stringify(content),
            content: <SnackBar>{content}</SnackBar>,
            handleOnHide: (): void => resolve(),
        };

        const customEvent = new CustomEvent(customEventName, {detail});

        window.dispatchEvent(customEvent);
    });
}

export function hideSnackBar(snackBarId: string, customEventName: string) {
    const detail: HideSnackBarDetailType = {
        isShow: false,
        id: snackBarId,
    };

    const customEvent = new CustomEvent(customEventName, {detail});

    window.dispatchEvent(customEvent);
}

export function hideAllSnackBars(customEventName: string) {
    const detail: HideAllSnackBarDetailType = {
        isHideAll: true,
    };

    const customEvent = new CustomEvent(customEventName, {detail});

    window.dispatchEvent(customEvent);
}
