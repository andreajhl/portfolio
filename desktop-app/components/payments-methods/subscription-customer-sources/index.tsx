import SubmitButton from "desktop-app/components/common/button/submit-button";
import WarningMessage from "desktop-app/components/common/warning-message";
import { FormattedMessage } from "lib/custom-intl";
import React from "react";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import styles from "./styles.module.scss";
import { processSubscriptionPayment } from "react-app/src/state/ducks/payments/actions";
import { useRouter } from "next/router";
import { SUBSCRIPTION_SUCCESS } from "constants/paths";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { SUBSCRIPTION_PLAN_PRICE } from "constants/celebritySubscriptionPlan";
import { analytics } from "react-app/src/state/utils/gtm";

interface SubscriptionCustomerSourcesProps {
  sources: {
    cardType: string;
    token: string;
    lastFourDigits: string;
  }[];
  onDeleteSource: (cardToken: string) => void;
  celebrityId: string;
}

function SubscriptionCustomerSources({
  sources,
  celebrityId,
  onDeleteSource,
}: SubscriptionCustomerSourcesProps) {
  const { push, query } = useRouter();
  const [selectedSourceIndex, setselectedSourceIndex] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [isProccesing, setIsProccesing] = useState(false);

  const startPayment = () => {
    if (typeof selectedSourceIndex !== "number") {
      setPaymentError("Por favor selecciona una tarjeta");
    } else {
      startSpreedlyPayment(sources[selectedSourceIndex].token);
    }
  };
  const startSpreedlyPayment = async (cardToken) => {
    try {
      setPaymentError(null);
      setIsProccesing(true);
      await processSubscriptionPayment({
        celebrityId,
        cardToken,
      });
      analytics.trackSubscription({
        celebrityId,
        subscriptionPlanPrice: SUBSCRIPTION_PLAN_PRICE,
      });
      push(
        SUBSCRIPTION_SUCCESS.replace(
          ":celebrity_username",
          query.celebrity_username as string
        )
      );
    } catch (error) {
      setIsProccesing(false);
      setPaymentError(
        typeof error === "string" ? (
          error
        ) : (
          <FormattedMessage defaultMessage="Ha ocurrido un error procesando tu pago" />
        )
      );
    }
  };

  const canDeleteSources = sources?.length > 1;

  const removeSourceConfirm = (index) => {
    if (!canDeleteSources) return;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h4>¿Eliminar tarjeta?</h4>
            <br />
            <button
              className={"btn btn-danger mr-2"}
              onClick={() => {
                onDeleteSource(sources[index].token);
                onClose();
              }}
            >
              Si, eliminar
            </button>
            <button
              className={"btn mr-2"}
              onClick={() => {
                onClose();
              }}
            >
              No
            </button>
          </div>
        );
      },
    });
  };
  return (
    <div id="user_spreedly_sources">
      <p>
        <FormattedMessage defaultMessage="Selecciona una tarjeta" />
      </p>
      {sources.map((source, index) => (
        <div
          className={styles.SourceOption}
          onClick={() => setselectedSourceIndex(index)}
        >
          <div>
            <span
              style={{
                textTransform: "uppercase",
              }}
            >
              {source.cardType}
            </span>
          </div>
          <div>
            <span>**** **** **** {source.lastFourDigits || ""}</span>
          </div>
          <div>
            {selectedSourceIndex === index ? (
              <i className={"fa fa-check text-primary"} />
            ) : null}
          </div>
          <Maybe it={canDeleteSources}>
            <div onClick={() => removeSourceConfirm(index)}>
              <i className={"fa fa-trash"} />
            </div>
          </Maybe>
        </div>
      ))}
      {paymentError && (
        <div className="my-1">
          {" "}
          <WarningMessage message={paymentError} />
        </div>
      )}
      <SubmitButton
        disabled={isProccesing}
        loading={isProccesing}
        variant="primary"
        onClick={() => startPayment()}
      >
        <FormattedMessage defaultMessage="Suscribirme" />
      </SubmitButton>
    </div>
  );
}

export default SubscriptionCustomerSources;
