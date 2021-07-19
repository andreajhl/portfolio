import { PURCHASE_SUMMARY } from "constants/paths";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import WarningMessage from "desktop-app/components/common/warning-message";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { processStripePayment } from "react-app/src/state/ducks/payments/actions";
import { analytics } from "react-app/src/state/utils/gtm";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import styles from "./styles.module.scss";

type StripeCustomerSourcesProps = {
  celebrityId: number;
  contractReference: string;
  availableSources: {
    sourceId: string;
    typeData: {
      address_line1_check: any;
      address_zip_check: string;
      brand: string;
      country: string;
      cvc_check: string;
      dynamic_last4: any;
      exp_month: 2;
      exp_year: 2022;
      fingerprint: string;
      funding: "credit";
      last4: string;
      name: any;
      three_d_secure: string;
      tokenization_method: any;
    };
  }[];
  discountCouponId: number | null;
  contractPrice: number;
  onDeleteSource: (index: number) => void;
};

const messages = defineMessages({
  errorNoCardSelected: {
    defaultMessage: "Por favor seleccione una tarjeta",
  },
});

function StripeCustomerSources({
  availableSources,
  contractReference,
  discountCouponId,
  contractPrice,
  celebrityId,
  onDeleteSource,
}: StripeCustomerSourcesProps) {
  const { push } = useRouter();
  const { formatMessage } = useIntl();
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const applyStripeAuth = () => {
    if (selectedSourceId === null)
      setErrorMessage(formatMessage(messages.errorNoCardSelected));
    else {
      setErrorMessage("");
      setPaymentInProcess(true);
      processStripePayment(
        contractReference,
        selectedSourceId,
        discountCouponId
      )
        .then((res) => {
          if (res.data.status === "ERROR") {
            setPaymentInProcess(false);
            setErrorMessage(res.data.error);
          } else {
            analytics.trackContractPurchase({
              contractPrice,
              celebrityId,
            });
            analytics.track("CONTRACT_PAYED", {
              widget: "StripeCustomerSources",
              paymentMethod: "STRIPE",
              contractReference,
              discountCouponId,
              contractPrice,
              celebrityId,
            });
            push(
              PURCHASE_SUMMARY.replace(
                ":contract_reference",
                res.data.data.reference
              )
            );
          }
        })
        .catch((error) => {
          setPaymentInProcess(false);
          if (error.response) {
            setErrorMessage(error.response.data.error);
          }
        });
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
                onDeleteSource(index);
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
    <div className={styles.StripeCustomerSourcesWrapper}>
      <p>
        <FormattedMessage defaultMessage="Selecciona una tarjeta" />
      </p>
      {availableSources.map((source, index) => (
        <div
          className={styles.SourceOption}
          onClick={() => setSelectedSourceId(source.sourceId)}
        >
          <div>{source.typeData ? source.typeData.brand : ""}</div>
          <div>
            **** **** **** {source.typeData ? source.typeData.last4 : ""}
          </div>
          <div>
            {selectedSourceId === source.sourceId ? (
              <i className={"fa fa-check text-primary"} />
            ) : null}
          </div>
          <div onClick={() => removeSourceConfirm(index)}>
            <i className={"fa fa-trash"} />
          </div>
        </div>
      ))}
      {errorMessage !== "" && <WarningMessage message={errorMessage} />}
      <button
        onClick={applyStripeAuth}
        className={`btn btn-primary ${styles.PaymentButton}`}
      >
        <SubmitText
          baseText={
            paymentInProcess ? (
              <FormattedMessage defaultMessage="Procesando" />
            ) : (
              <FormattedMessage defaultMessage="Pagar" />
            )
          }
          status={paymentInProcess ? "loading" : "idle"}
        />
      </button>
    </div>
  );
}

export default StripeCustomerSources;
