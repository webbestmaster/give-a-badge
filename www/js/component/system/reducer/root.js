// @flow

/* global window */

import {combineReducers} from 'redux';

import type {ActionDataType} from '../../../app/reducer-type';

import {screen, type ScreenType} from './screen';
import {scroll, type ScrollType} from './scroll';

export type SystemType = {|
    +screen: ScreenType,
    +scroll: ScrollType,
|};

type ReduceMapType = {|
    +screen: (screenState: ScreenType, actionData: ActionDataType) => ScreenType,
    +scroll: (scrollState: ScrollType, actionData: ActionDataType) => ScrollType,
|};

const system = combineReducers<ReduceMapType, SystemType>({
    screen,
    scroll,
});

export {system};
