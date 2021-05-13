import Checkbox from "desktop-app/components/common/form/checkbox";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { CellphoneNumberInput } from "../../common/form/cellphone-number-input";
import { InputField } from "../../common/form/input-field";
import styles from "./styles.module.scss";

type ShareDetailsFormProps = {
  type?: "whatsapp" | "mail";
};

function FormField({ label, name = "", type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className={styles.Label}>
        {label}
      </label>
      <InputField type={type} id={name} name={name} className={styles.Input} />
    </div>
  );
}

function ShareDetailsForm({ type = "whatsapp" }: ShareDetailsFormProps) {
  const isWhatsappType = type === "whatsapp";

  return (
    <section className={styles.ShareDetailsForm}>
      <h2 className={styles.Title}>
        Entrega tu videomensaje por{" "}
        <Maybe it={isWhatsappType} orElse="correo">
          Whatsapp
        </Maybe>
      </h2>
      <div className={styles.CellphoneNumberField}>
        <label htmlFor="cellPhoneNumber" className={styles.Label}>
          <Maybe it={isWhatsappType} orElse="Correo">
            Whatsapp
          </Maybe>{" "}
          del destinatario
        </label>
        <Maybe
          it={isWhatsappType}
          orElse={<InputField name="mail" className={styles.Input} />}
        >
          <CellphoneNumberInput
            value="+52 55 4375 09 49"
            containerClass={styles.Input}
            inputClass={styles.CellphoneInput}
          />
        </Maybe>
      </div>
      <div className={styles.DeliveryInfo}>
        <FormField label="Para" />
        <FormField label="De" />
      </div>
      <div className={styles.DeliveryType}>
        <Checkbox
          alignLabel="left"
          label="Enviar inmediatamente"
          onChange={console.log}
          value="male"
          checked={true}
          name="male"
          checkboxLayout="circle"
          className={styles.Checkbox}
        />
        <Checkbox
          alignLabel="left"
          label="Programar envío"
          onChange={console.log}
          value="male"
          checked={false}
          name="male"
          checkboxLayout="circle"
          className={styles.Checkbox}
        />
      </div>
      <div className={styles.ScheduleInfo}>
        <FormField label="Fecha de envío" name="date" type="date" />
        <div>
          <label htmlFor="deliveryTime" className={styles.Label}>
            Hora de envío
          </label>
          <div className={styles.TimeInputContainer}>
            <InputField
              type="time"
              id="deliveryTime"
              name="deliveryTime"
              className={styles.TimeInput}
            />
            <select
              name="deliveryTimezone"
              id="deliveryTimezone"
              className={styles.TimezoneSelect}
            >
              <option value="CDMX">Hora CDMX</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={"btn btn-primary " + styles.SubmitButton}
      >
        Enviar
      </button>
    </section>
  );
}

export { ShareDetailsForm };
