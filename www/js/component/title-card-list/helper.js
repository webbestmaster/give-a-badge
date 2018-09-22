// @flow

import type {GetNewsListType, NewsType} from './api';
import type {TitleNewsListType} from './reducer';

export function extractNewsList(titleNewsList: TitleNewsListType): Array<NewsType> {
    const newsList = [];

    titleNewsList.newsResponseList.forEach((newsListType: GetNewsListType) => {
        const newsCandidateList = newsListType.content;

        newsCandidateList.forEach((newsItem: NewsType) => {
            const inInNewsList = newsList.some(
                (newsItemInNewsList: NewsType): boolean => newsItemInNewsList.id === newsItem.id
            );

            if (inInNewsList) {
                return;
            }

            newsList.push(newsItem);
        });
    });

    return newsList;
}
