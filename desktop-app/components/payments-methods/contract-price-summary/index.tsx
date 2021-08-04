import Maybe from "desktop-app/components/common/helpers/maybe";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import { useEffect, useState } from "react";
import { RootState } from "react-app/src/state/store";
import { FormattedMessage } from "react-intl";
import { connect, ConnectedProps } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = ({ payments }: RootState) => ({
  couponData: payments.fetchDiscountCouponReducer,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ContractPriceSummaryProps = {
  contractPrice: number;
  original_price: number;
} & PropsFromRedux;

function ContractPriceSummary({
  contractPrice,
  original_price,
  couponData,
}: ContractPriceSummaryProps) {
  return (
    <div className={styles.ContractPriceSummary}>
      <Maybe it={original_price !== contractPrice}>
        <div className={styles.SummaryRow}>
          <span className={styles.BoldText}>
            <FormattedMessage defaultMessage="Precio Original" />
          </span>
          <div>
            <span className={styles.OriginalPrice}>
              <PriceLayout decimalScale={0} price={original_price} />
            </span>
            <span className={styles.BoldText}>
              <PriceLayout
                decimalScale={0}
                price={
                  couponData.completed
                    ? couponData.data.finalAmount
                    : contractPrice
                }
              />
            </span>
          </div>
        </div>
      </Maybe>
      <Maybe it={couponData.completed}>
        <div className={styles.SummaryRow}>
          <span className={styles.BoldText}>
            <FormattedMessage defaultMessage="Descuento" />
          </span>
          <div>
            {couponData.data?.isPercentageDiscount
              ? `${(couponData.data?.discountPercentage * 100).toFixed(2)}%  | `
              : null}
            <PriceLayout
              decimalScale={0}
              price={couponData.data.discountAmount}
            ></PriceLayout>
          </div>
        </div>
      </Maybe>
      <div className={styles.SummaryRow}>
        <span className={styles.BoldText}>
          <FormattedMessage defaultMessage="Total" />
        </span>
        <span className={styles.BoldText}>
          <PriceLayout
            decimalScale={0}
            price={
              couponData.completed ? couponData.data.finalAmount : contractPrice
            }
          />
        </span>
      </div>
    </div>
  );
}

const _ContractPriceSummary = connector(ContractPriceSummary);

export { _ContractPriceSummary as ContractPriceSummary };
