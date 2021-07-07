import { celebrityType } from "desktop-app/types/celebrityType";

export const VIDEO_MESSAGE_CONTRACT_TYPE = 1;

export const getVideoMessageContractType = ({ contractTypes }: celebrityType) =>
  contractTypes?.find(
    ({ contractType }) => contractType === VIDEO_MESSAGE_CONTRACT_TYPE
  );

export const getCelebrityContractPrice = (celebrity: celebrityType) =>
  getVideoMessageContractType(celebrity)?.price || 0;

const fallbackDiscountPercentage = 0;

export function getCelebrityDiscountPercentage(
  celebrity: celebrityType
): number {
  const { discountPercentage } = celebrity;
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
