import styles from "./styles.module.scss";
import classes from "classnames";
import WarningMessage from "desktop-app/components/common/warning-message";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import { ContractNotificationsType } from "desktop-app/types/contractDataType";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { useAuth } from "lib/famosos-auth";
import { useEffect } from "react";
import objectHasProperties from "lib/utils/objectHasProperties";
import { BooleanRadiosInputs } from "desktop-app/components/common/form/boolean-checkboxes";
import { CellphoneNumberInput } from "desktop-app/components/common/form/cellphone-number-input";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import {
  defineMessages,
  FormattedMessage,
  IntlFormatters,
  useIntl,
} from "react-intl";
import {
  getDeliveryContactCellphoneValidator,
  getDeliveryContactValidator,
} from "lib/validations/contractData";
import { analytics } from "react-app/src/state/utils/gtm";

const messages = defineMessages({
  emailPlaceholder: {
    defaultMessage: "usuario@dominio.com",
  },
  cellphoneSearchPlaceholder: {
    defaultMessage: "Buscar país",
  },
});

const initialValues: ContractNotificationsType = {
  deliveryContact: "",
  deliveryContactCellphone: "",
  isPublic: true,
};

const deliveryContactCellphoneHasChanged = (deliveryContactCellphone: string) =>
  deliveryContactCellphone !== initialValues.deliveryContactCellphone ||
  deliveryContactCellphone.length > 4;

function getValidations(
  formatMessage: IntlFormatters["formatMessage"]
): ValidationsType<ContractNotificationsType> {
  return {
    deliveryContact: getDeliveryContactValidator(formatMessage),
    deliveryContactCellphone(value) {
      if (!deliveryContactCellphoneHasChanged(value)) return null;
      return getDeliveryContactCellphoneValidator(formatMessage)(value);
    },
  };
}

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
  const { formatMessage } = useIntl();
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
    initialValues: Object.assign({}, initialValues, initialValuesFromProps),
    validations: getValidations(formatMessage),
    onSubmit,
  });
  const { user } = useAuth();

  useEffect(() => {
    if (values.deliveryContact || !user) return;
    setFieldValue("deliveryContact", user?.email);
  }, [user]);

  const emailPlaceholder = formatMessage(messages.emailPlaceholder);

  const cellphoneSearchPlaceholder = formatMessage(
    messages.cellphoneSearchPlaceholder
  );

  function validateBeforeStepChange(
    goToClickedStep: () => void,
    isPreviousStep: boolean,
    clickedStepItem: { id: string }
  ) {
    if (!isPreviousStep && !validateFields()) return;
    const valuesToSave = isPreviousStep ? getTouchedFieldValues() : values;
    if (!valuesToSave) return;

    onStepChange(
      (objectHasProperties(valuesToSave)
        ? valuesToSave
        : null) as ContractNotificationsType
    );
    if (isPreviousStep) {
      analytics.track("CELEBRITY_STEP_VIEW", {
        stepName: clickedStepItem?.id,
      });
    }
    goToClickedStep();
  }

  return (
    <section className={styles.VideoNotificationForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={validateBeforeStepChange}
      />
      <h2 className={styles.VideoNotificationFormTitle}>
        <FormattedMessage
          defaultMessage="¡Este video quedará genial! {br} Te notificaremos cuando esté listo."
          values={{ br: <br /> }}
        />
      </h2>
      <form onSubmit={validateBeforeSubmit} id="contract-notifications-form">
        <div>
          <label className={styles.FormLabel} htmlFor="deliveryContact">
            <FormattedMessage defaultMessage="Correo electrónico de notificación" />
          </label>
          <input
            type="email"
            formNoValidate
            name="deliveryContact"
            id="deliveryContact"
            placeholder={emailPlaceholder}
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
            <FormattedMessage defaultMessage="Notificarme también por Whatsapp (opcional)" />
          </label>
          <CellphoneNumberInput
            value={values.deliveryContactCellphone}
            containerClass={styles.ContainerPhoneInput}
            hasError={Boolean(errors?.deliveryContactCellphone)}
            placeholder="+57 310 1234567"
            country="co"
            enableSearch
            searchPlaceholder={cellphoneSearchPlaceholder}
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
            <FormattedMessage defaultMessage="Permitir que mi video sea público" />
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
        <SubmitButton disabled={isLoading}>
          <SubmitText
            baseText={<FormattedMessage defaultMessage="Continuar" />}
            status={isLoading ? "loading" : "idle"}
          />
        </SubmitButton>
      </form>
    </section>
  );
}

export default ContractNotificationsForm;
