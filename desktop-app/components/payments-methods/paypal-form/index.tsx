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
import { useIntl } from "lib/custom-intl";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";
import PaymentMethodFormWrapper from "../form-wrapper";
import PaymentMethodFormLabel from "../form-label";
import PaymentMethodFormElement from "../form-element";
import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";
import { SubmitCallbackInFlutterWebview } from "lib/utils/SubmitCallbackInFlutterWebview";
import { checkFlutterWindowsInstance } from "lib/utils/checkFlutterWindowsInstance";

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
  const { locale } = useIntl();
  const sectionId = `section-${index}`;
  const labelId = `label-${index}`;
  const [errorMessage, setErrorMessage] = useState(null);
  const togglePaymentInProcess = useTogglePaymentInProcess();
  const stars = useDiscountStarsSelected()[0];

  const onPayPalButtonApprove = async (orderId, authorizationId) => {
    togglePaymentInProcess();
    const {
      deviceId,
      IP,
      userAgent,
      geolocation,
    } = await getBuyerIdentityData();
    processPayPalPayment(
      contractReference,
      orderId,
      authorizationId,
      discountCouponId,
      deviceId,
      IP,
      userAgent,
      geolocation,
      locale,
      stars
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
          if (!checkFlutterWindowsInstance()) {
            push(getPurchaseSummaryPath(res.reference));
          } else {
            SubmitCallbackInFlutterWebview({
              paymentType: "paypal",
            });
          }
        } else {
          analytics.track("PENDING_TO_VALIDATE_PAYMENT", analyticsData);
          if (!checkFlutterWindowsInstance()) {
            push(getPurchaseSummaryPath(res.reference));
          } else {
            SubmitCallbackInFlutterWebview({
              paymentType: "paypal",
            });
          }
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
      <PaymentMethodFormWrapper>
        <PaymentMethodFormLabel role="button" onToggle={onToggle}>
          <PaypalIcon className={styles.CardIcon} />

          <span className={styles.Label}>Paypal</span>
          {expanded ? (
            <DotCircle className={styles.CheckIcon} />
          ) : (
            <Ellipse className={styles.CheckIcon} />
          )}
        </PaymentMethodFormLabel>
        <PaymentMethodFormElement
          labelId={labelId}
          sectionId={sectionId}
          expanded={expanded}
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
        </PaymentMethodFormElement>
      </PaymentMethodFormWrapper>
    </PayPalScriptProvider>
  );
}

export default PaypalForm;
