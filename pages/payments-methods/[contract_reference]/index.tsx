import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import { GetServerSideProps } from "next";
import { PaymentMethodsPage } from "desktop-app/components/pages/payment-methods";
import useSetupPaymentMethods from "../../../lib/hooks/useSetupPaymentMethods";
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
  useSetupPaymentMethods(contractReference);

  return (
    <>
      <CustomHead />
      <PaymentMethodsPage />
    </>
  );
}

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: LoadingPage,
});
