import React, { useRef, useState } from "react";
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
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });

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
        setError(error);
        setProcessing(false);
      })
      .finally(() => togglePaymentInProcess());
  };

  const applyStripeAuth = (sourceId) => {
    togglePaymentInProcess();
    processStripePayment(contractReference, sourceId, discountCouponId)
      .then((res) => {
        if (res.data.status === "ERROR") {
          setError(res.data.error);
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
            setError(
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

    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet. Make sure to disable
    //   // form submission until Stripe.js has loaded.
    //   return;
    // }

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

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      name: "",
    });
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod.id}
      </div>
    </div>
  ) : (
    <form className={styles.CheckoutFormWrapper} onSubmit={handleSubmit}>
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
      {error && <WarningMessage message={error} />}
      <SubmitButton processing={processing} error={error} disabled={false}>
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

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`btn btn-primary ${styles.SubmitButton}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? (
      <FormattedMessage defaultMessage="Procesando..." />
    ) : (
      children
    )}
  </button>
);
