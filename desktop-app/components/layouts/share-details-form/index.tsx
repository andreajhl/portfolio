import timezones from "constants/popularLatamCitiesTimezones";
import Maybe from "desktop-app/components/common/helpers/maybe";
import ClientContractType from "desktop-app/types/clientContract";
import useForm from "lib/hooks/useForm";
import { useEffect } from "react";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { CellphoneNumberInput } from "../../common/form/cellphone-number-input";
import { InputField } from "../../common/form/input-field";
import classes from "classnames";
import styles from "./styles.module.scss";

function FormField({ label, name = "", type = "text", ...props }) {
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
    </div>
  );
}

function getInitialState(contractData) {
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
    deliveryTimezone: null,
    message: `¡Hola ${valuesFromContract.deliveryTo}!\nMira el regalo que te he hecho a través de Famosos.com.`,
  } as InitialValuesType;
}

type InitialValuesType = {
  deliveryContact: string;
  deliveryContactCellphone: string;
  deliveryFrom: string;
  deliveryTo: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryTimezone: number;
  message: string;
};

type ShareDetailsFormProps = {
  contractData: ClientContractType;
  type?: "whatsapp" | "mail";
  onChange?: (values: InitialValuesType) => void;
};

function ShareDetailsForm({
  type = "whatsapp",
  contractData,
  onChange = function () {},
}: ShareDetailsFormProps) {
  const { values, onChangeField, setFieldValue, submitForm } = useForm({
    initialValues: getInitialState(contractData),
    onSubmit: console.log,
  });
  const isWhatsappType = type === "whatsapp";

  useEffect(() => {
    onChange(values);
  }, [values]);

  return (
    <section className={styles.ShareDetailsForm}>
      <h2 className={styles.Title}>
        Entrega tu videomensaje por{" "}
        <Maybe it={isWhatsappType} orElse="correo">
          Whatsapp
        </Maybe>
      </h2>
      <div className={styles.CellphoneNumberField}>
        <Maybe
          it={isWhatsappType}
          orElse={
            <FormField
              name="deliveryContact"
              label="Correo electrónico del destinatario"
              value={values.deliveryContact}
              onChange={onChangeField}
            />
          }
        >
          <label htmlFor="cellPhoneNumber" className={styles.Label}>
            Whatsapp del destinatario
          </label>
          <CellphoneNumberInput
            onChange={(value) =>
              setFieldValue("deliveryContactCellphone", value)
            }
            placeholder="+52 55 4375 09 49"
            value={values.deliveryContactCellphone}
            containerClass={styles.Input}
            inputClass={styles.CellphoneInput}
          />
        </Maybe>
      </div>
      <div className={styles.DeliveryInfo}>
        <FormField
          name="deliveryTo"
          label="Para"
          value={values.deliveryTo}
          onChange={onChangeField}
        />
        <FormField
          name="deliveryFrom"
          label="De"
          value={values.deliveryFrom}
          onChange={onChangeField}
        />
      </div>
      <Maybe it={!isWhatsappType}>
        <label htmlFor="message" className={styles.Label}>
          Mensaje
        </label>
        <textarea
          className={classes(styles.Input, styles.MessageTextarea)}
          name="message"
          id="message"
          onChange={onChangeField}
          value={values.message}
        />
      </Maybe>
      <div className={styles.ScheduleInfo}>
        <FormField
          label="Fecha de envío"
          name="deliveryDate"
          type="date"
          value={values.deliveryDate}
          onChange={onChangeField}
        />
        <div>
          <label htmlFor="deliveryTime" className={styles.Label}>
            Hora de envío
          </label>
          <div className={styles.TimeInputContainer}>
            <InputField
              type="time"
              id="deliveryTime"
              name="deliveryTime"
              value={values.deliveryTime}
              onChange={onChangeField}
              className={styles.TimeInput}
            />
            <select
              name="deliveryTimezone"
              id="deliveryTimezone"
              className={styles.TimezoneSelect}
              onChange={onChangeField}
            >
              {timezones.map(({ city, timezone }) => (
                <option value={timezone} key={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={"btn btn-primary " + styles.SubmitButton}
        onClick={submitForm}
      >
        Enviar
      </button>
    </section>
  );
}

export { ShareDetailsForm };
