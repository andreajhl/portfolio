import Maybe from "desktop-app/components/common/helpers/maybe";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import { celebrityType } from "desktop-app/types/celebrityType";
import getCelebrityBusinessPrice from "lib/utils/getCelebrityBusinessPrice";
import { FormattedMessage } from "react-intl";

type CelebrityBusinessPriceProps = {
  celebrity: celebrityType;
  decimalScale?: number;
};

function CelebrityBusinessPrice({
  celebrity,
  decimalScale = 0,
}: CelebrityBusinessPriceProps) {
  const businessPrice = getCelebrityBusinessPrice(celebrity.contractTypes);
  const showBusinessPrice = businessPrice > 0;

  return (
    <Maybe
      it={showBusinessPrice}
      orElse={
        <FormattedMessage
          defaultMessage="{currency} A convenir"
          values={{ currency: "$" }}
        />
      }
    >
      <PriceLayout decimalScale={decimalScale} price={businessPrice} />
    </Maybe>
  );
}

export { CelebrityBusinessPrice };
