import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import { ValidateEmailModal } from "react-app/src/components/containers/validate-email-modal";

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

const PaymentMethods = ({ contract_reference, isMobile }) => {
  useDesktopClass(!isMobile);
  return (
    <>
      <CustomHead />
      <DesktopPaymentMethodsPage contractReference={contract_reference} />
      <ValidateEmailModal />
    </>
  );
};

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: () => <LoadingPage></LoadingPage>,
});
