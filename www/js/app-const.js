// @flow
/* global window, IS_PRODUCTION */

export type AppConstType = {|
    +api: {|
        +url: string
    |}
|};

const {hostname, origin} = window.location;

const appConst: AppConstType = {
    api: {
        // eslint-disable-next-line id-match
        url: IS_PRODUCTION ? origin : 'http://my-best-site.com'
    }
};

export default appConst;
