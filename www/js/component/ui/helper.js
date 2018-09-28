// @flow

/* global window, Event */

export function triggerResize() {
    window.dispatchEvent(new Event('resize'));
}
