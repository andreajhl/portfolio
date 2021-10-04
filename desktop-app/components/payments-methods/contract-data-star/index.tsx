import { CustomOffCanvas } from "react-app/src/components/common/widgets/custom-off-canvas";
import { FormattedMessage } from "react-intl";
import SelectorStar from "../selector-star";
import styles from "./styles.module.scss";
import { useState } from "react";
import { CouponFormV2 } from "../coupon-form-v.2";
import {
  BasePrice,
  OriginalPrice,
  TotalPrice,
  DiscountAmount,
} from "../price-summary-layouts";
import useGetContractToPayState from "lib/hooks/useGetContractToPayState";
import useHasAppliedCoupon from "lib/hooks/useHasAppliedCoupon";
import useContractHasCelebrityDiscount from "lib/hooks/useContractHasCelebrityDiscount";
import Maybe from "desktop-app/components/common/helpers/maybe";
import classes from "classnames";
import { Collapse } from "react-bootstrap";

const offCanvasStyle = {
  content: {
    backgroundColor: "white",
  },
};

function ContractDataStar() {
  const contractReference = useGetContractToPayState()?.contractToPay
    ?.reference;
  const [isOpen, setIsOpen] = useState(false);

  const hasAppliedCoupon = useHasAppliedCoupon();
  const contractHasCelebrityDiscount = useContractHasCelebrityDiscount();

  return (
    <div className={styles.containerPriceStar}>
      <div className={styles.containerPriceStar_div}>
        <h2>
          <FormattedMessage defaultMessage="DETALLES DEL PRECIO" />
        </h2>
        <div className={styles.containerPriceStarBody}>
          <div className={styles.containerPriceStarBody_left}>
            <div className={styles.containerPriceStarBody_left_header}>
              <p style={{ marginLeft: "5%" }}>
                <FormattedMessage defaultMessage="Video personalizado" />
              </p>
              <p>
                <Maybe it={contractHasCelebrityDiscount}>
                  <span
                    className={classes(
                      styles.containerPriceStarBody_left_p,
                      styles.OriginalPrice
                    )}
                  >
                    <OriginalPrice />
                  </span>
                </Maybe>
                <BasePrice />
              </p>
            </div>
            <div className={styles.containerPriceStarBody_left_div}>
              <SelectorStar />
            </div>
            <button
              className={styles.containerPriceStarBody_left_btn}
              onClick={() => setIsOpen(true)}
            >
              <p>
                <FormattedMessage defaultMessage="Introduce un cupón" />
              </p>
            </button>
          </div>
        </div>
        <Collapse in={hasAppliedCoupon} unmountOnExit>
          <div className={styles.containerPriceStarBody_left_header}>
            <p style={{ marginLeft: "5%" }}>
              <FormattedMessage defaultMessage="Descuento" />
            </p>
            <p>
              <DiscountAmount />
            </p>
          </div>
        </Collapse>
        <div className={styles.containerPriceStarFooter}>
          <p>
            <FormattedMessage defaultMessage="Total" />
          </p>
          <div>
            <p>
              <TotalPrice />
            </p>
          </div>
          <CustomOffCanvas
            isOpen={isOpen}
            position="bottom"
            width="100%"
            style={offCanvasStyle}
            height="auto"
          >
            <CouponFormV2
              contractReference={contractReference}
              setIsOpen={setIsOpen}
            />
          </CustomOffCanvas>
        </div>
      </div>
    </div>
  );
}

export { ContractDataStar };
