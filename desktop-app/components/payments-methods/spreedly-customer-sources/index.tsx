import SubmitButton from "desktop-app/components/common/button/submit-button";
import WarningMessage from "desktop-app/components/common/warning-message";
import { FormattedMessage } from "lib/custom-intl";
import React from "react";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import styles from "./styles.module.scss";
import { processSpreedlyPayment } from "react-app/src/state/ducks/payments/actions";
import { useRouter } from "next/router";
import { getPurchaseSummaryPath } from "constants/paths";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";
import useUserCurrentCurrency from "lib/hooks/useUserCurrentCurrency";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { CardGenerationReminder } from "desktop-app/components/card-generation-reminder";
import { useIntl } from "react-intl";
import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";

interface SpreedlyCustomerSourcesProps {
  sources: {
    cardType: string;
    token: string;
    lastFourDigits: string;
  }[];
  onDeleteSource: (cardToken: string) => void;
  contractReference: string;
  discountCouponId: number;
}

function SpreedlyCustomSources({
  sources,
  contractReference,
  discountCouponId,
  onDeleteSource,
}: SpreedlyCustomerSourcesProps) {
  const { push } = useRouter();
  const { locale } = useIntl();
  const [selectedSourceIndex, setselectedSourceIndex] = useState(0);
  const [paymentError, setPaymentError] = useState(null);
  const [isProccesing, setIsProccesing] = useState(false);
  const userCurrency = useUserCurrentCurrency();
  const stars = useDiscountStarsSelected()[0];

  const startPayment = () => {
    if (typeof selectedSourceIndex !== "number") {
      setPaymentError("Por favor selecciona una tarjeta");
    } else {
      startSpreedlyPayment(sources[selectedSourceIndex].token);
    }
  };
  const startSpreedlyPayment = async (token) => {
    try {
      setPaymentError(null);
      setIsProccesing(true);
      const {
        deviceId,
        IP,
        userAgent,
        geolocation,
      } = await getBuyerIdentityData();
      await processSpreedlyPayment({
        contractReference: contractReference,
        token,
        discountCouponId,
        deviceId,
        IP,
        userAgent,
        geolocation,
        locale,
        stars,
      });
      push(getPurchaseSummaryPath(contractReference));
    } catch (error) {
      setIsProccesing(false);
      setPaymentError(
        typeof error === "string"
          ? error
          : "Ha ocurrido un error procesando tu pago"
      );
    }
  };
  const removeSourceConfirm = (index) => {
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
          <div onClick={() => removeSourceConfirm(index)}>
            <i className={"fa fa-trash"} />
          </div>
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
        <FormattedMessage defaultMessage="Pagar" />
      </SubmitButton>
    </div>
  );
}

export default SpreedlyCustomSources;
