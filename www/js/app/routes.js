// @flow

const badgeCategoryList = 'badge-category-list';
const giveTheBadge = 'give-the-badge/:badgeId';

const routes = {
    index: {
        index: '/',
        badgeCategoryList: `/${badgeCategoryList}`,
        giveTheBadge: `/${giveTheBadge}`
    }
};

export default routes;
