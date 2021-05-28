import StarRatingDisplay from "desktop-app/components/common/star-rating/display";
import classes from "classnames";
import WarningMessage from "../../common/warning-message";
import styles from "./styles.module.scss";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import useReviewManager from "../../../../lib/hooks/useReviewManager";

type ContractReviewCardProps = {
  contract_reference: string;
};

function ContractReviewVideo({ contract_reference }: ContractReviewCardProps) {
  const {
    status,
    values,
    onChangeField,
    setFieldValue,
    submitForm,
    errors,
  } = useReviewManager({ contractReference: contract_reference });

  return (
    <div className={styles.ContractReviewCard}>
      <label htmlFor="" className={styles.ContractReviewCardLabel}>
        Califica tu video
      </label>
      <StarRatingDisplay
        className={styles.ContractReviewCardStars}
        value={values.stars}
        editing
        onChangeRating={(stars: number) => setFieldValue("stars", stars)}
      />
      <label
        htmlFor="review-textarea"
        className={styles.ContractReviewCardLabel}
      >
        Cuéntanos algo sobre tu experiencia
      </label>
      <textarea
        id="review-textarea"
        name="review"
        className={classes(
          styles.ContractReviewCardTextarea,
          errors?.review && styles.ContractReviewCardTextareaHasError
        )}
        value={values.review}
        placeholder="Escribe algo aquí..."
        onChange={onChangeField}
      />
      <WarningMessage
        message={errors?.review || null}
        className={classes(
          styles.FormError,
          errors?.review && styles.ErrorIsVisible
        )}
      />
      <div className={styles.FooterButtons}>
        <button
          disabled={status === "loading"}
          type="button"
          className={`btn btn-tertiary ${styles.ContractReviewCardButton}`}
          onClick={submitForm}
        >
          <SubmitText baseText={`${"Enviar"} calificación`} status={status} />
        </button>
        <button
          onClick={() => console.log("Hacer algo increible")}
          className={`btn btn-outline ${styles.ContractDeferReview}`}
        >
          <span>Lo haré más tarde</span>
        </button>
      </div>
    </div>
  );
}

export { ContractReviewVideo };
