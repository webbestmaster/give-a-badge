// @flow

import type {GetNewsListType, NewsType} from './api';
import type {TitleNewsListType} from './reducer';

export function extractNewsList(titleNewsList: TitleNewsListType): Array<NewsType> {
    const newsList = [];

    titleNewsList.newsResponseList.forEach((newsListType: GetNewsListType) => {
        newsList.push(...newsListType.content);
    });

    return newsList;
}
