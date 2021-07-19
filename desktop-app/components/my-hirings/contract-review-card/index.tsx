import MyHiringsContract from "desktop-app/types/myHiringsContract";
import StarRatingDisplay from "desktop-app/components/common/star-rating/display";
import classes from "classnames";
import WarningMessage from "../../common/warning-message";
import styles from "./styles.module.scss";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import useReviewManager from "lib/hooks/useReviewManager";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

type ContractReviewCardProps = {
  contractData: MyHiringsContract;
};

const messages = defineMessages({
  reviewPlaceholder: {
    defaultMessage: "Escribe algo aquí...",
  },
});

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
  const { formatMessage } = useIntl();

  return (
    <div className={styles.ContractReviewCard}>
      <label htmlFor="" className={styles.ContractReviewCardLabel}>
        <FormattedMessage defaultMessage="Califica tu video" />
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
        <FormattedMessage defaultMessage="Cuéntanos algo sobre tu experiencia" />
      </label>
      <textarea
        id="review-textarea"
        name="review"
        className={classes(
          styles.ContractReviewCardTextarea,
          errors?.review && styles.ContractReviewCardTextareaHasError
        )}
        value={values.review}
        placeholder={formatMessage(messages.reviewPlaceholder)}
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
          baseText={
            <FormattedMessage
              defaultMessage="{action} calificación"
              values={{
                action: isUpdatingReview ? "Actualizar" : "Enviar",
              }}
            />
          }
          status={status}
        />
      </button>
    </div>
  );
}

export { ContractReviewCard };
