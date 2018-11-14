// @flow

import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from '../api';
import {noHistogramListActiveUserId} from '../c-campaign-statistic';

export function getCommentListAboutUser(
    campaignStatisticDataList: CampaignStatisticDataListType,
    userId: string | number,
    activeBadgeIdList: Array<string | number>
): CampaignStatisticDataListType {
    const filteredByBadgeIdCampaignDataList = campaignStatisticDataList.filter(
        (campaignStatisticData: CampaignStatisticDataType): boolean =>
            activeBadgeIdList.includes(campaignStatisticData.badge.id)
    );

    const filteredByUserIdCampaignDataList = filteredByBadgeIdCampaignDataList.filter(
        (campaignStatisticData: CampaignStatisticDataType): boolean =>
            campaignStatisticData.toUsers.some(
                (userData: DataType): boolean => [userData.id, noHistogramListActiveUserId].includes(userId)
            )
    );

    return filteredByUserIdCampaignDataList.sort(
        (dataA: CampaignStatisticDataType, dataB: CampaignStatisticDataType): number => dataB.date - dataA.date
    );
}
