// @flow
/* global window, IS_PRODUCTION */

const {hostname, origin} = window.location;

const appConst = {
    api: {
        getMe: '/api/users/current?id=1',
        login: '/api/login'
    }
};

export default appConst;
