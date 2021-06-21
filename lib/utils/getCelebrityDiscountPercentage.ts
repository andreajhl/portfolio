import { celebrityType } from "desktop-app/types/celebrityType";

const fallbackDiscountPercentage = 0;
const VIDEO_MESSAGE_CONTRACT_TYPE = 1;

function getCelebrityDiscountPercentage({
  discountPercentage,
  contractTypes,
}: celebrityType) {
  if (discountPercentage) return discountPercentage;
  if (!Array.isArray(contractTypes)) return fallbackDiscountPercentage;
  const videoMessageContractType = contractTypes.find(
    ({ contractType }) => contractType === VIDEO_MESSAGE_CONTRACT_TYPE
  );
  if (
    !videoMessageContractType ||
    !videoMessageContractType.discountPercentage
  ) {
    return fallbackDiscountPercentage;
  }
  return videoMessageContractType.discountPercentage;
}

export default getCelebrityDiscountPercentage;
