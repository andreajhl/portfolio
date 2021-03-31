import occasions from "constants/occasions";
import useForm from "lib/hooks/useForm";
import { useState } from "react";
import SubmitButton from "../../common/button/submit-button";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";
import isEmpty from "validator/es/lib/isEmpty";
import WarningMessage from "desktop-app/components/common/warning-message";
import classes from "classnames";

const occasionsOnlyToGiftContract = [
  "LOVE",
  "MAKE_SMILE",
  "HOPE",
  "ASK_FOR_FORGIVENESS"
];

const initialValues = {
  occasion: "OTHER",
  instructions: ""
};

const validations = {
  occasion(value: string) {
    if (isEmpty(value)) return "Debes seleccionar una ocasión";
  },
  instructions(value: string | string[]) {
    if (Array.isArray(value)) return "Olvidaste editar el texto.";
    if (isEmpty(value)) return "Debes escribir tus instrucciones.";
  }
};

type InitialValues = typeof initialValues;

type VideoDetailsFormProps = {
  contractType: number;
  deliveryTo: string;
  celebrityFullName: string;
  onSubmit: (values: InitialValues) => void;
};

function VideoDetailsForm({
  contractType,
  deliveryTo,
  celebrityFullName,
  onSubmit
}: VideoDetailsFormProps) {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    validateBeforeSubmit
  } = useForm<InitialValues>({
    initialValues,
    validations,
    onSubmit
  });
  const [textareaText, setTextareaText] = useState(
    replacePlaceHolder(occasions[values.occasion].messages[contractType - 1])
  );

  function replacePlaceHolder(text: string) {
    if (!text) return text;
    const bracketsRegExp = /(\[|\])/g;

    return text
      .replace(/PLACEHOLDER_FAMOSO_NAME/g, celebrityFullName || "Famoso")
      .replace(/PLACEHOLDER_PARA/g, deliveryTo || "[PARA]")
      .split(bracketsRegExp)
      .filter((part) => !bracketsRegExp.test(part))
      .map((part, index) => {
        if (index % 2 === 0) return part;
        return (
          <span
            data-is-placeholder
            onClick={() => {
              try {
                const selection = document.getSelection();
                selection.setPosition(selection.anchorNode, 1);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {`[${part}]`}
          </span>
        );
      });
  }

  function changeOccasion(occasionKey) {
    setFieldValue("occasion", occasionKey);
    if (touched.instructions) return;
    const text = replacePlaceHolder(
      occasions[occasionKey].messages[contractType - 1]
    );
    setTextareaText(text);
    setFieldValue("instructions", text);
  }

  return (
    <section className={styles.VideoDetailsForm}>
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
        <div
          className={styles.VideoDetailsFormInstructionsTextarea}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={({ key }) => {
            if (key.startsWith("Arrow")) return;
            try {
              const { focusNode } = document.getSelection();
              const parent = focusNode?.parentElement;
              if (parent.matches("span[data-is-placeholder]")) parent.remove();
            } catch (error) {
              console.log(error);
            }
          }}
          onKeyUp={({ key }) => {
            if (key.startsWith("Arrow")) return;
            setFieldError("instructions", null);
            setFieldTouched("instructions", true);
          }}
          onBlur={({ target: { childNodes } }) => {
            // TODO: Luego de darle submit, se coloca touched,
            // por ende en el segundo intento no valida
            // que se haya removido el placeholder.
            if (!touched?.instructions) return;
            setFieldValue(
              "instructions",
              Array.from(childNodes)
                .map(({ textContent }) => textContent)
                .join("")
            );
          }}
        >
          {textareaText}
        </div>
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
