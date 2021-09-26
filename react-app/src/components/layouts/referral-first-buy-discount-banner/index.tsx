import { FormattedMessage } from "react-intl";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import styles from "./styles.module.scss";
import { STAR_PRICE_IN_DOLLARS } from "constants/referrals";
import Collapse from "react-bootstrap/Collapse";

const discountPrice = (
  <PriceLayout
    price={STAR_PRICE_IN_DOLLARS * 5}
    rounding={false}
    showPrefix
    fixedDecimalScale={false}
    decimalScale={0}
  />
);

function ReferralFirstBuyDiscountBanner() {
  return (
    <Collapse in appear>
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
