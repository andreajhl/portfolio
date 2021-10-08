import { FormattedMessage } from "react-intl";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import styles from "./styles.module.scss";
import {
  REFERRAL_FIRST_BUY_STARS,
  STAR_PRICE_IN_DOLLARS,
} from "constants/referrals";
import Collapse from "react-bootstrap/Collapse";

const discountPrice = (
  <PriceLayout
    price={STAR_PRICE_IN_DOLLARS * REFERRAL_FIRST_BUY_STARS}
    rounding={false}
    showPrefix
    fixedDecimalScale={false}
    decimalScale={0}
  />
);

type ReferralFirstBuyDiscountBannerProps = {
  onCollapseEnd?: (node: HTMLElement) => void;
};

function ReferralFirstBuyDiscountBanner({
  onCollapseEnd,
}: ReferralFirstBuyDiscountBannerProps) {
  return (
    <Collapse in appear onEntered={onCollapseEnd}>
      <div>
        <div className={styles.ReferralFirstBuyDiscountBanner}>
          <div className="container h-100">
            <p className={styles.ReferralFirstBuyDiscountBannerText}>
              <FormattedMessage
                defaultMessage="En tu primera compra tienes un descuento de {discountPrice} por ser referido."
                values={{ discountPrice }}
              />
            </p>
          </div>
        </div>
      </div>
    </Collapse>
  );
}

export { ReferralFirstBuyDiscountBanner };
