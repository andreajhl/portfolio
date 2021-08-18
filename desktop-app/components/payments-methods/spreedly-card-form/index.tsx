import { getPurchaseSummaryPath } from "constants/paths";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import WarningMessage from "desktop-app/components/common/warning-message";
import { FormattedMessage } from "lib/custom-intl";
import useForm from "lib/hooks/useForm";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { processSpreedlyPayment } from "react-app/src/state/ducks/payments/actions";
import useScript from "react-script-hook";
import styles from "./styles.module.scss";

const SPREEDLY_API_KEY = process.env.NEXT_PUBLIC_SPREEDLY_API_KEY;
const scriptSrc = "https://core.spreedly.com/iframe/iframe-v1.min.js";

interface SpreedlyCardFormProps {
  contractReference: string;
  discountCouponId: number;
}

const initialValuesForm = {
  first_name: "",
  last_name: "",
  month: "",
  year: "",
};

function SpreedlyCardForm({
  contractReference,
  discountCouponId,
}: SpreedlyCardFormProps) {
  const { push } = useRouter();
  const [isProccesing, setIsProccesing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const { values, onChangeField, submitForm, errors } = useForm({
    initialValues: initialValuesForm,
    onSubmit(data) {
      submitPaymentForm(data);
    },
  });
  const [loading, error] = useScript({
    src: scriptSrc,
    checkForExisting: true,
    onload: () => initSpreadly(),
  });

  useEffect(() => {
    if (window.Spreedly) {
      initSpreadly();
    }
    return () => {
      if (window.Spreedly) {
        window.Spreedly.removeHandlers();
      }
    };
  }, []);
  const initSpreadly = () => {
    window.Spreedly.init(SPREEDLY_API_KEY, {
      numberEl: "spreedly-number-test",
      cvvEl: "spreedly-cvv-test",
    });
    window.Spreedly.on("ready", () => {
      setupSpreedly();
    });
  };

  const setupSpreedly = () => {
    const Spreedly = window.Spreedly;
    Spreedly.setFieldType("number", "text");
    Spreedly.setFieldType("cvv", "text");
    Spreedly.setPlaceholder("number", "Card");
    Spreedly.setPlaceholder("cvv", "CVV");
    Spreedly.setStyle(
      "number",
      "border-radius: 3px;color: #495057;box-sizing: border-box; border: 1px solid #ccc; font-size: 1rem; height: 56px; padding: 0.375rem 0.75rem; line-height: 1.5; width: 100%;background-color: #fff"
    );
    Spreedly.setStyle(
      "cvv",
      "border-radius: 3px;color: #495057;box-sizing: border-box; border: 1px solid #ccc; font-size: 1rem; height: 56px; padding: 0.375rem 0.75rem; line-height: 1.5; width: 100%;background-color: #fff"
    );

    Spreedly.on("fieldEvent", function (name, event, activeElement, inputData) {
      if (event == "input") {
        if (inputData["validCvv"]) {
          Spreedly.setStyle("cvv", "background-color: #CDFFE6;");
        } else {
          Spreedly.setStyle("cvv", "background-color: #FFFFFF;");
        }
        if (inputData["validNumber"]) {
          Spreedly.setStyle("number", "background-color: #CDFFE6;");
        } else {
          Spreedly.setStyle("number", "background-color: #FFFFFF;");
        }
      }
    });

    Spreedly.on("errors", function (errors) {
      const errorMessages = Array.isArray(errors)
        ? errors.map((error) => error.message).join(".")
        : "Error";
      setPaymentError(errorMessages);
      setIsProccesing(false);
      setIsCreatingToken(false);
    });

    Spreedly.on("paymentMethod", (token, pmData) => {
      setIsProccesing(true);
      startSpreedlyPayment(token);
    });
  };

  const startSpreedlyPayment = async (token) => {
    if (!isProccesing) {
      try {
        setPaymentError(null);
        await processSpreedlyPayment({
          contractReference: contractReference,
          token,
          discountCouponId,
        });
        push(getPurchaseSummaryPath(contractReference));
      } catch (error) {
        setIsProccesing(false);
        setIsCreatingToken(false);
        setPaymentError(typeof error === "string" ? error : "Error");
      }
    }
  };

  const submitPaymentForm = (requiredFields) => {
    if (!isCreatingToken) {
      setIsCreatingToken(true);
      window.Spreedly.tokenizeCreditCard(requiredFields);
      setIsProccesing(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={submitForm}>
      <fieldset>
        <div>
          <Field
            label="Primer Nombre"
            id="first_name"
            type="text"
            name="first_name"
            onChange={onChangeField}
            value={values.first_name}
            required={true}
            placeholder="Juan"
          />
          <Field
            id="last_name"
            type="text"
            name="last_name"
            onChange={onChangeField}
            value={values.last_name}
            placeholder="Perez"
            required={true}
            label="Apellido"
          />
        </div>
      </fieldset>
      <fieldset>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: 90,
              width: "60%",
            }}
          >
            <label className={styles.LabelForm} htmlFor="spreedly-number-test">
              Numero de tarjeta de credito
            </label>
            <div
              id="spreedly-number-test"
              style={{
                height: "100%",
              }}
            ></div>
          </div>
          <div
            style={{
              height: 90,
              width: "30%",
            }}
          >
            <label className={styles.LabelForm} htmlFor="spreedly-cvv-test">
              CVV
            </label>
            <div
              id="spreedly-cvv-test"
              style={{
                height: "100%",
              }}
            ></div>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label className={styles.LabelForm}>Fecha de expiracion</label>
          <div
            style={{
              display: "flex",
            }}
          >
            <Field
              id="month"
              type="text"
              size={3}
              maxLength={2}
              placeholder="MM"
              name="month"
              onChange={onChangeField}
              value={values.month}
              label="Mes"
              styleWraper={{
                flexGrow: 1,
              }}
            />
            <span>/</span>
            <Field
              styleWraper={{
                flexGrow: 1,
                marginLeft: "10px",
              }}
              label="Año"
              id="year"
              type="text"
              size={5}
              maxLength={4}
              onChange={onChangeField}
              name="year"
              value={values.year}
              placeholder="YYYY"
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        {paymentError && <WarningMessage message={paymentError} />}
        <SubmitButton loading={isProccesing} disabled={loading || isProccesing}>
          <FormattedMessage defaultMessage="Pagar" />
        </SubmitButton>
      </fieldset>
    </form>
  );
}

export { SpreedlyCardForm };

interface FieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  styleWraper?: React.CSSProperties;
}
const Field = ({ label, id, styleWraper, ...inputsProps }: FieldProps) => (
  <div className={styles.FieldRow} style={{ ...styleWraper }}>
    <label htmlFor={id} className={styles.LabelForm}>
      {label}
    </label>
    <input {...inputsProps} className={styles.InputElement} id={id} />
  </div>
);
