// @flow

import {isString} from './is';

const defaultDateSepatetor = '.';
const defaultTimeSepatetor = ':';

export function formatTimeDMY(dateArg: number, separatorArg?: string): string {
    const separator = isString(separatorArg) ? separatorArg : defaultDateSepatetor;

    const dateObject = new Date(dateArg);

    const date = dateObject
        .getUTCDate()
        .toString(10)
        .padStart(2, '0');
    const month = (dateObject.getUTCMonth() + 1).toString(10).padStart(2, '0');
    const year = dateObject
        .getUTCFullYear()
        .toString(10)
        .padStart(2, '0');

    return [date, month, year].join(separator);
}
