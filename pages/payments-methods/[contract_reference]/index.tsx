import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import dynamic from "next/dynamic";
// import { ValidateEmailModal } from "react-app/src/components/containers/validate-email-modal";
import { GetServerSideProps } from "next";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { analytics } from "react-app/src/state/utils/gtm";
import { clearCouponData } from "react-app/src/state/ducks/payments/actions";

// const PaymentMethodsPage = dynamic<{ contractReference: string }>(() =>
//   import("react-app/src/components/pages/payment-methods").then(
//     (mod) => mod.PaymentMethodsPage
//   )
// );

const DesktopPaymentMethodsPage = dynamic<{ contractReference: string }>(() =>
  import("desktop-app/components/pages/payment-methods").then(
    (mod) => mod.PaymentMethodsPage
  )
);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const contract_reference = params?.contract_reference;

  if (typeof contract_reference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false },
    };
  }

  return {
    props: {
      contract_reference,
      isMobile: isMobile(req.headers["user-agent"]),
    },
  };
};

const contractToPaySelector = ({
  payments: { getContractToPayReducer },
}: RootState) => ({
  isCompleted: getContractToPayReducer.completed,
  contract: getContractToPayReducer.data,
});

const PaymentMethods = ({ contract_reference, isMobile }) => {
  useDesktopClass(!isMobile);
  const dispatch = useDispatch();
  const { contract, isCompleted } = useSelector(contractToPaySelector);
  useEffect(() => {
    return () => {
      dispatch(clearCouponData());
    };
  }, []);

  useEffect(() => {
    if (!isCompleted) return;
    if (contract_reference !== contract.reference) return;
    analytics.trackInitiateCheckout({
      contractPrice: contract.price,
      celebrityId: contract.celebrity_id ?? contract.celebrityId,
    });
  }, [contract, isCompleted, contract_reference]);

  return (
    <>
      <CustomHead />
      <DesktopPaymentMethodsPage contractReference={contract_reference} />
      {/* <ValidateEmailModal /> */}
    </>
  );
};

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: LoadingPage,
});
