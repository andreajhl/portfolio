import React, { useState } from "react";
import { useRouter } from "next/router";
import { processStripePayment } from "react-app/src/state/ducks/payments/actions";
import styles from "./styles.module.scss";
import {
  PURCHASE_SUMMARY,
  STRIPE_3D_SECURE_IFRAME,
  STRIPE_3D_SECURE_RESPONSE,
} from "constants/paths";
import { analytics } from "react-app/src/state/utils/gtm";
import {
  CardElement,
  injectStripe,
  ReactStripeElements,
} from "react-stripe-elements";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import useTogglePaymentInProcess from "lib/hooks/useTogglePaymentInProcess";
import WarningMessage from "desktop-app/components/common/warning-message";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import { CardGenerationReminder } from "desktop-app/components/card-generation-reminder";
import Maybe from "desktop-app/components/common/helpers/maybe";
import useUserCurrentCurrency from "lib/hooks/useUserCurrentCurrency";

type StripeComponentProps = {
  contractPrice: number;
  contractReference: string;
  discountCouponId: number | null;
  celebrityId: number;
  stripe?: ReactStripeElements.StripeProps;
};

const messages = defineMessages({
  unexpectedError: {
    defaultMessage: "Ha ocurrido un error.",
  },
});
function StripeCardForm({
  discountCouponId,
  contractPrice,
  contractReference,
  celebrityId,
  stripe,
}: StripeComponentProps) {
  const togglePaymentInProcess = useTogglePaymentInProcess();
  const { formatMessage, locale } = useIntl();
  const { push } = useRouter();
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState(null);
  const [paymentProcessError, setPaymentProcessError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });
  const userCurrency = useUserCurrentCurrency();

  const createStripe3DFlow = async (sourceId) => {
    togglePaymentInProcess();
    const iframeUrl = STRIPE_3D_SECURE_IFRAME.replace(
      ":contract_reference",
      contractReference
    );
    const responseURL =
      window.location.origin +
      STRIPE_3D_SECURE_RESPONSE.replace(
        ":contract_reference",
        contractReference
      );

    analytics.track("START_3D_SECURE_FLOW", {
      contractReference,
      discountCouponId,
      contractPrice,
      celebrityId,
      widget: "StripeCardForm",
    });

    await stripe
      .createSource({
        type: "three_d_secure",
        currency: "USD",
        amount: contractPrice * 100,
        three_d_secure: { card: sourceId },
        redirect: {
          return_url: responseURL,
        },
        owner: billingDetails,
      })
      .then((response) => {
        push({
          pathname: iframeUrl,
          query: { url: response.source.redirect.url },
        });
      })
      .catch((error) => {
        setPaymentProcessError(error);
        setProcessing(false);
      })
      .finally(() => togglePaymentInProcess());
  };

  const applyStripeAuth = async (sourceId) => {
    togglePaymentInProcess();
    const {
      deviceId,
      IP,
      userAgent,
      geoLocalization,
    } = await getBuyerIdentityData();
    processStripePayment(
      contractReference,
      sourceId,
      discountCouponId,
      deviceId,
      IP,
      userAgent,
      geoLocalization,
      locale
    )
      .then((res) => {
        if (res.data.status === "ERROR") {
          setPaymentProcessError(res.data.error);
          setProcessing(false);
        } else {
          analytics.trackContractPurchase({
            contractPrice,
            celebrityId,
          });
          analytics.track("CONTRACT_PAYED", {
            widget: "StripeCardForm",
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
        setProcessing(false);
        if (error.response) {
          if (error.response.data) {
            setPaymentProcessError(
              error.response?.data?.error ||
                formatMessage(messages.unexpectedError)
            );
          }
        }
      })
      .finally(() => togglePaymentInProcess());
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    analytics.track("SUBMIT_STRIPE_FORM", {
      contractReference,
      discountCouponId,
      contractPrice,
      celebrityId,
      widget: "StripeCardForm",
    });

    if (error) {
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe
      .createSource({
        type: "card",
        currency: "USD",
        owner: billingDetails,
        usage: "reusable",
      })
      .then((response) => {
        if (
          response.source.status === "chargeable" &&
          response.source.card.three_d_secure === "optional"
        ) {
          applyStripeAuth(response.source.id);
        } else if (
          response.source.card.three_d_secure === "optional" ||
          response.source.card.three_d_secure === "required" ||
          response.source.card.three_d_secure === "recommended"
        ) {
          createStripe3DFlow(response.source.id);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <form
      id="stripe-card-form"
      className={styles.CheckoutFormWrapper}
      onSubmit={handleSubmit}
    >
      <fieldset>
        <Field
          label="Nombre del titular de la tarjeta"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label={
            <FormattedMessage defaultMessage="Correo del titular de la tarjeta" />
          }
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
      </fieldset>
      <fieldset>
        <label className={styles.LabelForm}>
          <FormattedMessage defaultMessage="Datos de la tarjeta" />
        </label>
        <div>
          <CardElement
            onChange={(event) => {
              if (event.complete) {
                setCardComplete(event.complete);
                setError(null);
              } else if (event.error) {
                setError(event.error.message);
              }
            }}
          />
        </div>
      </fieldset>
      <Maybe it={userCurrency === "MXN"}>
        <CardGenerationReminder className="mt-3" />
      </Maybe>
      {(error || paymentProcessError) && (
        <WarningMessage message={error || paymentProcessError} />
      )}
      <SubmitButton
        style={{
          marginTop: "0.8rem",
        }}
        loading={processing}
        disabled={error || processing}
      >
        <FormattedMessage defaultMessage="Pagar" />
      </SubmitButton>
    </form>
  );
}

export default injectStripe(StripeCardForm);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className={styles.FieldRow}>
    <label htmlFor={id} className={styles.LabelForm}>
      {label}
    </label>
    <input
      className={styles.InputElement}
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);
