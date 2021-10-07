import { getPurchaseSummaryPath } from "constants/paths";
import { GatewayNameType } from "desktop-app/types/payment-methods";
import { checkFlutterWindowsInstance } from "lib/utils/checkFlutterWindowsInstance";
import { SubmitCallbackInFlutterWebview } from "lib/utils/SubmitCallbackInFlutterWebview";
import { useRouter } from "next/router";
import { processPayment as processPaymentRequest } from "react-app/src/state/ducks/payments/actions";
import { useIntl } from "react-intl";
import useCouponDataState from "./useCouponDataState";
import useDiscountStarsSelected from "./useDiscountStarsSelected";
import useGetContractToPayState from "./useGetContractToPayState";

type PaymentData = {
  gateway: GatewayNameType;
  [gatewaySpecificKey: string]: any;
};

function useProcessPayment() {
  const router = useRouter();
  const { locale } = useIntl();
  const contractReference = useGetContractToPayState().contractToPay?.reference;
  const stars = useDiscountStarsSelected()[0];
  const discountCouponId = useCouponDataState()?.couponData?.id;

  async function finishPaymentProcessing(paymentGateway: GatewayNameType) {
    if (!checkFlutterWindowsInstance()) {
      await router.push(getPurchaseSummaryPath(contractReference));
    } else {
      SubmitCallbackInFlutterWebview({
        paymentType: paymentGateway?.toLowerCase?.(),
      });
    }
  }

  function processPayment(paymentData: PaymentData) {
    return processPaymentRequest({
      contractReference,
      stars,
      discountCouponId,
      locale,
      ...paymentData,
    });
  }

  return { processPayment, finishPaymentProcessing };
}

export default useProcessPayment;
