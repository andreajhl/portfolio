import occasions from "constants/occasions";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import { useEffect, useState } from "react";
import SubmitButton from "../../common/button/submit-button";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";
import isEmpty from "validator/es/lib/isEmpty";
import WarningMessage from "desktop-app/components/common/warning-message";
import classes from "classnames";
import { ContractDetailsType } from "desktop-app/types/contractDataType";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import {
  getTextContent,
  TextInputWithPlaceholders
} from "desktop-app/components/common/form/text-input-with-placeholders";

const occasionsOnlyToGiftContract = [
  "LOVE",
  "MAKE_SMILE",
  "HOPE",
  "ASK_FOR_FORGIVENESS"
];

const initialValues: ContractDetailsType = {
  occasion: "OTHER",
  instructions: ""
};

const validations: ValidationsType<ContractDetailsType> = {
  occasion(value) {
    if (isEmpty(value)) return "Debes seleccionar una ocasión";
  },
  instructions(value) {
    if (Array.isArray(value)) return "Olvidaste editar el texto.";
    if (isEmpty(value)) return "Debes escribir tus instrucciones.";
  }
};

type VideoDetailsFormProps = {
  contractType: number;
  deliveryTo: string;
  celebrityFullName: string;
  initialValues?: ContractDetailsType;
  onSubmit: (values: ContractDetailsType) => void;
  onStepChange: (values: ContractDetailsType) => void;
};

function VideoDetailsForm({
  contractType,
  deliveryTo,
  celebrityFullName,
  initialValues: initialValuesFromProps,
  onStepChange,
  onSubmit
}: VideoDetailsFormProps) {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    validateFields,
    setFieldError,
    validateBeforeSubmit
  } = useForm<ContractDetailsType>({
    initialValues: initialValuesFromProps || initialValues,
    validations,
    onSubmit
  });
  const [textareaText, setTextareaText] = useState(
    initialValuesFromProps?.instructions ||
      replacePlaceHolder(occasions[values.occasion].messages[contractType - 1])
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

  function changeOccasion(occasionKey) {
    setFieldValue("occasion", occasionKey);
    if (touched.instructions) return;
    const text = replacePlaceHolder(
      occasions[occasionKey].messages[contractType - 1]
    );
    setTextareaText(text);
    setFieldValue("instructions", text, false);
  }

  return (
    <section className={styles.VideoDetailsForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={(goToClickedStep) => {
          if (!validateFields()) return;
          onStepChange(values);
          goToClickedStep();
        }}
      />
      <h2 className={styles.VideoDetailsFormTitle}>Selecciona una ocasión</h2>
      <div className={styles.VideoDetailsFormOccasionsGrid}>
        {Object.entries(occasions).map(([occasionKey, { icon, title }]) => (
          <Maybe
            it={
              contractType !== 1 ||
              !occasionsOnlyToGiftContract.includes(occasionKey)
            }
          >
            <div
              className={classes(
                styles.VideoDetailsFormOccasionsItem,
                occasionKey === values.occasion &&
                  styles.VideoDetailsFormOccasionsSelected
              )}
              onClick={() => changeOccasion(occasionKey)}
            >
              <img src={`/assets/img/occasions/${occasionKey}.png`} alt="" />
              <p>
                {title.split(" ").map((word) => (
                  <>
                    {word}
                    <br />
                  </>
                ))}
              </p>
            </div>
          </Maybe>
        ))}
      </div>
      <div className={styles.VideoDetailsFormInstructions}>
        <label className={styles.VideoDetailsFormInstructionsLabel}>
          Dale instrucciones a {celebrityFullName} para que tu video quede como
          esperas.
          <br /> <span>(Edita este texto base o escribe uno)</span>
        </label>
        <TextInputWithPlaceholders
          placeholder={`¡Hola ${celebrityFullName}! Me gustaría que...`}
          className={styles.VideoDetailsFormInstructionsTextarea}
          onKeyUp={({ key }) => {
            if (key.startsWith("Arrow")) return;
            setFieldError("instructions", null);
            setFieldTouched("instructions", true);
          }}
          onBlur={({ target }) => {
            // TODO: Luego de darle submit, se coloca touched,
            // por ende en el segundo intento no valida
            // que se haya removido el placeholder.
            if (!touched?.instructions) return;
            setFieldValue("instructions", getTextContent(target));
          }}
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
      <SubmitButton onClick={validateBeforeSubmit}>Siguiente</SubmitButton>
    </section>
  );
}

export { VideoDetailsForm };
