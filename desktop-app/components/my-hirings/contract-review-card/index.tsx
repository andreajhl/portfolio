import MyHiringsContract from "desktop-app/types/myHiringsContract";
import useForm from "lib/hooks/useForm";
import StarRatingDisplay from "desktop-app/components/common/star-rating/display";
import classes from "classnames";
import WarningMessage from "../../common/warning-message";
import styles from "./styles.module.scss";
import { saveClientContractReview } from "react-app/src/state/ducks/contracts/actions";
import { useEffect, useState } from "react";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";

type ContractReviewCardProps = {
  contractData: MyHiringsContract;
};

const initialValues = {
  review: "",
  stars: 5,
};

const validations = {
  review(value: string) {
    if (value === "") return "Debes escribir un comentario";
  },
};

const additionalValueFromComponent = 1;

function ContractReviewCard({ contractData }: ContractReviewCardProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "completed">(
    "idle"
  );
  const { values, onChangeField, setFieldValue, submitForm, errors } = useForm<
    typeof initialValues
  >({
    initialValues: {
      review: contractData.review,
      stars: contractData.stars || 5,
    },
    validations,
    async onSubmit(reviewData) {
      if (status !== "idle") return;
      setStatus("loading");
      try {
        const response = await saveClientContractReview(
          contractData.reference,
          {
            ...reviewData,
            stars: reviewData.stars - additionalValueFromComponent,
          }
        );
        if (response.status === "OK") {
          setStatus("completed");
        }
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (status === "completed") setTimeout(() => setStatus("idle"), 2000);
  }, [status]);

  const isUpdatingReview = contractData.review;

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
        Escribe un comentario
      </label>
      <textarea
        id="review-textarea"
        name="review"
        className={classes(
          styles.ContractReviewCardTextarea,
          errors?.review && styles.ContractReviewCardTextareaHasError
        )}
        value={values.review}
        placeholder="¡Me encantó el video 😍! ¡quedó espectacular 💖! ..."
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
