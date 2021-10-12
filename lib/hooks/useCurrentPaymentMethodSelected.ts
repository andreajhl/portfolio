import { analytics } from "react-app/src/state/utils/gtm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { setNewPaymentMethodSelected } from "react-app/src/state/ducks/payments/actions";
import { PaymentMethodNameType } from "desktop-app/types/payment-methods";

const currentPaymentMethodSelector = ({ payments }: RootState) =>
  payments.userPaymentMethodSelected.name as PaymentMethodNameType;

function useCurrentPaymentMethodSelected() {
  const currentPaymentMethod = useSelector(currentPaymentMethodSelector);
  const dispatch = useDispatch();

  function changeCurrentPaymentMethodSelected(
    newPaymentMethod: PaymentMethodNameType
  ) {
    if (currentPaymentMethod === newPaymentMethod) return;
    dispatch(setNewPaymentMethodSelected(newPaymentMethod));
    analytics.track("CHANGE_ACTIVE_PAYMENT_METHOD_OPTION", {
      previousPaymentMethod: currentPaymentMethod,
      newPaymentMethod,
      // buyerData,
      // celebrityId,
      // contractReference
    });
  }

  return [currentPaymentMethod, changeCurrentPaymentMethodSelected] as const;
}

export default useCurrentPaymentMethodSelected;
