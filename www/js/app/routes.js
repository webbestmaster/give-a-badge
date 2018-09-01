// @flow

export function getBadgePath(badgeId: number | string): string {
    return `/give-the-badge/${badgeId}`;
}

const routes = {
    index: {
        index: '/',
        badgeCategoryList: '/badge-category-list',
        giveTheBadge: getBadgePath(':badgeId')
    }
};

export default routes;
