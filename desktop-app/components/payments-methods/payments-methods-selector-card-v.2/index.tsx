import { isAValidDLocalPaymentMethod } from "lib/utils/dLocalPaymentMethodsValidations";
import { listPaymentGateways } from "react-app/src/state/ducks/payments/operations";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { sessionOperations } from "react-app/src/state/ducks/session";
import { PaymentMethodsSelectorCardSkeleton } from "desktop-app/components/payments-methods/payments-methods-selector-card/skeleton";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import PaymentMethodsAvailableListV2 from "../payment-methods-available-list-v.2";

type PaymentsMethodsSelectorCardProps = {
  contractPrice: number;
  contractReference: string;
  celebrityId: number;
};

const messages = defineMessages({
  errorDataIncomplete: {
    defaultMessage: "Por favor ingrese todos los datos",
  },
});

function PaymentsMethodsSelectorCardV2({
  contractPrice,
  contractReference,
  celebrityId,
}: PaymentsMethodsSelectorCardProps) {
  const {
    currencyExchangeReducer,
    fetchPaymentGatewaysReducer,
    fetchDiscountCouponReducer,
    userPaymentMethodSelected,
  } = useSelector((state) => state.payments);
  const userInformationLoading = useSelector(
    (state) => state.session.getSessionReducer.loading
  );

  const currentPaymentMethodSelected = userPaymentMethodSelected.name;
  const paymentGatewayLoading = fetchPaymentGatewaysReducer.loading;
  const paymentMethodsAvailable = fetchPaymentGatewaysReducer.data;
  const currencyExchangeData = currencyExchangeReducer.data;

  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInformationLoading) dispatch(sessionOperations.getToken());
  }, []);

  useEffect(() => {
    dispatch(listPaymentGateways(currencyExchangeData.to));
  }, [currencyExchangeData.to]);

  const DLocalPersonalInfoFormRef = useRef(null);
  const [dLocalBuyerFormData, setDLocalBuyerFormData] = useState({
    buyer_name: "",
    email_address: "",
    identification_document: "",
  });
  const [errorMessageForDLocalForm, setErrorMessageForDLocalForm] = useState(
    ""
  );

  const shouldDisplayDLocalForm = isAValidDLocalPaymentMethod(
    currentPaymentMethodSelected
  );

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
              onBuyerDataIncomplete={() => {
                DLocalPersonalInfoFormRef.current.focus();
                setErrorMessageForDLocalForm(
                  formatMessage(messages.errorDataIncomplete)
                );
              }}
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
