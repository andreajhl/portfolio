import useBuyerDataState from "lib/hooks/useBuyerDataState";
import isMobile from "lib/utils/isMobile";
import isSafariBrowser from "../utils/isSafariBrowser";
import useProcessPayment from "./useProcessPayment";
import useTrackContractPayment from "./useTrackContractPayment";

const GATEWAY_NAME = "DLOCAL";

const STATUS_TO_PROCEED = ["PAID", "AUTHORIZED", "PENDING"];

const canProceed = (chargeStatus: string) =>
  STATUS_TO_PROCEED.includes(chargeStatus);

type SuccessResponse = {
  requiredRedirect: boolean;
  redirectUri: string;
  statusDetails: string;
  chargeStatus: string;
};

type DlocalData = {
  paymentMethodId: number;
  cardToken?: string;
};

function useProcessDlocalPayment() {
  const { processPayment, finishPaymentProcessing } = useProcessPayment();
  const buyerData = useBuyerDataState();
  const trackContractPayment = useTrackContractPayment();

  async function processDlocalPayment(paymentData: DlocalData) {
    const response = await processPayment({
      gateway: GATEWAY_NAME,
      ...buyerData,
      ...paymentData,
    });
    await onRequestCompleted(response);
  }

  async function onRequestCompleted(response: SuccessResponse) {
    if (!canProceed(response.chargeStatus)) {
      throw response.statusDetails;
    }
    if (response.requiredRedirect) {
      if (isMobile(navigator?.userAgent) || isSafariBrowser()) {
        return window?.location?.replace?.(response.redirectUri);
      }
      window?.open?.(response.redirectUri);
    }
    trackContractPayment({ paymentMethod: GATEWAY_NAME });
    await finishPaymentProcessing(GATEWAY_NAME);
  }

  return processDlocalPayment;
}

export default useProcessDlocalPayment;
