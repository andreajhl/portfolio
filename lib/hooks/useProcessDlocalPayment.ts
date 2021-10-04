import useBuyerDataState from "desktop-app/components/payments-methods/dLocal-payment-method-form/useBuyerDataState";
import useProcessPayment from "./useProcessPayment";
import useTrackContractPayment from "./useTrackContractPayment";

const STATUS_TO_PROCEED = ["PAID", "AUTHORIZED", "PENDING"];

const canProceed = (chargeStatus: string) =>
  STATUS_TO_PROCEED.includes(chargeStatus);

function continueToDlocalPaymentPage(redirectUri: string) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(
    window?.navigator?.userAgent
  );
  if (isSafari) {
    return window?.location?.replace?.(redirectUri);
  }
  window?.open?.(redirectUri);
}

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
  const processPayment = useProcessPayment();
  const buyerData = useBuyerDataState();
  const trackContractPayment = useTrackContractPayment();

  async function onRequestCompleted(response: SuccessResponse) {
    if (!canProceed(response.chargeStatus)) {
      throw response.statusDetails;
    }
    if (response.requiredRedirect) {
      return continueToDlocalPaymentPage(response.redirectUri);
    }
    trackContractPayment({ paymentMethod: "Dlocal" });
  }

  async function processDlocalPayment(paymentData: DlocalData) {
    return processPayment(
      {
        gateway: "DLOCAL",
        ...buyerData,
        ...paymentData,
      },
      onRequestCompleted
    );
  }

  return processDlocalPayment;
}

export default useProcessDlocalPayment;
