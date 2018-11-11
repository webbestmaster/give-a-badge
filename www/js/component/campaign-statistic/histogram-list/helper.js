// @flow

import type {CampaignStatisticDataListType, CampaignStatisticDataType, DataType} from '../api';

export function extractUserList(campaignStatisticDataList: CampaignStatisticDataListType): Array<DataType> {
    const userList = [];

    campaignStatisticDataList.forEach((campaignStatisticData: CampaignStatisticDataType) => {
        campaignStatisticData.toUsers.forEach((userData: DataType) => {
            const userIdListHasUser = userList.some(
                (userInListData: DataType): boolean => userData.id === userInListData.id
            );

            if (userIdListHasUser) {
                return;
            }
            userList.push(userData);
        });
    });

    return userList;
}
