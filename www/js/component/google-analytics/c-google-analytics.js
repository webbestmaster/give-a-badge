// @flow

// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications

/* global window, document */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import withRouter from 'react-router-dom/withRouter';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';

type PassedPropsType = {|
    +trackingId: string,
|};

type PropsType = $ReadOnly<
    $Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ContextRouterType>,
    }>
>;

type StateType = void;

class GoogleAnalytics extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    loadScript() {
        const view = this;
        const {props} = view;
        const {trackingId} = props;

        /* eslint-disable max-params, func-names, flowtype/require-parameter-type, id-length, no-param-reassign, no-unused-expressions, babel/no-unused-expressions, no-sequences */
        (function(i, s, o, g, r, a, m) {
            i.GoogleAnalyticsObject = r;
            (i[r] =
                i[r] ||
                function() {
                    (i[r].q = i[r].q || []).push(arguments);
                }),
                (i[r].l = Number(new Date()));
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
            a.async = true;
            a.src = g;
            m.parentNode && m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        /* eslint-enable max-params, func-names, flowtype/require-parameter-type, id-length, no-param-reassign, no-unused-expressions, babel/no-unused-expressions, no-sequences */

        window.ga('create', trackingId, 'auto');
        window.ga('send', 'pageview');
    }

    bindEventListener() {
        const view = this;
        const {props} = view;
        const {history} = props;

        history.listen((location: {pathname: string}, action: string) => {
            console.log('GA: route change:', location);

            window.ga('set', 'page', location.pathname);
            window.ga('send', 'pageview');

            // just example for custom events
            if (location.pathname.includes('give-the-badge')) {
                console.log(
                    'GA: custom event:',
                    '[send',
                    'event',
                    'Event Category Name',
                    'Event Action Name',
                    'Event Label Name]'
                );
                // window.ga('send', 'event', 'Event Category Name', 'Event Action Name', 'Event Label Name');
            }
        });
    }

    componentDidMount() {
        const view = this;

        view.loadScript();

        view.bindEventListener();
    }

    render(): Node {
        return null;
    }
}

export default withRouter(GoogleAnalytics);
