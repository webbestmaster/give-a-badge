// @flow
/* global window, BUILD_DATE */

import React from 'react';
import {render} from 'react-dom';
import App from './component/app/c-app';

render(<App />, window.document.querySelector('.js-app-wrapper'));

// check build
// eslint-disable-next-line id-match
window.BUILD_DATE = BUILD_DATE;
