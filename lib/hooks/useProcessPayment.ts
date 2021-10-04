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

  async function finishPaymentProcessing(paymentData: PaymentData) {
    if (!checkFlutterWindowsInstance()) {
      await router.push(getPurchaseSummaryPath(contractReference));
    } else {
      SubmitCallbackInFlutterWebview({
        paymentType: paymentData.gateway?.toLowerCase(),
      });
    }
  }

  async function processPayment(
    paymentData: PaymentData,
    onRequestCompleted: (response: any) => Promise<any>
  ) {
    const response = await processPaymentRequest({
      contractReference,
      stars,
      discountCouponId,
      locale,
      ...paymentData,
    });
    await onRequestCompleted(response);
    await finishPaymentProcessing(paymentData);
  }

  return processPayment;
}

export default useProcessPayment;
