import { isMobilePhone } from "lib/utils/isMobilePhone";
import styles from "./styles.module.scss";
import classes from "classnames";
import WarningMessage from "desktop-app/components/common/warning-message";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import isEmail from "validator/lib/isEmail";
import { ContractNotificationsType } from "desktop-app/types/contractDataType";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import objectHasProperties from "lib/utils/objectHasProperties";
import { BooleanRadiosInputs } from "desktop-app/components/common/form/boolean-checkboxes";
import { CellphoneNumberInput } from "desktop-app/components/common/form/cellphone-number-input";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";

const initialValues: ContractNotificationsType = {
  deliveryContact: "",
  deliveryContactCellphone: "",
  isPublic: true,
};

const validations: ValidationsType<ContractNotificationsType> = {
  deliveryContact(value) {
    if (!isEmail(value)) return "Ingresa un correo electrónico válido.";
  },
  deliveryContactCellphone(value) {
    if (!deliveryContactCellphoneHasChanged(value)) return null;
    if (!isMobilePhone(value)) return "Ingresa un número de teléfono válido.";
  },
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
  isLoading,
}: ContractNotificationsFormProps) {
  const {
    values,
    errors,
    onChangeField,
    setFieldValue,
    validateFields,
    getTouchedFieldValues,
    setFieldTouched,
    onFocusField,
    validateBeforeSubmit,
  } = useForm<ContractNotificationsType>({
    initialValues: Object.assign(initialValues, initialValuesFromProps),
    validations,
    onSubmit,
  });
  const { user } = useAuth0();

  useEffect(() => {
    if (values.deliveryContact || !user) return;
    setFieldValue("deliveryContact", user?.email);
  }, []);

  return (
    <section className={styles.VideoNotificationForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={(goToClickedStep, isPreviousStep) => {
          if (!isPreviousStep && !validateFields()) return;
          const valuesToSave = isPreviousStep
            ? getTouchedFieldValues()
            : values;
          if (!valuesToSave) return;

          onStepChange(
            (objectHasProperties(valuesToSave)
              ? valuesToSave
              : null) as ContractNotificationsType
          );
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
          onFocus={onFocusField}
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
        <CellphoneNumberInput
          value={values.deliveryContactCellphone}
          containerClass={styles.ContainerPhoneInput}
          hasError={Boolean(errors?.deliveryContactCellphone)}
          placeholder="+57 310 1234567"
          country="co"
          enableSearch
          searchPlaceholder="Buscar país"
          onChange={(value) => {
            setFieldTouched("deliveryContactCellphone", true);
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
      <div className={styles.VideoNotificationFormRadioWrapper}>
        <span className={styles.VideoNotificationFormRadioText}>
          Permitir que mi video sea público
        </span>
        <BooleanRadiosInputs
          value={values.isPublic}
          className={styles.VideoNotificationFormRadio}
          onChange={(value) => {
            setFieldValue("isPublic", value);
            setFieldTouched("isPublic", true);
          }}
        />
      </div>
      <SubmitButton onClick={validateBeforeSubmit}>
        <SubmitText
          baseText="Continuar"
          status={isLoading ? "loading" : "idle"}
        />
      </SubmitButton>
    </section>
  );
}

export default ContractNotificationsForm;
