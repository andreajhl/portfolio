import { allowedFormatDocuments } from "constants/userDocumentFormatAllowedByCurrency";
import { IntlFormatters } from "lib/custom-intl";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";
import { getEmailValidator } from "lib/validations/common";
import errorMessages from "lib/validations/errorMessages";
import React, { useEffect, useState } from "react";
import useScript from "react-script-hook";
import { FormattedMessage, useIntl } from "react-intl";
import useUserCurrentCurrency from "lib/hooks/useUserCurrentCurrency";
import { getUserCookieCountryCode } from "lib/utils/getUserCookieCountryCode";
import styles from "./styles.module.scss";
import { generateArrayOfYearsFromCurrentDate } from "lib/utils/generateArrayOfYears";
import { generateArrayOfNumbers } from "lib/utils/generateArrayOfNumber";
import { processSubscriptionPayment } from "react-app/src/state/ducks/payments/actions";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import { useRouter } from "next/router";
import { SUBSCRIPTION_SUCCESS } from "constants/paths";
import WarningMessage from "desktop-app/components/common/warning-message";
const SPREEDLY_API_KEY = process.env.NEXT_PUBLIC_SPREEDLY_API_KEY;
const scriptSrc = "https://core.spreedly.com/iframe/iframe-v1.min.js";
interface SpreedlyCardFormProps {
  contractReference: string;
  discountCouponId: number;
}

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
const initialValuesForm = {
  full_name: "",
  email: "",
  month: "",
  year: "",
  identification_document: "",
  shipping_address1: "",
  shipping_address2: "",
  shipping_country: "",
  shipping_state: "",
  shipping_city: "",
  shipping_zip: "",
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
      if (value.length === 0) {
        return formatMessage(errorMessages.invalidIdentificationDocument);
      }
    },
    shipping_address1(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.emptyAddressError);
      }
    },
    shipping_country(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.emptyCountryError);
      }
    },
    shipping_state(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.emptyStateError);
      }
    },
    shipping_city(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.emptyCityError);
      }
    },
  };
}

interface SpreedlyCheckoutFormProps {
  celebrityId: string;
}

function SpreedlyCheckoutForm({ celebrityId }: SpreedlyCheckoutFormProps) {
  const userCurrency = useUserCurrentCurrency();
  const { push, query } = useRouter();
  const { formatMessage } = useIntl();

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
  const { values, onChangeField, submitForm, setFieldValue, errors } = useForm({
    initialValues: initialValuesForm,
    validations: getValidations(formatMessage, userCurrency),
    onSubmit(data) {
      submitPaymentForm(data);
    },
  });
  const [isProccesing, setIsProccesing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const initSpreadly = () => {
    window.Spreedly.init(SPREEDLY_API_KEY, {
      numberEl: "spreedly-number",
      cvvEl: "spreedly-cvv",
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
      "width:100%;  height:25px; padding:0; margin: 0"
    );
    Spreedly.setStyle("cvv", "width:100%;  height:25px; padding:0; margin: 0");

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

  const startSpreedlyPayment = async (cardToken) => {
    if (!isProccesing) {
      try {
        setPaymentError(null);
        await processSubscriptionPayment({
          celebrityId,
          cardToken,
        });
        push(
          SUBSCRIPTION_SUCCESS.replace(
            ":celebrity_username",
            query.celebrity_username as string
          )
        );
      } catch (error) {
        setPaymentError(error.message);
        setIsCreatingToken(false);
        setIsProccesing(false);
      }
    }
  };
  const submitPaymentForm = (requiredFields) => {
    if (!isCreatingToken) {
      setIsCreatingToken(true);
      window.Spreedly.tokenizeCreditCard({
        ...requiredFields,
        country: getUserCookieCountryCode(),
        retained: true,
        storage_state: "retained",
      });
      setIsProccesing(true);
    }
  };

  return (
    <div className="d-flex w-100 m-0 flex-column">
      <h4>
        <FormattedMessage defaultMessage="Datos de la tarjeta" />
      </h4>
      <form onSubmit={submitForm}>
        <fieldset className="row">
          <div className="col-md-6 mb-3">
            <label className={styles.LabelForm} htmlFor="spreedly-number">
              <FormattedMessage defaultMessage="Numero de tarjeta de credito" />
            </label>
            <div
              id="spreedly-number"
              style={{
                height: "38px",
                display: "block",
                padding: "0.375rem 0.75rem",
                fontSize: "1rem",
                lineHeight: "1.5",
                color: "#495057",
                backgroundColor: "white",
                backgroundClip: "padding-box",
                border: "1px solid #ced4da",
                borderRadius: "0.25rem",
              }}
            ></div>
          </div>
          <div className="col-md-6 mb-3">
            <Field
              label={<FormattedMessage defaultMessage="Nombre Completo" />}
              id="full_name"
              type="text"
              name="full_name"
              onChange={onChangeField}
              value={values.full_name}
              required={true}
            />
          </div>
        </fieldset>
        <fieldset className="row">
          <div className="col-md-3 mb-3">
            <FieldSelect
              id="month"
              label={<FormattedMessage defaultMessage="Mes" />}
              optionInputs={MONTHS_OPTION_VALUES}
              selectElement={{
                required: true,
                name: "month",
                value: values.month,
                onChange: onChangeField,
              }}
              styleWraper={{
                flexGrow: 1,
              }}
            />
          </div>
          <div className="col-md-3 mb-3">
            <FieldSelect
              id="year"
              label={<FormattedMessage defaultMessage="Año" />}
              optionInputs={YEARS_OPTION_VALUES}
              selectElement={{
                required: true,
                name: "year",
                value: values.year,
                onChange: onChangeField,
              }}
              styleWraper={{
                flexGrow: 1,
              }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className={styles.LabelForm} htmlFor="spreedly-cvv">
              CVV
            </label>
            <div
              id="spreedly-cvv"
              style={{
                height: "38px",
                display: "block",
                padding: "0.375rem 0.75rem",
                fontSize: "1rem",
                lineHeight: "1.5",
                color: "#495057",
                backgroundColor: "white",
                backgroundClip: "padding-box",
                border: "1px solid #ced4da",
                borderRadius: "0.25rem",
              }}
            ></div>
          </div>
        </fieldset>
        <hr className="mb-4" />
        <h4>
          <FormattedMessage
            defaultMessage="Datos de facturación"
            description=""
          />
        </h4>

        <fieldset className="row">
          <div className="col-md-6 mb-3">
            <Field
              label={<FormattedMessage defaultMessage="Email" />}
              id="email"
              type="text"
              name="email"
              onChange={onChangeField}
              value={values.email}
              required={true}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Field
              label={
                <FormattedMessage defaultMessage="Documento de Identidad" />
              }
              id="identification_document"
              type="text"
              name="identification_document"
              onChange={onChangeField}
              value={values.identification_document}
              required={true}
            />
          </div>
        </fieldset>
        <fieldset className="row">
          <div className="col-md-6 mb-3">
            <Field
              label={<FormattedMessage defaultMessage="Dirección" />}
              id="shipping_address1"
              type="text"
              name="shipping_address1"
              onChange={onChangeField}
              value={values.shipping_address1}
              required={true}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Field
              label={
                <FormattedMessage defaultMessage="Dirección 2(opcional)" />
              }
              id="shipping_address2"
              type="text"
              name="shipping_address2"
              onChange={onChangeField}
              value={values.shipping_address2}
            />
          </div>
        </fieldset>
        <fieldset className="row">
          <div className="col-md-6 mb-3">
            <Field
              label={<FormattedMessage defaultMessage="País" />}
              id="shipping_country"
              type="text"
              name="shipping_country"
              onChange={onChangeField}
              value={values.shipping_country}
              required={true}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Field
              label={
                <FormattedMessage defaultMessage="Estado / Departamento" />
              }
              id="shipping_state"
              type="text"
              name="shipping_state"
              onChange={onChangeField}
              value={values.shipping_state}
              required={true}
            />
          </div>
        </fieldset>
        <fieldset className="row">
          <div className="col-md-6 mb-3">
            <Field
              label={<FormattedMessage defaultMessage="Ciudad" />}
              id="shipping_city"
              type="text"
              name="shipping_city"
              onChange={onChangeField}
              value={values.shipping_city}
              required={true}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Field
              label="Zip Code"
              id="shipping_zip"
              type="text"
              name="shipping_zip"
              onChange={onChangeField}
              value={values.shipping_zip}
              required={true}
            />
          </div>
        </fieldset>
        {paymentError && <WarningMessage message={paymentError} />}
        <SubmitButton loading={isProccesing} disabled={isProccesing}>
          <FormattedMessage defaultMessage="Pagar" />
        </SubmitButton>
      </form>
    </div>
  );
}

export { SpreedlyCheckoutForm };

interface FieldSelectProps {
  optionInputs: {
    value: string | number;
    placeholder: string | number;
  }[];
  label: string | React.ReactNode;
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
  <>
    <label htmlFor={id} className={styles.LabelForm}>
      {label}
    </label>
    <select
      {...selectElement}
      className={`custom-select ${styles.SelectElement}`}
      id={id}
    >
      {optionInputs.map((el) => (
        <option key={el.value} value={el.value}>
          {el.placeholder}
        </option>
      ))}
    </select>
  </>
);

interface FieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string | React.ReactNode;
  styleWraper?: React.CSSProperties;
}
const Field = ({ label, id, styleWraper, ...inputsProps }: FieldProps) => (
  <>
    <label htmlFor={id} className={styles.LabelForm}>
      {label}
    </label>
    <input {...inputsProps} className={styles.InputElement} id={id} />
  </>
);
