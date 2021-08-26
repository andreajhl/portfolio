import { getPurchaseSummaryPath } from "constants/paths";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import WarningMessage from "desktop-app/components/common/warning-message";
import { generateArrayOfNumbers } from "lib/utils/generateArrayOfNumber";
import { generateArrayOfYearsFromCurrentDate } from "lib/utils/generateArrayOfYears";
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

const NEXT_TEN_YEARS = generateArrayOfYearsFromCurrentDate(10);
const TWELVE_MONTHS = generateArrayOfNumbers(12);
const YEARS_OPTION_VALUES = NEXT_TEN_YEARS.map((el) => ({
  placeholder: el,
  value: el,
}));
const MONTHS_OPTION_VALUES = TWELVE_MONTHS.map((el) => ({
  placeholder: ++el,
  value: ++el,
}));
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
  const { values, onChangeField, submitForm, setFieldValue, errors } = useForm({
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
    Spreedly.setNumberFormat("prettyFormat");
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
          />
          <Field
            label="Email"
            id="email"
            type="text"
            name="email"
            onChange={onChangeField}
            value={values.email}
            required={true}
          />
          <Field
            label="Documento de Identidad"
            id="identification_document"
            type="text"
            name="identification_document"
            onChange={onChangeField}
            value={values.identification_document}
            required={true}
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
              width: "100%",
              overflow: "hidden",
            }}
          >
            <label className={styles.LabelForm} htmlFor="spreedly-number-test">
              <FormattedMessage defaultMessage="Numero de tarjeta de credito" />
            </label>
            <div
              id="spreedly-number-test"
              style={{
                height: "100%",
              }}
            ></div>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <div
            style={{
              display: "flex",
            }}
          >
            <FieldSelect
              id="month"
              label="Mes"
              optionInputs={MONTHS_OPTION_VALUES}
              selectElement={{
                required: true,
                name: "month",
                value: values.month,
                onChange: (e) => setFieldValue("month", e.target.value),
              }}
              styleWraper={{
                flexGrow: 1,
              }}
            />
            <span>/</span>
            <FieldSelect
              id="year"
              label="Año"
              optionInputs={YEARS_OPTION_VALUES}
              selectElement={{
                required: true,
                name: "year",
                value: values.year,
                onChange: (e) => setFieldValue("year", e.target.value),
              }}
              styleWraper={{
                flexGrow: 1,
              }}
            />

            <div
              style={{
                // flexGrow: 1,
                height: 90,
                width: "30%",
                marginLeft: "10px",
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

interface FieldSelectProps {
  optionInputs: {
    value: string | number;
    placeholder: string | number;
  }[];
  label: string;
  styleWraper?: React.CSSProperties;
  id: string;
  selectElement: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
}

const FieldSelect = ({
  label,
  id,
  styleWraper,
  optionInputs,
  selectElement,
}: FieldSelectProps) => (
  <div className={styles.FieldRow} style={{ ...styleWraper }}>
    <label htmlFor={id} className={styles.LabelForm}>
      {label}
    </label>
    <select
      {...selectElement}
      className={`custom-select ${styles.SelectElement}`}
      id={id}
    >
      {optionInputs.map((el) => (
        <option value={el.value}>{el.placeholder}</option>
      ))}
    </select>
  </div>
);
