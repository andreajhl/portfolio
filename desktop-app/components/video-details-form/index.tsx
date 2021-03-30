import occasions from "constants/occasions";
import useForm from "lib/hooks/useForm";
import SubmitButton from "../common/button/submit-button";
import Maybe from "../common/helpers/maybe";
import styles from "./styles.module.scss";

const occasionsForContractTypeOne = [
  "LOVE",
  "MAKE_SMILE",
  "HOPE",
  "ASK_FOR_FORGIVENESS"
];

const initialValues = {
  occasion: "OTHER",
  instructions: ""
};

type InitialValues = typeof initialValues;

type VideoDetailsFormProps = {
  contractType: number;
  deliveryTo: string;
  celebrityFullName: string;
  celebrityUsername: string;
  onSubmit: (values: InitialValues) => void;
};

function VideoDetailsForm({
  contractType,
  deliveryTo,
  celebrityFullName,
  celebrityUsername,
  onSubmit
}: VideoDetailsFormProps) {
  const {
    values,
    setFieldValue,
    validateBeforeSubmit
  } = useForm<InitialValues>({
    initialValues,
    onSubmit
  });

  function replacePlaceHolder(text) {
    const replacePlaceHolders = (str, find, replace) =>
      str.replace(new RegExp(find, "g"), replace);

    let textClear = text;

    textClear = replacePlaceHolders(
      textClear,
      "PLACEHOLDER_FAMOSO_NAME",
      celebrityFullName ? celebrityFullName : "Famoso!"
    );

    textClear = replacePlaceHolders(
      textClear,
      "PLACEHOLDER_PARA",
      deliveryTo || "[PARA]"
    );

    return textClear;
  }

  return (
    <section className={styles.VideoDetailsForm}>
      <h2 className={styles.VideoDetailsFormTitle}>Selecciona una ocasión</h2>
      <div className={styles.VideoDetailsFormOccasionsGrid}>
        {Object.entries(occasions).map(([occasionKey, { icon, title }]) => (
          <Maybe
            it={
              contractType !== 0 ||
              !occasionsForContractTypeOne.includes(occasionKey)
            }
          >
            <div
              className={`${styles.VideoDetailsFormOccasionsItem} ${
                occasionKey === values.occasion
                  ? styles.VideoDetailsFormOccasionsSelected
                  : ""
              }`}
              onClick={() => setFieldValue("occasion", occasionKey)}
            >
              <i className={"fa " + icon}></i>
              <p>{title}</p>
            </div>
          </Maybe>
        ))}
      </div>
      <div>
        <label className={styles.VideoDetailsFormInstructionsLabel}>
          Dale instrucciones a {celebrityUsername} para que tu video quede como
          esperas. <span>(Edita este texto base o escribe uno)</span>
        </label>
        {replacePlaceHolder(occasions[values.occasion].messages[contractType])}
      </div>
      <SubmitButton onClick={validateBeforeSubmit}>Siguiente</SubmitButton>
    </section>
  );
}

export { VideoDetailsForm };
