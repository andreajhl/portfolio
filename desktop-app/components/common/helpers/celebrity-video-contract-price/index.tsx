import { celebrityType } from "desktop-app/types/celebrityType";
import { PriceLayout } from "../price-layout";

const getContractPriceVideoMessage = (contractsTypes) =>
  contractsTypes?.find?.((contract) => contract.contractType === 1)?.price || 0;

type CelebrityVideoContractPriceProps = {
  celebrity: celebrityType;
  decimalScale?: number;
};

function CelebrityVideoContractPrice({
  celebrity,
  decimalScale = 0,
}: CelebrityVideoContractPriceProps) {
  return (
    <PriceLayout
      decimalScale={decimalScale}
      price={getContractPriceVideoMessage(celebrity.contractTypes)}
    />
  );
}

export { CelebrityVideoContractPrice };
