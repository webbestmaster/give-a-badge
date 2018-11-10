// @flow
/* global window, IS_PRODUCTION */

const {hostname, origin} = window.location;

const appConst = {
    api: {
        getMe: '/api/users/current',
        getNews: '/api/news?page={pageIndex}&size={pageSize}',
        getBadgeCategoryList: '/api/badges/catalog',
        searchUser: '/api/users/search?name={userName}&size=10',
        badgeAssign: '/api/badges/assign',
        getBadgeWon: '/api/news/{badgeId}',
        getCampaignStatistic: '/api/news/campaign/{campaignId}',
        login: '/login',
        logout: '/logout',
    },
    analytic: {
        google: {
            trackingId: 'UA-128023030-1',
        },
    },
};

export {appConst};
