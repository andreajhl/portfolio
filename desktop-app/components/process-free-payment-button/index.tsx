import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import { SubmitText } from "../common/helpers/submit-button-text";
import usePromise from "lib/hooks/usePromise";
import { CollapsibleErrorMessage } from "../common/widgets/collapsible-error-message";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";
import { useIntl } from "react-intl";
import useCouponDataState from "lib/hooks/useCouponDataState";
import useGetContractToPayState from "lib/hooks/useGetContractToPayState";
import { processFreePayment } from "react-app/src/state/ducks/payments/actions";
import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";
import { getPurchaseSummaryPath } from "constants/paths";
import { useRouter } from "next/router";

const initialRequestError = null;

type ProcessFreePaymentButtonProps = {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"button">;

function ProcessFreePaymentButton({
  children,
  className,
  onClick,
  ...buttonProps
}: ProcessFreePaymentButtonProps) {
  const { locale } = useIntl();
  const { couponData } = useCouponDataState();
  const { contractToPay } = useGetContractToPayState();
  const router = useRouter();
  const stars = useDiscountStarsSelected()[0];
  const { handle, status } = usePromise();
  const [requestError, setRequestError] = useState(initialRequestError);
  const isLoading = status === "loading";
  const contractReference = contractToPay.reference;

  async function processPayment() {
    const buyerIdentityData = await getBuyerIdentityData();
    await processFreePayment({
      contractReference,
      discountCouponId: couponData?.id,
      locale,
      stars,
      ...buyerIdentityData,
    });
    await router.push(getPurchaseSummaryPath(contractReference));
  }

  async function handleProcessPayment(event) {
    if (isLoading) return;
    setRequestError(initialRequestError);
    try {
      onClick?.(event);
      await handle(processPayment());
    } catch (error) {
      setRequestError(error?.toString?.());
    }
  }

  return (
    <>
      <button
        {...buttonProps}
        type="button"
        className={classes(
          "btn btn-primary",
          styles.ProcessFreePaymentButton,
          className
        )}
        onClick={handleProcessPayment}
        disabled={isLoading}
      >
        <SubmitText status={status} baseText={children} />
      </button>
      <CollapsibleErrorMessage
        errorMessage={requestError}
        className={styles.ProcessFreePaymentButtonErrorMessage}
      />
    </>
  );
}

export { ProcessFreePaymentButton };
