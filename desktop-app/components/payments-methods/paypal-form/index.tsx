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

type PaypalFormProps = {
  expanded: boolean;
  index: number;
  contractPrice: number;
  contractReference: string;
  onToggle: () => void;
  discountCouponId?: number;
};

function PaypalForm({
  expanded,
  index,
  onToggle,
  contractReference,
  contractPrice,
  discountCouponId,
}: PaypalFormProps) {
  const { push } = useRouter();
  const sectionId = `section-${index}`;
  const labelId = `label-${index}`;
  const [errorMessage, setErrorMessage] = useState(null);
  const onPayPalButtonApprove = (orderId, authorizationId) => {
    processPayPalPayment(
      contractReference,
      orderId,
      authorizationId,
      discountCouponId
    )
      .then((res) => {
        // TODO: conectar con pixel de facebook
        if (res.status === 10) {
          //   if (typeof window !== "undefined") {
          //     if (window.fbq != null) {
          //       window.fbq("track", "Purchase", {
          //         content_type: "product",
          //         content_ids:
          //           VIDEO_MESSAGE_PRODUCT_ID_PREFIX + this.props.celebrityId,
          //         value: this.props.contractPrice,
          //         currency: "USD",
          //       });
          //     }
          //   }
          // TODO: conectar con GTM
          // GTM.tagManagerDataLayer("CONTRACT_PAYED", res.data);
          push(getPurchaseSummaryPath(res.reference));
        } else {
          // TODO: conectar con GTM

          // GTM.tagManagerDataLayer("PENDING_TO_VALIDATE_PAYMENT", res.data);
          push(CLIENT_HIRINGS);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
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
            Haz clic en el seguiente botón para hacer el pago utilizando tu
            cuenta de paypal.
          </p>

          <p>
            Serás redirigido a la página oficial de paypal para continuar con el
            pago
          </p>

          <PaypalReactButton
            contractReference={contractReference}
            contractPrice={contractPrice}
            onPayPalButtonError={() => console.log("onPayPalButtonError")}
            onPayPalButtonCancel={(e) => console.log(e, "onPayPalButtonCancel")}
            onPayPalButtonApprove={onPayPalButtonApprove}
          />
        </Maybe>
        <Maybe it={errorMessage}>
          <WarningMessage message={errorMessage} />
        </Maybe>
      </div>
    </div>
  );
}

export default PaypalForm;
