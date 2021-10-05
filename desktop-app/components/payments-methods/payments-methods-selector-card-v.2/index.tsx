import { listPaymentGateways } from "react-app/src/state/ducks/payments/operations";
import { FormattedMessage } from "react-intl";
import { sessionOperations } from "react-app/src/state/ducks/session";
import { PaymentMethodsSelectorCardSkeleton } from "desktop-app/components/payments-methods/payments-methods-selector-card/skeleton";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import styles from "./styles.module.scss";
import PaymentMethodsAvailableListV2 from "../payment-methods-available-list-v.2";
import { RootState } from "react-app/src/state/store";
import { useAuth } from "lib/famosos-auth";

function paymentsSelector(state: RootState) {
  return state.payments;
}

type PaymentsMethodsSelectorCardProps = {
  contractPrice: number;
  contractReference: string;
  celebrityId: number;
};

function PaymentsMethodsSelectorCardV2({
  contractPrice,
  contractReference,
  celebrityId,
}: PaymentsMethodsSelectorCardProps) {
  const {
    currencyExchangeReducer,
    fetchPaymentGatewaysReducer,
    fetchDiscountCouponReducer,
  } = useSelector(paymentsSelector);
  const { user } = useAuth();
  const userInformationLoading = !user;
  const paymentGatewayLoading = fetchPaymentGatewaysReducer.loading;
  const paymentMethodsAvailable = fetchPaymentGatewaysReducer.data;
  const currencyExchangeData = currencyExchangeReducer.data;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInformationLoading) dispatch(sessionOperations.getToken());
  }, []);

  useEffect(() => {
    dispatch(listPaymentGateways(currencyExchangeData.to));
  }, [currencyExchangeData.to]);

  return (
    <Maybe
      it={!userInformationLoading && !paymentGatewayLoading}
      orElse={<PaymentMethodsSelectorCardSkeleton />}
    >
      <div className={styles.PaymentsMethodsSelectorCard}>
        <div className={styles.PaymentsMethodsSelectorCardDiv}>
          <div className={styles.PaymentMethodFormSection}>
            <h2 className={styles.PaymentMethodFormTitle}>
              <FormattedMessage defaultMessage="SELECCIONA MÉTODO DE PAGO" />
            </h2>
            <PaymentMethodsAvailableListV2
              discountCouponId={fetchDiscountCouponReducer.data?.id || null}
              contractPrice={contractPrice}
              contractReference={contractReference}
              payment_methods={paymentMethodsAvailable}
              celebrityId={celebrityId}
            />
          </div>
        </div>
      </div>
    </Maybe>
  );
}

export default PaymentsMethodsSelectorCardV2;
