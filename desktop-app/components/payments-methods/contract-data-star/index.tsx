import { CustomOffCanvas } from "react-app/src/components/common/widgets/custom-off-canvas";
import { FormattedMessage } from "react-intl";
import { RootState } from "react-app/src/state/store";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import SelectorStar from "../selector-star";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CouponFormV2 } from "../coupon-form-v.2";

const offCanvasStyle = {
  content: {
    backgroundColor: "white",
  },
};

type FormValuesType = {
  star: number;
  original_price: number;
  contractPrice: number;
};

function ContractDataStar({
  star,
  contractPrice,
  original_price,
  contractReference,
}: FormValuesType) {
  const couponData = useSelector(
    ({ payments }: RootState) => payments.fetchDiscountCouponReducer
  );

  const [state, setstate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
              <p
                style={
                  original_price !== contractPrice
                    ? { textDecoration: "line-through", color: "#8D8D8D" }
                    : { textDecoration: "none" }
                }
                className={styles.containerPriceStarBody_left_p}
              >
                <PriceLayout decimalScale={0} price={original_price} />
              </p>
            </div>
            <div className={styles.containerPriceStarBody_left_div}>
              <SelectorStar star={star} setstate={setstate} state={state} />
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
        <div className={styles.containerPriceStarFooter}>
          <p>
            {" "}
            <FormattedMessage defaultMessage="Total" />
          </p>
          <div>
            <p>
              <PriceLayout
                decimalScale={0}
                price={
                  couponData.completed
                    ? couponData.data.finalAmount
                    : contractPrice
                }
              />
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
