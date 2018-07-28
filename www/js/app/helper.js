// @flow

/* global window */

import FastClick from 'fastclick';

export async function initializeEnvironment(): Promise<void> {
    // reduce 300ms delay
    FastClick.attach(window.document.body);
}
