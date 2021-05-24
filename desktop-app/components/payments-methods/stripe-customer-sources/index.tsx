import { PURCHASE_SUMMARY } from "constants/paths";
import WarningMessage from "desktop-app/components/common/warning-message";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { processStripePayment } from "react-app/src/state/ducks/payments/actions";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import styles from "./styles.module.scss";

type StripeCustomerSourcesProps = {
  celebrityId: string;
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
  discountCouponId: string;
  contractPrice: number;
  onDeleteSource: (index: number) => void;
};

function StripeCustomerSources({
  availableSources,
  contractReference,
  discountCouponId,
  contractPrice,
  celebrityId,
  onDeleteSource,
}: StripeCustomerSourcesProps) {
  const { push } = useRouter();
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const applyStripeAuth = () => {
    if (selectedSourceId === null)
      setErrorMessage("Por favor seleccione una tarjeta");
    else {
      setErrorMessage("");
      processStripePayment(
        contractReference,
        selectedSourceId,
        discountCouponId
      )
        .then((res) => {
          if (res.data.status === "ERROR") {
            this.setState({
              ...this.state,
              errorMessage: res.data.error,
            });
          } else {
            //   TODO: conectar facebook pixel
            // if (typeof window !== "undefined") {
            //   if (window.fbq != null) {
            //     window.fbq("track", "Purchase", {
            //       content_type: "product",
            //       content_ids:
            //         VIDEO_MESSAGE_PRODUCT_ID_PREFIX + celebrityId,
            //       value: contractPrice,
            //       currency: "USD",
            //     });
            //   }
            // }
            push(
              PURCHASE_SUMMARY.replace(
                ":contract_reference",
                res.data.data.reference
              )
            );
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data) {
              this.setState({
                ...this.state,
                errorMessage: error.response.data.error,
              });
            }
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
      <p>Selecciona una tarjeta</p>
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
        Pagar
      </button>
    </div>
  );
}

export default StripeCustomerSources;
