// @flow
/* global window, IS_PRODUCTION */

const {hostname, origin} = window.location;

const url = 'http://206.81.28.99:1313';

const appConst = {
    api: {
        url,
        getMe: url + '/api/users/current?id=1'
    }
};

export default appConst;
