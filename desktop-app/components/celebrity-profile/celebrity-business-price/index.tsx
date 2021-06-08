import Maybe from "desktop-app/components/common/helpers/maybe";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import { celebrityType } from "desktop-app/types/celebrityType";

const businessContractType = 2; /* Por ser definido correctamente */

const getBusinessPrice = (contractsTypes) =>
  contractsTypes?.find?.(
    (contract) => contract.contractType === businessContractType
  )?.price || 0;

type CelebrityBusinessPriceProps = {
  celebrity: celebrityType;
  decimalScale?: number;
};

function CelebrityBusinessPrice({
  celebrity,
  decimalScale = 0,
}: CelebrityBusinessPriceProps) {
  const businessPrice = getBusinessPrice(celebrity.contractTypes);
  const showBusinessPrice = businessPrice > 0;

  return (
    <Maybe it={showBusinessPrice} orElse="$ A convenir">
      <PriceLayout decimalScale={decimalScale} price={businessPrice} />
    </Maybe>
  );
}

export { CelebrityBusinessPrice };
