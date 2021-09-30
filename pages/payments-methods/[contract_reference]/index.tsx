import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { analytics } from "react-app/src/state/utils/gtm";
import { clearCouponData } from "react-app/src/state/ducks/payments/actions";
import useFetchContractToPay from "lib/hooks/useFetchContractToPay";
import { PaymentMethodsPage } from "desktop-app/components/pages/payment-methods";
import useTrackPaymentMethodsLeave from "lib/hooks/useTrackPaymentMethodsLeave";
import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";
// import { ValidateEmailModal } from "react-app/src/components/containers/validate-email-modal";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const contractReference = params?.contract_reference;

  if (typeof contractReference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false },
    };
  }

  return {
    props: {
      contractReference,
      isMobile: isMobile(req.headers["user-agent"]),
    },
  };
};

function PaymentMethods({ contractReference, isMobile }) {
  useDesktopClass(!isMobile);
  useTrackPaymentMethodsLeave();
  const dispatch = useDispatch();
  const { contractToPay, status } = useFetchContractToPay(contractReference);
  const isCompleted = status === "completed";
  const isLoading = status === "loading";
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

  return (
    <>
      <CustomHead />
      <PaymentMethodsPage
        contract={contractToPay}
        isCompleted={isCompleted}
        isLoading={isLoading}
      />
    </>
  );
}

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: LoadingPage,
});
