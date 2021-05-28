import MyHiringsContract from "desktop-app/types/myHiringsContract";
import StarRatingDisplay from "desktop-app/components/common/star-rating/display";
import classes from "classnames";
import WarningMessage from "../../common/warning-message";
import styles from "./styles.module.scss";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import useReviewManager from "lib/hooks/useReviewManager";

type ContractReviewCardProps = {
  contractData: MyHiringsContract;
};

function ContractReviewCard({ contractData }: ContractReviewCardProps) {
  const {
    status,
    values,
    onChangeField,
    setFieldValue,
    submitForm,
    errors,
    isUpdatingReview,
  } = useReviewManager({
    contractReference: contractData.reference,
    initialReviewValues: {
      review: contractData.review,
      stars: contractData.stars || 3,
    },
  });

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
      <button
        disabled={status === "loading"}
        type="button"
        className={`btn btn-tertiary ${styles.ContractReviewCardButton}`}
        onClick={submitForm}
      >
        <SubmitText
          baseText={`${
            isUpdatingReview ? "Actualizar" : "Enviar"
          } calificación`}
          status={status}
        />
      </button>
    </div>
  );
}

export { ContractReviewCard };
