// @flow

export function getBadgePath(badgeId: number | string): string {
    return `/give-the-badge/${badgeId}`;
}

export function getBadgeWonPath(badgeId: number | string): string {
    return `/badge-won/${badgeId}`;
}

const routes = {
    index: {
        index: '/',
        badgeCategoryList: '/badge-category-list',
        giveTheBadge: getBadgePath(':badgeId'),
        badgeWon: getBadgeWonPath(':badgeId'),
    },
};

export {routes};
