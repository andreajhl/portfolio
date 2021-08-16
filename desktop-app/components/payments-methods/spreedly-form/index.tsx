import React, { useEffect, useState } from "react";
import PaymentMethodFormWrapper from "../form-wrapper";
import PaymentMethodFormLabel from "../form-label";
import PaymentMethodFormElement from "../form-element";
import { FormattedMessage } from "lib/custom-intl";

import {
  CardIcon,
  DotCircle,
  Ellipse,
} from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import useScript from "react-script-hook";
import { LoadingSpinner } from "desktop-app/components/common/loading-spinner";
import useForm from "lib/hooks/useForm";
import { processSpreedlyPayment } from "react-app/src/state/ducks/payments/actions";
import { getPurchaseSummaryPath } from "constants/paths";
import { useRouter } from "next/router";
import WarningMessage from "desktop-app/components/common/warning-message";
import SubmitButton from "desktop-app/components/common/button/submit-button";

declare global {
  interface Window {
    Spreedly: any;
  }
}

const SPREEDLY_API_KEY = process.env.NEXT_PUBLIC_SPREEDLY_API_KEY;
const scriptSrc = "https://core.spreedly.com/iframe/iframe-v1.min.js";

interface SpreedlyFormProps {
  onToggle: () => void;
  expanded: boolean;
  index: number;
  contractReference: string;
  discountCouponId: number;
}

const initialValuesForm = {
  first_name: "",
  last_name: "",
  month: "",
  year: "",
};

function SpreedlyForm({
  onToggle,
  expanded,
  index,
  contractReference,
  discountCouponId,
}: SpreedlyFormProps) {
  const { push } = useRouter();
  const [isProccesing, setIsProccesing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
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
      console.log(errors);
    });

    Spreedly.on("paymentMethod", (token, pmData) => {
      startSpreedlyPayment(token);
    });
  };

  const startSpreedlyPayment = async (token) => {
    try {
      setPaymentError(null);
      setIsProccesing(true);
      await processSpreedlyPayment({
        contractReference: contractReference,
        token,
        discountCouponId,
      });
      push(getPurchaseSummaryPath(contractReference));
    } catch (e) {
      setIsProccesing(false);
      setPaymentError(e.message || "Ha ocurrido un error procesando tu pago");
    }
  };

  const submitPaymentForm = (requiredFields) => {
    window.Spreedly.tokenizeCreditCard(requiredFields);
    setIsProccesing(true);
  };

  const sectionId = `section-${index}`;
  const labelId = `label-${index}`;
  return (
    <PaymentMethodFormWrapper>
      <PaymentMethodFormLabel role="button" onToggle={onToggle}>
        <CardIcon className={styles.CardIcon} />
        <span className={styles.LabelSection}>
          <FormattedMessage defaultMessage="Tarjeta de débito o crédito" />
        </span>
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
                <label
                  className={styles.LabelForm}
                  htmlFor="spreedly-number-test"
                >
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
            <SubmitButton loading={isProccesing} disabled={loading}>
              <FormattedMessage defaultMessage="Pagar" />
            </SubmitButton>
          </fieldset>
        </form>
      </PaymentMethodFormElement>
    </PaymentMethodFormWrapper>
  );
}
const SpreedlyFormComponent = SpreedlyForm;
export { SpreedlyFormComponent as SpreedlyForm };

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
