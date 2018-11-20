// @flow
/* global window, IS_PRODUCTION */

// const {hostname, origin} = window.location;

export const appConst = {
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

const headerPropertyName = {
    accept: 'Accept',
    contentType: 'Content-Type',
};

const jsonHeaders = {
    [headerPropertyName.accept]: 'application/json, text/plain, */*',
    [headerPropertyName.contentType]: 'application/json; charset=UTF-8',
};

const formHeaders = {
    [headerPropertyName.accept]: jsonHeaders[headerPropertyName.accept],
    [headerPropertyName.contentType]: 'application/x-www-form-urlencoded; charset=UTF-8',
};

export const serverApi = {
    request: {
        paramMap: {
            get: {
                method: 'GET',
                credentials: 'include',
                headers: {
                    [headerPropertyName.accept]: jsonHeaders[headerPropertyName.accept],
                    [headerPropertyName.contentType]: 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                mode: 'no-cors',
            },

            postForm: {
                method: 'POST',
                credentials: 'include',
                headers: formHeaders,
                mode: 'no-cors',
            },
            postJSON: {
                method: 'POST',
                credentials: 'include',
                headers: jsonHeaders,
                mode: 'cors',
            },

            putForm: {
                method: 'PUT',
                credentials: 'include',
                headers: formHeaders,
            },
            putJSON: {
                method: 'PUT',
                credentials: 'include',
                headers: jsonHeaders,
            },

            'delete': {
                method: 'DELETE',
                credentials: 'include',
                headers: jsonHeaders,
            },
        },
    },
};
