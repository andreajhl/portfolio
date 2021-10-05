import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import { GetServerSideProps } from "next";
import { PaymentMethodsPage } from "desktop-app/components/pages/payment-methods";
import useSetupPaymentMethods from "../../../lib/hooks/useSetupPaymentMethods";
import {
  getCheckoutVersion,
  isNotUsedAnymoreCheckoutVersion,
  getCheckoutVersionDependingOnTime,
  setCheckoutVersion,
} from "react-app/src/utils/checkoutVersion";
import { useEffect } from "react";
// import { ValidateEmailModal } from "react-app/src/components/containers/validate-email-modal";

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
  req,
}) => {
  const contractReference = params?.contract_reference;

  if (typeof contractReference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false },
    };
  }

  let checkoutVersion = getCheckoutVersion(req?.headers?.cookie);
  if (!checkoutVersion || isNotUsedAnymoreCheckoutVersion(checkoutVersion)) {
    checkoutVersion = getCheckoutVersionDependingOnTime();
  }

  return {
    props: {
      contractReference,
      isMobile: isMobile(req.headers["user-agent"]),
      checkoutVersion,
      checkoutVersionParam: query?.checkoutVersion || null,
    },
  };
};

function PaymentMethods({
  contractReference,
  isMobile,
  checkoutVersion,
  checkoutVersionParam,
}) {
  useDesktopClass(!isMobile);
  useSetupPaymentMethods(contractReference);

  useEffect(() => {
    if (checkoutVersionParam) {
      setCheckoutVersion(checkoutVersionParam);
    }

    const checkoutVersionFromCookies = getCheckoutVersion();
    if (
      !checkoutVersionFromCookies ||
      isNotUsedAnymoreCheckoutVersion(checkoutVersionFromCookies)
    ) {
      setCheckoutVersion(checkoutVersion);
    }
  }, [checkoutVersion]);

  return (
    <>
      <CustomHead />
      <PaymentMethodsPage
        checkoutVersion={checkoutVersionParam || checkoutVersion}
      />
    </>
  );
}

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: LoadingPage,
});
