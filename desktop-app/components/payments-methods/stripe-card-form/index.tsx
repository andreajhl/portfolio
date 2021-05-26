import React, { useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { processStripePayment } from "react-app/src/state/ducks/payments/actions";
import styles from "./styles.module.scss";
import { PURCHASE_SUMMARY } from "constants/paths";

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(STRIPE_KEY);

type StripeCardFormProps = {
  contractPrice: number;
  contractReference: string;
  discountCouponId: number | null;
};
function StripeCardForm({
  discountCouponId,
  contractPrice,
  contractReference,
}: StripeCardFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        discountCouponId={discountCouponId}
        contractPrice={contractPrice}
        contractReference={contractReference}
      />
    </Elements>
  );
}

export default StripeCardForm;

const CheckoutForm = ({
  contractReference,
  contractPrice,
  discountCouponId = null,
}) => {
  console.log(contractPrice, "contractPrice");
  console.log(contractReference, "contractReference");
  console.log(discountCouponId, "discountCouponId");
  const { push } = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });

  const applyStripeAuth = (sourceId) => {
    processStripePayment(contractReference, sourceId, discountCouponId)
      .then((res) => {
        if (res.data.status === "ERROR") {
          setError(res.data.error);
        } else {
          // TODO: conectar con FB pixel
          // if (typeof window !== "undefined" && window.fbq) {
          //   if (window.fbq != null) {
          //     window.fbq("track", "Purchase", {
          //       content_type: "product",
          //       content_ids:
          //         VIDEO_MESSAGE_PRODUCT_ID_PREFIX + this.props.celebrityId,
          //       value: this.props.contractPrice,
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
            setError(error.response?.data?.error || "Ha ocurrido un error.");
          }
        }
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createSource(
      elements.getElement(CardElement),
      {
        type: "card",
        currency: "USD",
        amount: contractPrice * 100,
        owner: billingDetails,
        usage: "reusable",
      }
    );

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      if (
        payload.source.status === "chargeable" &&
        payload.source.card.three_d_secure === "optional"
      )
        applyStripeAuth(payload.source.id);
    }
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
          label="Correo del titular de la tarjeta"
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
        <label className={styles.LabelForm}>Datos de la tarjeta</label>
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pagar
      </SubmitButton>
    </form>
  );
};

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

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement onChange={onChange} />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`btn btn-primary ${styles.SubmitButton}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Procesando..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);
