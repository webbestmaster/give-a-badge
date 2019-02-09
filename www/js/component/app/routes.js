// @flow

export function getBadgePath(badgeId: number | string): string {
    return `/give-the-badge/${badgeId}`;
}

export function getBadgeWonPath(badgeId: number | string): string {
    return `/badge-won/${badgeId}`;
}

export function getBadgeCampaignPath(badgeId: number | string): string {
    return `/campaign-statistic/${badgeId}`;
}

const routes = {
    login: '/login',
    index: {
        index: '/',
        badgeCategoryList: '/badge-category-list',
        giveTheBadge: getBadgePath(':badgeId'),
        badgeWon: getBadgeWonPath(':badgeId'),
        statistic: getBadgeCampaignPath(':campaignId'),
    },
};

export {routes};
