import useForm from "lib/hooks/useForm";
import { saveClientContractReview } from "react-app/src/state/ducks/contracts/actions";
import { useEffect, useState } from "react";

const initialValues = {
  review: "",
  stars: 3,
};

const validations = {
  review(value: string) {
    if (value === "") return "Debes escribir un comentario";
  },
};

const additionalValueFromComponent = 1;
type InitialValuesType = typeof initialValues;

function useReviewManager({
  contractReference,
  initialReviewValues,
}: {
  contractReference: string;
  initialReviewValues?: InitialValuesType;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "completed">(
    "idle"
  );
  const [isUpdatingReview, setIsUpdatingReview] = useState(
    Boolean(initialReviewValues?.review)
  );

  const form = useForm<InitialValuesType>({
    initialValues: Object.assign(initialValues, initialReviewValues),
    validations,
    async onSubmit(reviewData) {
      if (status !== "idle") return;
      setStatus("loading");
      try {
        const response = await saveClientContractReview(contractReference, {
          ...reviewData,
          stars: reviewData.stars - additionalValueFromComponent,
        });
        if (response.status === "OK") {
          setStatus("completed");
          setIsUpdatingReview(true);
        }
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (status !== "completed") return;
    setTimeout(() => setStatus("idle"), 2000);
  }, [status]);

  return { ...form, status, isUpdatingReview };
}

export default useReviewManager;
