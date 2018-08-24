// @flow

const badgeCategoryList = 'badge-category-list';

const routes = {
    index: {
        index: `/(smth|${badgeCategoryList})?`,
        badgeCategoryList: `/${badgeCategoryList}`
    }
};

export default routes;
