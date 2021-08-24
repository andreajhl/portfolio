import { getPurchaseSummaryPath } from "constants/paths";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import WarningMessage from "desktop-app/components/common/warning-message";
import { FormattedMessage, IntlFormatters } from "lib/custom-intl";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import useUserCurrentCurrency from "lib/hooks/useUserCurrentCurrency";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import React, { useEffect } from "react";
import { useState } from "react";
import { processSpreedlyPayment } from "react-app/src/state/ducks/payments/actions";
import useScript from "react-script-hook";
import styles from "./styles.module.scss";
import errorMessages from "lib/validations/errorMessages";
import { allowedFormatDocuments } from "constants/userDocumentFormatAllowedByCurrency";
import { getEmailValidator } from "lib/validations/common";
import { getUserCookieCountryCode } from "lib/utils/getUserCookieCountryCode";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";

const SPREEDLY_API_KEY = process.env.NEXT_PUBLIC_SPREEDLY_API_KEY;
const scriptSrc = "https://core.spreedly.com/iframe/iframe-v1.min.js";

interface SpreedlyCardFormProps {
  contractReference: string;
  discountCouponId: number;
}

const initialValuesForm = {
  full_name: "",
  email: "",
  month: "",
  year: "",
  identification_document: "",
};

type InitialValuesType = typeof initialValuesForm;

function getValidations(
  formatMessage: IntlFormatters["formatMessage"],
  currency: string
): ValidationsType<InitialValuesType> {
  return {
    full_name(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.emptyNameError);
      }
    },
    email: getEmailValidator(formatMessage),
    identification_document(value) {
      const checkDocument = allowedFormatDocuments[currency];
      if (typeof checkDocument === "function" && !checkDocument(value)) {
        return formatMessage(errorMessages.invalidIdentificationDocument);
      }
    },
  };
}

function SpreedlyCardForm({
  contractReference,
  discountCouponId,
}: SpreedlyCardFormProps) {
  const userCurrency = useUserCurrentCurrency();
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const [isProccesing, setIsProccesing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const { values, onChangeField, submitForm, errors } = useForm({
    initialValues: initialValuesForm,
    validations: getValidations(formatMessage, userCurrency),
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
      window.Spreedly.removeHandlers();
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
    const {
      deviceId,
      IP,
      userAgent,
      geoLocalization,
    } = await getBuyerIdentityData();
    if (!isProccesing) {
      try {
        setPaymentError(null);
        await processSpreedlyPayment({
          contractReference: contractReference,
          token,
          discountCouponId,
          deviceId,
          IP,
          userAgent,
          geoLocalization,
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
      window.Spreedly.tokenizeCreditCard({
        ...requiredFields,
        country: getUserCookieCountryCode(),
      });
      setIsProccesing(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={submitForm}>
      <fieldset>
        <div>
          <Field
            label="Nombre Completo"
            id="full_name"
            type="text"
            name="full_name"
            onChange={onChangeField}
            value={values.full_name}
            required={true}
            placeholder="Juan"
          />
          <Field
            label="Email"
            id="email"
            type="text"
            name="email"
            onChange={onChangeField}
            value={values.email}
            required={true}
            placeholder="juan@mail.com"
          />
          <Field
            label="Documento de Identidad"
            id="identification_document"
            type="text"
            name="identification_document"
            onChange={onChangeField}
            value={values.identification_document}
            required={true}
            placeholder="juan@mail.com"
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
