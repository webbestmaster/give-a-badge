// @flow

/* global window */

import {appConst} from '../../app/const';

export type DataType = {|
    +id: number | string,
    +imageUrl: string,
    +name: string,
|};

export type CampaignStatisticDataType = {|
    +assigner: DataType,
    +badge: DataType,
    +comment: string,
    +date: number,
    +toUsers: Array<DataType>,
|};

export type CampaignStatisticDataListType = Array<CampaignStatisticDataType>;

export function getCampaignStatistic(campaignId: string | number): Promise<CampaignStatisticDataListType | Error> {
    const campaignStatisticUrl = appConst.api.getCampaignStatistic.replace('{campaignId}', String(campaignId));

    return window
        .fetch(campaignStatisticUrl)
        .then((response: Response): Promise<CampaignStatisticDataListType | Error> => response.json())
        .catch((error: Error): Error => {
            console.error('ca not get campaign statistic by url:', campaignStatisticUrl);
            console.error(error);
            return error;
        });
}
