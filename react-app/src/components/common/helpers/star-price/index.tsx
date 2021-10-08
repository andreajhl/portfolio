import { STAR_PRICE_IN_DOLLARS } from "constants/referrals";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";

type StarPriceProps = {
  rounding?: boolean;
  showPrefix?: boolean;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
};

function StarPrice({
  decimalScale = 0,
  rounding = false,
  showPrefix = true,
  fixedDecimalScale = false,
}: StarPriceProps) {
  return (
    <PriceLayout
      price={STAR_PRICE_IN_DOLLARS}
      rounding={rounding}
      showPrefix={showPrefix}
      fixedDecimalScale={fixedDecimalScale}
      decimalScale={decimalScale}
    />
  );
}

export { StarPrice };
