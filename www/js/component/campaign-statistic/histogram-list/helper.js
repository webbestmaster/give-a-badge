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

export type BadgeOfUserType = {|
    +id: string | number,
    +name: string,
    +imageUrl: string,
    count: number,
|};

export function getBadgeListOfUser(
    campaignStatisticDataList: CampaignStatisticDataListType,
    userData: DataType,
    selectedBadgeIdList: Array<number | string>
): Array<BadgeOfUserType> {
    const badgeListOfUser = [];

    campaignStatisticDataList.forEach((campaignStatisticData: CampaignStatisticDataType) => {
        campaignStatisticData.toUsers.forEach((userDataInList: DataType) => {
            if (userDataInList.id !== userData.id) {
                return;
            }

            const {badge} = campaignStatisticData;

            if (!selectedBadgeIdList.includes(badge.id)) {
                return;
            }

            const badgeInList = badgeListOfUser.find(
                (badgeOfUserInList: BadgeOfUserType): boolean => badge.id === badgeOfUserInList.id
            ) || {
                id: badge.id,
                name: badge.name,
                imageUrl: badge.imageUrl,
                count: 0,
            };

            if (badgeInList.count === 0) {
                badgeListOfUser.push(badgeInList);
            }

            badgeInList.count += 1;
        });
    });

    return badgeListOfUser.sort(
        (badgeA: BadgeOfUserType, badgeB: BadgeOfUserType): number => parseInt(badgeB.id, 10) - parseInt(badgeA.id, 10)
    );
}

export function getBadgeListSum(badgeListOfUser: Array<BadgeOfUserType>): number {
    let sum = 0;

    badgeListOfUser.forEach((badgeOfUser: BadgeOfUserType) => {
        sum += badgeOfUser.count;
    });

    return sum;
}
