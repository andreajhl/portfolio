import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { PaymentMethodsPage } from "react-app/src/components/pages/payment-methods";
import { PaymentMethodsPage as DesktopPaymentMethodsPage } from "desktop-app/components/pages/payment-methods";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference },
  req
}) => {
  return {
    props: { contract_reference, isMobile: isMobile(req.headers["user-agent"]) }
  };
};

const PaymentMethods = ({ contract_reference, isMobile }) => {
  useDesktopClass(isMobile);
  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopPaymentMethodsPage contractReference={contract_reference} />
        }
      >
        <PaymentMethodsPage contractReference={contract_reference} />
      </Maybe>
    </>
  );
};

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
