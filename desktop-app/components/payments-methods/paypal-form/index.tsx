import {
  DotCircle,
  Ellipse,
  PaypalIcon,
} from "desktop-app/components/common/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { processPayPalPayment } from "react-app/src/state/ducks/payments/actions";
import PaypalReactButton from "../paypal-react-button";
import styles from "./styles.module.scss";
import { CLIENT_HIRINGS, getPurchaseSummaryPath } from "constants/paths";
import WarningMessage from "desktop-app/components/common/warning-message";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { analytics } from "react-app/src/state/utils/gtm";
import { FormattedMessage } from "react-intl";
import useTogglePaymentInProcess from "lib/hooks/useTogglePaymentInProcess";

const INTENT = "authorize";
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_KEY;
const CURRENCY = "USD";
const LOCALE = "es_CO";
const PAYPAL_URL = "https://www.paypal.com/sdk/js?disable-funding=credit,card";

type PaypalFormProps = {
  expanded: boolean;
  index: number;
  contractPrice: number;
  contractReference: string;
  onToggle: () => void;
  discountCouponId?: number | null;
  celebrityId: number;
};

function PaypalForm({
  expanded,
  index,
  onToggle,
  contractReference,
  contractPrice,
  discountCouponId,
  celebrityId,
}: PaypalFormProps) {
  const { push } = useRouter();
  const sectionId = `section-${index}`;
  const labelId = `label-${index}`;
  const [errorMessage, setErrorMessage] = useState(null);
  const togglePaymentInProcess = useTogglePaymentInProcess();
  const onPayPalButtonApprove = (orderId, authorizationId) => {
    togglePaymentInProcess();
    processPayPalPayment(
      contractReference,
      orderId,
      authorizationId,
      discountCouponId
    )
      .then((res) => {
        const analyticsData = {
          ...res?.data,
          widget: "PaypalForm",
          paymentMethod: "PAYPAL",
          contractReference,
          discountCouponId,
          contractPrice,
          celebrityId,
        };
        if (res.status === 10) {
          analytics.trackContractPurchase({ celebrityId, contractPrice });
          analytics.track("CONTRACT_PAYED", analyticsData);
          push(getPurchaseSummaryPath(res.reference));
        } else {
          analytics.track("PENDING_TO_VALIDATE_PAYMENT", analyticsData);
          push(CLIENT_HIRINGS);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        togglePaymentInProcess();
      });
  };

  return (
    <PayPalScriptProvider
      options={{
        intent: "authorize",
        "client-id": CLIENT_ID,
        currency: "USD",
        locale: LOCALE,
        "disable-funding": "credit,card",
      }}
    >
      <div className={styles.FormSection}>
        <div
          role="button"
          onClick={onToggle}
          onKeyDown={(e) => {
            switch (e.key) {
              case " ":
              case "Enter":
                onToggle();
                break;
              default:
            }
          }}
          className={styles.FormLabel}
        >
          <PaypalIcon className={styles.CardIcon} />

          <span className={styles.Label}>Paypal</span>
          {expanded ? (
            <DotCircle className={styles.CheckIcon} />
          ) : (
            <Ellipse className={styles.CheckIcon} />
          )}
        </div>
        <div
          role="region"
          aria-labelledby={labelId}
          id={sectionId}
          className={styles.FormElement}
          hidden={!expanded}
        >
          <Maybe it={expanded}>
            <p>
              <FormattedMessage
                defaultMessage="Haz clic en el siguiente botón para hacer el pago utilizando tu
              cuenta de paypal."
              />
            </p>

            <p>
              <FormattedMessage
                defaultMessage="Serás redirigido a la página oficial de paypal para continuar con
              el pago"
              />
            </p>

            <PaypalReactButton
              contractReference={contractReference}
              contractPrice={contractPrice}
              onPayPalButtonError={(err) => console.log(err)}
              onPayPalButtonCancel={(e) =>
                console.log(e, "onPayPalButtonCancel")
              }
              onPayPalButtonApprove={onPayPalButtonApprove}
            />
          </Maybe>
          <Maybe it={errorMessage}>
            <WarningMessage message={errorMessage} />
          </Maybe>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default PaypalForm;
