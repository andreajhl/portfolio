import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isMobilePhone } from "lib/utils/isMobilePhone";
import styles from "./styles.module.scss";
import classes from "classnames";
import WarningMessage from "desktop-app/components/common/warning-message";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import isEmail from "validator/es/lib/isEmail";
import { ContractNotificationsType } from "desktop-app/types/contractDataType";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const initialValues: ContractNotificationsType = {
  deliveryContact: "",
  deliveryContactCellphone: "",
  isPublic: true
};

const validations: ValidationsType<ContractNotificationsType> = {
  deliveryContact(value) {
    if (!isEmail(value)) return "Ingresa un correo electrónico válido.";
  },
  deliveryContactCellphone(value) {
    if (!deliveryContactCellphoneHasChanged(value)) return null;
    if (!isMobilePhone(value)) return "Ingresa un número de teléfono válido.";
  }
};

const deliveryContactCellphoneHasChanged = (deliveryContactCellphone: string) =>
  deliveryContactCellphone !== initialValues.deliveryContactCellphone ||
  deliveryContactCellphone.length > 4;

type ContractNotificationsFormProps = {
  onSubmit: (values: ContractNotificationsType) => void;
  onStepChange: (values: ContractNotificationsType) => void;
  initialValues?: ContractNotificationsType;
  isLoading: boolean;
};

function ContractNotificationsForm({
  onSubmit,
  onStepChange,
  initialValues: initialValuesFromProps,
  isLoading
}: ContractNotificationsFormProps) {
  const {
    values,
    errors,
    onChangeField,
    setFieldValue,
    validateFields,
    validateBeforeSubmit
  } = useForm<ContractNotificationsType>({
    initialValues: initialValuesFromProps || initialValues,
    validations,
    onSubmit(data) {
      const values = { ...data };
      if (
        !deliveryContactCellphoneHasChanged(values.deliveryContactCellphone)
      ) {
        delete values.deliveryContactCellphone;
      }
      onSubmit(values);
    }
  });
  const { user } = useAuth0();

  useEffect(() => {
    if (initialValues.deliveryContact || !user) return;
    setFieldValue("deliveryContact", user?.email);
  }, []);

  return (
    <section className={styles.VideoNotificationForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={(goToClickedStep) => {
          if (!validateFields()) return;
          onStepChange(values);
          goToClickedStep();
        }}
      />
      <h2 className={styles.VideoNotificationFormTitle}>
        ¡Este video quedará genial!
        <br /> Te notificaremos cuando esté listo.
      </h2>
      <div>
        <label className={styles.FormLabel} htmlFor="deliveryContact">
          Correo electrónico de notificación
        </label>
        <input
          type="email"
          formNoValidate
          name="deliveryContact"
          id="deliveryContact"
          placeholder="usuario@dominio.com"
          value={values.deliveryContact}
          onChange={onChangeField}
          className={classes(
            styles.FormField,
            errors?.deliveryContact && styles.FormFieldHasError
          )}
        />
        <WarningMessage
          message={errors?.deliveryContact || null}
          className={classes(
            styles.FormError,
            errors?.deliveryContact && styles.FormErrorIsVisible
          )}
        />
      </div>
      <div className={styles.VideoNotificationFormPhoneInputContainer}>
        <label className={styles.FormLabel}>
          Notificarme también por Whatsapp (opcional)
        </label>
        <PhoneInput
          value={values.deliveryContactCellphone}
          containerClass={classes(
            styles.ContainerPhoneInput,
            errors?.deliveryContactCellphone && styles.FormFieldHasError
          )}
          inputClass={classes(
            styles.InputClassPhoneInput,
            errors?.deliveryContactCellphone && styles.FormFieldHasError
          )}
          buttonClass={classes(
            styles.ButtonClassPhoneInput,
            errors?.deliveryContactCellphone && styles.FormFieldHasError
          )}
          placeholder="+57 310 1234567"
          dropdownClass={styles.DropdownClassPhoneInput}
          country="co"
          enableSearch
          searchPlaceholder="Buscar país"
          searchClass={styles.SearchClassPhoneInput}
          onChange={(value) => {
            setFieldValue("deliveryContactCellphone", value);
          }}
        />
        <WarningMessage
          message={errors?.deliveryContactCellphone || null}
          className={classes(
            styles.FormError,
            errors?.deliveryContactCellphone && styles.FormErrorIsVisible
          )}
        />
      </div>
      <div
        className={styles.VideoNotificationFormRadio}
        onChange={({ target: { value } }: { target: any }) => {
          setFieldValue("isPublic", Boolean(value));
        }}
      >
        <span className={styles.VideoNotificationFormRadioText}>
          Permitir que mi video sea público
        </span>
        <label
          htmlFor="isPublic-true"
          className={styles.VideoNotificationFormRadioLabel}
        >
          <i
            className={classes(
              "fa fa-check",
              values.isPublic && styles.VideoNotificationFormRadioLabelChecked
            )}
          />
          Sí
        </label>
        <input
          type="radio"
          name="isPublic"
          id="isPublic-true"
          hidden
          value={1}
        />
        <label
          htmlFor="isPublic-false"
          className={styles.VideoNotificationFormRadioLabel}
        >
          <i
            className={classes(
              "fa fa-times",
              !values.isPublic && styles.VideoNotificationFormRadioLabelChecked
            )}
          />
          No
        </label>
        <input
          type="radio"
          name="isPublic"
          id="isPublic-false"
          hidden
          value=""
        />
      </div>
      <SubmitButton onClick={validateBeforeSubmit}>Continuar</SubmitButton>
    </section>
  );
}

export default ContractNotificationsForm;
