// @flow
/* global window, IS_PRODUCTION */

const {hostname, origin} = window.location;

const appConst = {
    api: {
        url: 'http://206.81.28.99:1313',
        getMe: '/api/users/current?id=1'
    }
};

export default appConst;
