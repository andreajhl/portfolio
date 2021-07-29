import { getOccasionMessage, OccasionType } from "constants/occasions";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import { useEffect, useState } from "react";
import SubmitButton from "../../common/button/submit-button";
import styles from "./styles.module.scss";
import WarningMessage from "desktop-app/components/common/warning-message";
import classes from "classnames";
import { ContractDetailsType } from "desktop-app/types/contractDataType";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import {
  getPlaceholders,
  getTextContent,
  TextInputWithPlaceholders,
} from "desktop-app/components/common/form/text-input-with-placeholders";
import { OccasionsGrid } from "desktop-app/components/celebrity-profile/occasions-grid";
import objectHasProperties from "lib/utils/objectHasProperties";
import {
  defineMessages,
  FormattedMessage,
  IntlFormatters,
  useIntl,
} from "react-intl";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import {
  getInstructionsValidator,
  getOccasionValidator,
} from "lib/validations/contractData";
import { getWindowPathname } from "react-app/src/utils/getWindow";
import { analytics } from "react-app/src/state/utils/gtm";

const messages = defineMessages({
  instructionsPlaceholder: {
    defaultMessage: "¡Hola {celebrityFullName}! Me gustaría que...",
  },
  notEditedInstructionsError: {
    defaultMessage: "Olvidaste editar el texto",
  },
  unfilledPlaceholder: {
    defaultMessage: "Debes editar el valor {placeholderName}",
  },
});

const br = <br />;
const span = (chunk: string) => <span>{chunk}</span>;

const initialValues: ContractDetailsType = {
  occasion: "OTHER",
  instructions: "",
};

function getValidations(
  formatMessage: IntlFormatters["formatMessage"]
): ValidationsType<ContractDetailsType> {
  return {
    occasion: getOccasionValidator(formatMessage),
    instructions(value) {
      if (Array.isArray(value)) {
        return formatMessage(messages.notEditedInstructionsError);
      }
      const unfilledPlaceholders = getPlaceholders(value);
      if (unfilledPlaceholders) {
        const placeholderName = unfilledPlaceholders?.[0];
        return formatMessage(messages.unfilledPlaceholder, { placeholderName });
      }
      return getInstructionsValidator(formatMessage)(value);
    },
  };
}

type ContractDetailsFormProps = {
  contractType: number;
  deliveryTo: string;
  celebrityFullName: string;
  initialValues?: ContractDetailsType;
  onSubmit: (values: ContractDetailsType) => void;
  onStepChange: (values: ContractDetailsType) => void;
  isLoading: boolean;
};

function ContractDetailsForm({
  contractType,
  deliveryTo,
  celebrityFullName,
  initialValues: initialValuesFromProps,
  onStepChange,
  onSubmit,
  isLoading,
}: ContractDetailsFormProps) {
  const { locale, formatMessage } = useIntl();
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    getTouchedFieldValues,
    setFieldError,
    validateBeforeSubmit,
  } = useForm({
    initialValues: Object.assign({}, initialValues, initialValuesFromProps),
    validations: getValidations(formatMessage),
    onSubmit,
  });
  const preFilledInstructionsText = getOccasionInstructionsText(
    values.occasion
  );
  const [textareaText, setTextareaText] = useState(
    initialValuesFromProps?.instructions || preFilledInstructionsText
  );
  const [hasEditedInstructions, setHasEditedInstructions] = useState(
    preFilledInstructionsText !== textareaText
  );

  useEffect(() => {
    if (initialValuesFromProps?.instructions) {
      setFieldTouched("instructions", true);
    }
    if (initialValuesFromProps?.occasion) {
      setFieldTouched("occasion", true);
    }
  }, []);

  function getOccasionInstructionsText(occasion: OccasionType): string {
    return replacePlaceHolder(
      getOccasionMessage(locale, occasion, contractType)
    );
  }

  function replacePlaceHolder(text: string) {
    if (!text) return text;
    return text
      .replace(/PLACEHOLDER_FAMOSO_NAME/g, celebrityFullName || "Famoso")
      .replace(/PLACEHOLDER_PARA/g, deliveryTo || "[PARA]");
  }

  const analyticsData = {
    widget: "ContractDetailsForm",
    path: getWindowPathname(),
    formValues: values,
    contractType,
    deliveryTo,
    celebrityFullName,
  };

  function trackOccasionChange(newOccasion: OccasionType) {
    analytics.track("CHANGE_CONTRACT_OCCASION", {
      ...analyticsData,
      previousOccasion: values.occasion,
      newOccasion,
    });
  }

  function changeOccasion(occasionKey: OccasionType) {
    if (!touched?.occasion) setFieldTouched("occasion", true);
    trackOccasionChange(occasionKey);
    setFieldValue("occasion", occasionKey);
    if (hasEditedInstructions) return;
    const text = getOccasionInstructionsText(occasionKey);
    setTextareaText(text);
    setFieldValue("instructions", text, false);
  }

  function validateFormBeforeChangeStep(
    goToClickedStep: () => void,
    isPreviousStep: boolean
  ): void {
    if (!isPreviousStep) return validateBeforeSubmit();
    const valuesToSave = getTouchedFieldValues();
    if (!valuesToSave) return;

    onStepChange(
      (objectHasProperties(valuesToSave)
        ? valuesToSave
        : null) as ContractDetailsType
    );
    goToClickedStep();
  }

  function changeInstructionsTouched({ key }) {
    if (key.startsWith("Arrow")) return;
    setFieldError("instructions", null);
    setFieldTouched("instructions", true);
    setHasEditedInstructions(true);
  }

  function changeInstructionsValue({ target }) {
    // TODO: Luego de darle submit, se coloca touched,
    // por ende en el segundo intento no valida
    // que se haya editado.
    if (!touched?.instructions) return;
    setFieldValue("instructions", getTextContent(target));
  }

  const instructionsPlaceholder = formatMessage(
    messages.instructionsPlaceholder,
    { celebrityFullName }
  );

  return (
    <section className={styles.VideoDetailsForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={validateFormBeforeChangeStep}
      />
      <form onSubmit={validateBeforeSubmit}>
        <label className={styles.VideoDetailsOccasionLabel}>
          <FormattedMessage defaultMessage="Selecciona una ocasión" />
        </label>
        <OccasionsGrid
          contractType={contractType}
          selectedOccasion={values.occasion}
          className={styles.VideoDetailsFormOccasionsGrid}
          onClickOccasion={changeOccasion}
        />
        <div className={styles.VideoDetailsFormInstructions}>
          <label
            className={styles.VideoDetailsFormInstructionsLabel}
            id="instructionsDescription"
          >
            <FormattedMessage
              defaultMessage="Dale instrucciones a {celebrityFullName} para que tu video quede como esperas.
            {br} <span>(Edita este texto base o escribe uno)</span>"
              values={{ celebrityFullName, br, span }}
            />
          </label>
          <TextInputWithPlaceholders
            aria-describedby="instructionsDescription"
            placeholder={instructionsPlaceholder}
            className={styles.VideoDetailsFormInstructionsTextarea}
            maxLength={300}
            onKeyUp={changeInstructionsTouched}
            onBlur={changeInstructionsValue}
            value={textareaText}
          />
          <WarningMessage
            className={classes(
              styles.VideoDetailsFormInstructionsMessage,
              Boolean(errors?.instructions) &&
                styles.VideoDetailsFormInstructionsMessageVisible
            )}
            message={errors?.instructions || null}
          />
        </div>
        <SubmitButton disabled={isLoading}>
          <SubmitText
            baseText={<FormattedMessage defaultMessage="Siguiente" />}
            status={isLoading ? "loading" : "idle"}
          />
        </SubmitButton>
      </form>
    </section>
  );
}

export { ContractDetailsForm };
