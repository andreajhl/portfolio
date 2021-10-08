import { GatewayNameType } from "desktop-app/types/payment-methods";
import { analytics } from "react-app/src/state/utils/gtm";
import useCouponDataState from "./useCouponDataState";
import useGetContractTotalPrice from "./useGetContractTotalPrice";
import useGetContractToPayState from "./useGetContractToPayState";

function useTrackContractPayment() {
  const contractPrice = useGetContractTotalPrice();
  const { contractToPay } = useGetContractToPayState();
  const celebrityId = contractToPay.celebrity_id;
  const contractReference = contractToPay.reference;
  const discountCouponId = useCouponDataState()?.couponData?.id;

  function trackContractPayment({
    paymentMethod,
    ...analyticsData
  }: {
    paymentMethod: GatewayNameType;
    [key: string]: any;
  }) {
    analytics.trackContractPurchase({
      contractPrice,
      celebrityId,
    });
    analytics.track("CONTRACT_PAYED", {
      paymentMethod,
      contractReference,
      discountCouponId,
      contractPrice,
      celebrityId,
      ...analyticsData,
    });
  }

  return trackContractPayment;
}

export default useTrackContractPayment;
