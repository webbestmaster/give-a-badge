// @flow
/* global window, IS_PRODUCTION */

const {hostname, origin} = window.location;

const appConst = {
    api: {
        getMe: '/api/users/current',
        getNews: '/api/news?page={pageIndex}&size={pageSize}',
        getBadgeCategoryList: '/api/badges/catalog',
        searchUser: '/api/users/search?name={userName}&size=10',
        // todo: replace with do-*
        login: '/login',
        logout: '/logout'
    }
};

export default appConst;
