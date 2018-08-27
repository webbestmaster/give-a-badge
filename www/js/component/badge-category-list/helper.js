// @flow

import type {BadgeCategoryListType, BadgeCategoryType} from './api';

export type ExtractedCategoryType = {|
    +name: string,
    +list: Array<BadgeCategoryType>
|};

export type ExtractedCategoryListType = Array<ExtractedCategoryType>;

export function extractCategoryList(badgeCategoryList: BadgeCategoryListType): ExtractedCategoryListType {
    const extractedCategoryList = [];

    badgeCategoryList.forEach((badgeCategory: BadgeCategoryType) => {
        const badgeCategoryName = badgeCategory.category;

        const currentExtractedCategory = extractedCategoryList.find(
            (extractedCategory: ExtractedCategoryType): boolean => extractedCategory.name === badgeCategoryName
        );

        if (currentExtractedCategory) {
            currentExtractedCategory.list.push(badgeCategory);
            return;
        }

        extractedCategoryList.push({
            name: badgeCategoryName,
            list: [badgeCategory]
        });
    });

    return extractedCategoryList;
}
