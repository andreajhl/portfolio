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
  getTextContent,
  TextInputWithPlaceholders,
} from "desktop-app/components/common/form/text-input-with-placeholders";
import { OccasionsGrid } from "desktop-app/components/celebrity-profile/occasions-grid";
import objectHasProperties from "lib/utils/objectHasProperties";
import { useIntl } from "react-intl";

const initialValues: ContractDetailsType = {
  occasion: "OTHER",
  instructions: "",
};

const validations: ValidationsType<ContractDetailsType> = {
  occasion(value) {
    if (value.length === 0) return "Debes seleccionar una ocasión";
  },
  instructions(value) {
    if (Array.isArray(value)) return "Olvidaste editar el texto.";
    if (value.length === 0) return "Debes escribir tus instrucciones.";
    if (value.length > 300) {
      return "Debes introducir un máximo de 300 caracteres.";
    }
  },
};

type ContractDetailsFormProps = {
  contractType: number;
  deliveryTo: string;
  celebrityFullName: string;
  initialValues?: ContractDetailsType;
  onSubmit: (values: ContractDetailsType) => void;
  onStepChange: (values: ContractDetailsType) => void;
};

function ContractDetailsForm({
  contractType,
  deliveryTo,
  celebrityFullName,
  initialValues: initialValuesFromProps,
  onStepChange,
  onSubmit,
}: ContractDetailsFormProps) {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    getTouchedFieldValues,
    validateFields,
    setFieldError,
    submitForm,
  } = useForm({
    initialValues: Object.assign(initialValues, initialValuesFromProps),
    validations,
    onSubmit,
  });
  const { locale } = useIntl();
  const [textareaText, setTextareaText] = useState(
    initialValuesFromProps?.instructions ||
      replacePlaceHolder(
        getOccasionMessage(locale, values.occasion, contractType)
      )
  );

  useEffect(() => {
    if (!initialValuesFromProps?.instructions) return;
    setFieldTouched("instructions", true);
  }, []);

  function replacePlaceHolder(text: string) {
    if (!text) return text;
    return text
      .replace(/PLACEHOLDER_FAMOSO_NAME/g, celebrityFullName || "Famoso")
      .replace(/PLACEHOLDER_PARA/g, deliveryTo || "[PARA]");
  }

  function changeOccasion(occasionKey: OccasionType) {
    if (!touched?.occasion) setFieldTouched("occasion", true);
    setFieldValue("occasion", occasionKey);
    if (touched.instructions) return;
    const text = replacePlaceHolder(
      getOccasionMessage(locale, occasionKey, contractType)
    );
    setTextareaText(text);
    setFieldValue("instructions", text, false);
  }

  function validateFormBeforeChangeStep(
    goToClickedStep: () => void,
    isPreviousStep: boolean
  ): void {
    if (!isPreviousStep && !validateFields()) return;
    const valuesToSave = isPreviousStep ? getTouchedFieldValues() : values;
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
  }

  function changeInstructionsValue({ target }) {
    // TODO: Luego de darle submit, se coloca touched,
    // por ende en el segundo intento no valida
    // que se haya removido el placeholder.
    if (!touched?.instructions) return;
    setFieldValue("instructions", getTextContent(target));
  }

  return (
    <section className={styles.VideoDetailsForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={validateFormBeforeChangeStep}
      />
      <h2 className={styles.VideoDetailsFormTitle}>Selecciona una ocasión</h2>
      <OccasionsGrid
        contractType={contractType}
        selectedOccasion={values.occasion}
        className={styles.VideoDetailsFormOccasionsGrid}
        onClickOccasion={changeOccasion}
      />
      <div className={styles.VideoDetailsFormInstructions}>
        <label className={styles.VideoDetailsFormInstructionsLabel}>
          Dale instrucciones a {celebrityFullName} para que tu video quede como
          esperas.
          <br /> <span>(Edita este texto base o escribe uno)</span>
        </label>
        <TextInputWithPlaceholders
          placeholder={`¡Hola ${celebrityFullName}! Me gustaría que...`}
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
      <SubmitButton onClick={submitForm}>Siguiente</SubmitButton>
    </section>
  );
}

export { ContractDetailsForm };
