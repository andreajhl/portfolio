import timezones from "constants/popularLatamCitiesTimezones";
import Maybe from "desktop-app/components/common/helpers/maybe";
import ClientContractType from "desktop-app/types/clientContract";
import useForm from "lib/hooks/useForm";
import { useEffect, useState } from "react";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { CellphoneNumberInput } from "../../common/form/cellphone-number-input";
import { InputField } from "../../common/form/input-field";
import classes from "classnames";
import styles from "./styles.module.scss";
import { saveSendConfiguration } from "react-app/src/state/ducks/contracts/actions";
import useStatus from "lib/hooks/useStatus";
import {
  SubmitText,
  StatusType,
} from "desktop-app/components/common/helpers/submit-button-text";
import { HiringShareSuccessModal } from "desktop-app/components/common/modals/hiring-share-success-modal";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";
import isEmail from "validator/lib/isEmail";
import isDate from "validator/lib/isDate";
import {
  validateDeliveryContactCellphone,
  validateDeliveryFrom,
  validateDeliveryTo,
} from "lib/validations/contractData";

const EMAILS_SEPARATOR = ",";

function isValidEmailList(emails: string) {
  const emailsArray = emails.split(EMAILS_SEPARATOR);
  return !emailsArray.some((email) => !isEmail(email.trim()));
}

function getConstrainedTime(value: any) {
  const onlyTimeValue = value.replace(/[^0-9:]/g, "");
  const hours = onlyTimeValue.split(":")[0] || "00";
  const constrainedHour = parseFloat(hours) > 23 ? 23 : hours;
  return `${constrainedHour}:00`;
}

function FormField({ label, name = "", type = "text", error, ...props }) {
  return (
    <div>
      <label htmlFor={name} className={styles.Label}>
        {label}
      </label>
      <InputField
        type={type}
        id={name}
        name={name}
        className={styles.Input}
        {...props}
      />
      <CollapsibleErrorMessage
        unmountOnExit
        errorMessage={error}
        className={styles.ErrorMessage}
      />
    </div>
  );
}

function getInitialState(contractData: ClientContractType) {
  const valuesFromContract = pickPropertiesFromAObject(contractData, [
    "deliveryContact",
    "deliveryContactCellphone",
    "deliveryFrom",
    "deliveryTo",
  ]) as InitialValuesType;

  return {
    ...valuesFromContract,
    deliveryContactCellphone:
      valuesFromContract.deliveryContactCellphone || "57",
    deliveryDate: "",
    deliveryTime: "",
    deliveryTimezone: timezones?.[0]?.tzDatabaseName,
    sendMessage: `¡Hola ${valuesFromContract.deliveryTo}!\nMira el regalo que te he hecho a través de Famosos.com.`,
  } as InitialValuesType;
}

const validations = {
  deliveryTo: validateDeliveryTo,
  deliveryFrom(value: string) {
    return validateDeliveryFrom(value, { values: { contractType: 2 } });
  },
  deliveryContact(value: string) {
    if (!value.includes(EMAILS_SEPARATOR) && !isEmail(value)) {
      return "Ingresa un correo electrónico válido.";
    }
    if (!isValidEmailList(value)) {
      return "Ingresa una lista de correos electrónicos válidos.";
    }
  },
  deliveryContactCellphone: validateDeliveryContactCellphone,
  sendMessage(value: string) {
    if (value === "") return "Ingresa tu mensaje";
  },
  deliveryDate(value: string) {
    if (value === "") return "Ingresa una fecha.";
    if (!isDate(value)) {
      return "Ingresa una fecha valida. Ejemplo: 2020-06-25";
    }
  },
};

const initialErroValue = null;
const ONE_HOUR_IN_SECONDS = 3600;

type InitialValuesType = {
  deliveryContact: string;
  deliveryContactCellphone: string;
  deliveryFrom: string;
  deliveryTo: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryTimezone: string;
  sendMessage: string;
};

type ShareDetailsFormProps = {
  contractData: ClientContractType;
  sendType?: "whatsapp" | "mail";
  onChange?: (values: InitialValuesType) => void;
  onPreviewButtonClick?: () => void;
  onSubmit?: (values: InitialValuesType) => void;
};

function ShareDetailsForm({
  sendType = "whatsapp",
  contractData,
  onChange = function () {},
  onPreviewButtonClick = function () {},
  onSubmit = function () {},
}: ShareDetailsFormProps) {
  const [status, setStatus] = useStatus();
  const [error, setError] = useState(initialErroValue);
  const { values, errors, onChangeField, setFieldValue, submitForm } = useForm({
    initialValues: getInitialState(contractData),
    validations,
    async onSubmit(sendConfiguration) {
      try {
        setError(initialErroValue);
        setStatus("loading");
        await saveSendConfiguration(getSendConfiguration(sendConfiguration));
        setStatus("completed");
      } catch (error) {
        setStatus("idle");
        setError(error.message);
      }
    },
  });
  const isWhatsappType = sendType === "whatsapp";

  useEffect(() => {
    onChange(values);
  }, [values]);

  const contractReference = contractData.reference;

  function getSendConfiguration(sendConfiguration: InitialValuesType) {
    return {
      ...sendConfiguration,
      deliveryDate: sendConfiguration.deliveryDate?.replace?.("/", "-"),
      sendType,
      contractReference,
    };
  }

  function setDeliveryContactCellphone(value: string) {
    setFieldValue("deliveryContactCellphone", value);
  }

  const shareIsCompleted = status === "completed";

  function setDeliveryTime({ target: { value } }) {
    setFieldValue("deliveryTime", getConstrainedTime(value));
  }

  return (
    <section className={styles.ShareDetailsForm}>
      <h2 className={styles.Title}>
        Entrega tu videomensaje por{" "}
        <Maybe it={isWhatsappType} orElse="correo">
          Whatsapp
        </Maybe>
      </h2>
      <div className={styles.RecipientField}>
        <Maybe
          it={isWhatsappType}
          orElse={
            <FormField
              name="deliveryContact"
              label={
                <>
                  Correo electrónico del destinatario{" "}
                  <span className={styles.MultipleRecipientsInfo}>
                    (Puedes agregar varios correos separándolos con una coma)
                  </span>
                </>
              }
              error={errors.deliveryContact}
              value={values.deliveryContact}
              onChange={onChangeField}
            />
          }
        >
          <label htmlFor="cellPhoneNumber" className={styles.Label}>
            Whatsapp del destinatario
          </label>
          <CellphoneNumberInput
            onChange={setDeliveryContactCellphone}
            placeholder="+52 55 4375 09 49"
            value={values.deliveryContactCellphone}
            containerClass={styles.Input}
            inputClass={styles.CellphoneInput}
          />
          <CollapsibleErrorMessage
            unmountOnExit
            className={styles.ErrorMessage}
            errorMessage={errors.deliveryContactCellphone}
          />
        </Maybe>
      </div>
      <div className={classes(styles.Split, styles.DeliveryInfo)}>
        <FormField
          name="deliveryTo"
          label="Para"
          value={values.deliveryTo}
          onChange={onChangeField}
          error={errors.deliveryTo}
          maxLength={40}
        />
        <FormField
          name="deliveryFrom"
          label="De"
          value={values.deliveryFrom}
          onChange={onChangeField}
          error={errors.deliveryFrom}
          maxLength={40}
        />
      </div>
      <Maybe it={!isWhatsappType}>
        <label htmlFor="sendMessage" className={styles.Label}>
          Mensaje
        </label>
        <textarea
          className={classes(styles.Input, styles.MessageTextarea)}
          name="sendMessage"
          id="sendMessage"
          onChange={onChangeField}
          value={values.sendMessage}
        />
        <CollapsibleErrorMessage
          unmountOnExit
          className={styles.ErrorMessage}
          errorMessage={errors.sendMessage}
        />
      </Maybe>
      <div className={classes(styles.Split, styles.ScheduleInfo)}>
        <FormField
          label="Fecha de envío"
          name="deliveryDate"
          type="date"
          placeholder="aaaa-mm-dd"
          value={values.deliveryDate}
          onChange={onChangeField}
          error={errors.deliveryDate}
        />
        <div>
          <label htmlFor="deliveryTime" className={styles.Label}>
            Hora de envío
          </label>
          <div className={styles.TimeInputContainer}>
            <InputField
              placeholder="14:00"
              type="time"
              id="deliveryTime"
              name="deliveryTime"
              value={values.deliveryTime}
              step={ONE_HOUR_IN_SECONDS}
              onChange={setDeliveryTime}
              className={styles.TimeInput}
            />
            <select
              value={values.deliveryTimezone}
              name="deliveryTimezone"
              id="deliveryTimezone"
              className={styles.TimezoneSelect}
              onChange={onChangeField}
            >
              {timezones.map(({ city, tzDatabaseName }) => (
                <option value={tzDatabaseName} key={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.ButtonsWrapper}>
        <button
          type="button"
          className={"btn btn-secondary " + styles.PreviewButton}
          onClick={onPreviewButtonClick}
        >
          Previsualizar
        </button>
        <button
          type="button"
          className={"btn btn-primary " + styles.SubmitButton}
          onClick={submitForm}
        >
          <SubmitText baseText="Enviar" status={status as StatusType} />
        </button>
      </div>
      <CollapsibleErrorMessage
        errorMessage={error}
        className={styles.ShareErrorMessage}
      />
      <HiringShareSuccessModal
        isOpen={shareIsCompleted}
        contractReference={contractReference}
      />
    </section>
  );
}

export { ShareDetailsForm };
