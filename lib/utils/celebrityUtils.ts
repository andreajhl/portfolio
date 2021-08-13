import { celebrityType } from "desktop-app/types/celebrityType";

export const VIDEO_MESSAGE_CONTRACT_TYPE = 1;

export const getVideoMessageContractType = (celebrity: celebrityType) =>
  celebrity?.contractTypes?.find(
    ({ contractType }) => contractType === VIDEO_MESSAGE_CONTRACT_TYPE
  );

export const getCelebrityContractPrice = (celebrity: celebrityType) =>
  getVideoMessageContractType(celebrity)?.price || 0;

const fallbackDiscountPercentage = 0;

export function getCelebrityDiscountPercentage(
  celebrity: celebrityType
): number {
  const discountPercentage = celebrity?.discountPercentage;
  if (discountPercentage) return discountPercentage;
  const videoMessageContractType = getVideoMessageContractType(celebrity);
  if (
    !videoMessageContractType ||
    !videoMessageContractType.discountPercentage
  ) {
    return fallbackDiscountPercentage;
  }
  return videoMessageContractType.discountPercentage;
}

const UNAVAILABLE_STATUS_CODE = [60, 70];

export const celebrityIsUnavailable = (
  celebrityStatus: celebrityType["status"]
) => UNAVAILABLE_STATUS_CODE.includes(celebrityStatus);

const BUSINESS_CONTRACT_TYPE = 2; /* Por ser definido correctamente */

export const getCelebrityBusinessPrice = (contractsTypes: any[]) =>
  contractsTypes?.find?.(
    (contract) => contract.contractType === BUSINESS_CONTRACT_TYPE
  )?.price || 0;

export function getCelebrityAnalyticsData(celebrity: celebrityType) {
  return {
    ...celebrity,
    discountPercentage:
      celebrity.discountPercentage || getCelebrityDiscountPercentage(celebrity),
    videoMessagePrice:
      celebrity.videoMessagePrice || getCelebrityContractPrice(celebrity),
    businessPrice: getCelebrityBusinessPrice(celebrity?.contractTypes),
  };
}
