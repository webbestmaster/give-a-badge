// @flow
/* global window, IS_PRODUCTION */

const {hostname, origin} = window.location;

const appConst = {
    api: {
        getMe: '/api/users/current?id=1',
        getNews: '/api/news?page={pageIndex}&size={pageSize}&userId={userId}',
        login: '/login',
        logout: '/logout'
    }
};

export default appConst;
