// @flow

// eslint-disable-next-line id-match
import React, {React$Component} from 'react';

declare module 'react-infinite-scroll-component' {
    // eslint-disable-next-line flowtype/no-weak-types, id-match
    declare export default class InfiniteScroll extends React$Component<any> {}
}
