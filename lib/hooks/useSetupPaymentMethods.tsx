import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { analytics } from "react-app/src/state/utils/gtm";
import { clearCouponData } from "react-app/src/state/ducks/payments/actions";
import useFetchContractToPay from "lib/hooks/useFetchContractToPay";
import useTrackPaymentMethodsLeave from "lib/hooks/useTrackPaymentMethodsLeave";
import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";

function useSetupPaymentMethods(contractReference: string) {
  useTrackPaymentMethodsLeave();
  const dispatch = useDispatch();
  const { contractToPay, status } = useFetchContractToPay(contractReference);
  const isCompleted = status === "completed";
  const setDiscountStarsSelected = useDiscountStarsSelected()[1];

  useEffect(() => {
    dispatch(clearCouponData());
    setDiscountStarsSelected(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractReference]);

  useEffect(() => {
    if (!isCompleted) return;
    if (contractReference !== contractToPay.reference) return;
    analytics.trackInitiateCheckout({
      contractPrice: contractToPay.price,
      celebrityId: contractToPay.celebrity_id,
    });
  }, [contractToPay, isCompleted, contractReference]);
}

export default useSetupPaymentMethods;
